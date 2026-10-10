import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

// eslint-disable-next-line security/detect-non-literal-fs-filename -- Fixed repository configuration URL.
const nginx = readFileSync(new URL('../nginx.conf', import.meta.url), 'utf8');
// eslint-disable-next-line security/detect-non-literal-fs-filename -- Fixed repository configuration URL.
const dockerignore = readFileSync(
  new URL('../.dockerignore', import.meta.url),
  'utf8',
);

const generatedAssets = nginx
  .match(/location \^~ \/assets\/ \{(?<body>[^}]*)\}/u)
  ?.groups?.body.replaceAll(/\s+/gu, ' ');
const fixedAssets = nginx
  .match(/location ~\* .* \{(?<body>[^}]*)\}/u)
  ?.groups?.body.replaceAll(/\s+/gu, ' ');

test('only generated assets receive immutable caching; fixed assets revalidate', () => {
  assert.ok(generatedAssets);
  assert.ok(fixedAssets);
  assert.ok(generatedAssets.includes('expires 1y;'));
  assert.ok(generatedAssets.includes('Cache-Control "public, immutable";'));
  assert.ok(fixedAssets.includes('expires -1;'));
  assert.equal(fixedAssets.includes('immutable'), false);
  assert.equal(fixedAssets.includes('add_header'), false);
  for (const location of [generatedAssets, fixedAssets]) {
    assert.ok(location.includes('try_files $uri =404;'));
  }
});

test('immutable asset responses retain security headers without newer nginx directives', () => {
  assert.ok(generatedAssets);
  for (const header of [
    'X-Frame-Options "SAMEORIGIN"',
    'X-Content-Type-Options "nosniff"',
    'X-XSS-Protection "1; mode=block"',
  ]) {
    assert.ok(generatedAssets.includes(`${header} always;`));
  }
  assert.equal(nginx.includes('add_header_inherit'), false);
});

test('Docker excludes local environment variants at any depth, except the example', () => {
  const rules = dockerignore
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '' && !line.startsWith('#'));

  assert.ok(rules.includes('**/.env'));
  assert.ok(rules.includes('**/.env.*'));
  assert.deepEqual(
    rules.filter((rule) => rule.startsWith('!')),
    ['!**/.env.example'],
  );
  assert.ok(rules.indexOf('!**/.env.example') > rules.indexOf('**/.env.*'));
});
