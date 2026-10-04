import assert from 'node:assert/strict';
import process from 'node:process';
import { test } from 'node:test';
import { build } from 'vite';

const MERGE_SHA = '1234567890abcdef1234567890abcdef12345678';
const CLOUDFLARE_SHA = 'abcdef1234567890abcdef1234567890abcdef12';
const SPOOF_SHA = 'f'.repeat(40);

test(
  'actual production bundles embed only validated build-host revision metadata',
  { timeout: 120_000 },
  async (t) => {
    const keys = [
      'CF_PAGES_COMMIT_SHA',
      'GITHUB_SHA',
      'VITE_APP_REVISION',
      'VITE_POSTHOG_KEY',
    ];
    const previous = keys.map((key) => [key, process.env[key]]);
    t.after(() => {
      for (const [key, value] of previous) {
        if (value === undefined) Reflect.deleteProperty(process.env, key);
        else process.env[key] = value;
      }
    });
    process.env.VITE_APP_REVISION = SPOOF_SHA;
    process.env.VITE_POSTHOG_KEY = 'test-public-key';
    const cases = [
      { expected: MERGE_SHA, github: MERGE_SHA },
      {
        cloudflare: CLOUDFLARE_SHA,
        expected: CLOUDFLARE_SHA,
        github: MERGE_SHA,
      },
      { cloudflare: 'INVALID', expected: MERGE_SHA, github: MERGE_SHA },
      { cloudflare: 'INVALID', github: 'INVALID' },
      {},
    ];
    for (const { cloudflare, expected, github } of cases) {
      for (const [key, value] of [
        ['CF_PAGES_COMMIT_SHA', cloudflare],
        ['GITHUB_SHA', github],
      ]) {
        if (value === undefined) Reflect.deleteProperty(process.env, key);
        else process.env[key] = value;
      }
      // Use the real app entry and vite.config.js; no files or network output.
      const result = await build({
        build: { write: false },
        envDir: false,
        logLevel: 'silent',
      });
      const code = result.output
        .filter(({ type }) => type === 'chunk')
        .map(({ code: source }) => source)
        .join('\n');
      assert.ok(code.includes('homepage_view'));
      assert.ok(code.includes('service_navigation_intent'));
      assert.equal(code.includes(SPOOF_SHA), false);
      assert.equal(code.includes(MERGE_SHA), expected === MERGE_SHA);
      assert.equal(code.includes(CLOUDFLARE_SHA), expected === CLOUDFLARE_SHA);
    }
  },
);
