import assert from 'node:assert/strict';
import { test } from 'node:test';
import { build } from 'vite';

import { isLanguage, languageNames, translations } from '../src/lib/i18n.ts';

test('only available languages are accepted from browser storage', () => {
  for (const language of Object.keys(translations)) {
    assert.ok(isLanguage(language));
  }
  for (const unsupported of [
    null,
    undefined,
    '',
    'de',
    'sq-AL',
    'constructor',
    '__proto__',
  ]) {
    assert.equal(isLanguage(unsupported), false);
  }
  assert.deepEqual(Object.keys(languageNames), Object.keys(translations));
});

test('production HTML contains localized defaults before JavaScript runs', async () => {
  const result = await build({
    build: { write: false },
    envDir: false,
    logLevel: 'silent',
  });
  let output;
  if (Array.isArray(result)) {
    output = result.flatMap((bundle) => bundle.output);
  } else if ('output' in result) {
    output = result.output;
  } else {
    assert.fail('Vite returned a watcher instead of a build output');
  }

  const asset = output.find(
    (item) => item.type === 'asset' && item.fileName === 'index.html',
  );
  assert.ok(asset?.type === 'asset');
  const html =
    typeof asset.source === 'string'
      ? asset.source
      : new TextDecoder().decode(asset.source);
  const { metadata } = translations.mk;

  assert.ok(html.includes('<html lang="mk">'));
  assert.ok(html.includes(`<title>${metadata.title}</title>`));
  assert.ok(html.includes(`content="${metadata.description}"`));
  assert.ok(html.includes('property="og:locale" content="mk_MK"'));
  assert.ok(html.includes(`property="og:title" content="${metadata.title}"`));
  assert.ok(html.includes(`name="twitter:title" content="${metadata.title}"`));
  assert.equal(html.includes('__LOCALIZED_'), false);
  assert.ok(html.includes('https://finki-hub.com/favicon-96x96.png'));
  assert.ok(html.includes('rel="canonical" href="https://finki-hub.com"'));
});

test('translations preserve resource ordering, repository names and year interpolation', () => {
  const english = translations.en;
  for (const [language, translation] of Object.entries(translations)) {
    const expectedPlatformUrls = english.platforms.items.map(({ url }) => url);
    expectedPlatformUrls[1] =
      language === 'mk'
        ? 'https://trudovi.finki-hub.com'
        : 'https://theses.finki-hub.com';
    assert.deepEqual(
      translation.platforms.items.map(({ url }) => url),
      expectedPlatformUrls,
    );
    assert.deepEqual(
      translation.projects.items.map(({ name, tags }) => ({ name, tags })),
      english.projects.items.map(({ name, tags }) => ({ name, tags })),
    );
    assert.ok(translation.footer.copyright.includes('{year}'));
    assert.equal(
      translation.overview.cards.length,
      english.overview.cards.length,
    );
    assert.equal(
      translation.community.features.length,
      english.community.features.length,
    );
  }
});
