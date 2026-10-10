import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  readBrowserStorage,
  writeBrowserStorage,
} from '../src/lib/safe-storage.ts';

const restoreStorage = (descriptor) => {
  if (descriptor) {
    Object.defineProperty(globalThis, 'localStorage', descriptor);
  } else {
    Reflect.deleteProperty(globalThis, 'localStorage');
  }
};

test('storage failures fall back safely for blocked reads and writes', (t) => {
  const originalDescriptor = Object.getOwnPropertyDescriptor(
    globalThis,
    'localStorage',
  );
  t.after(() => restoreStorage(originalDescriptor));

  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem() {
        throw new DOMException('Storage is blocked', 'SecurityError');
      },
      setItem() {
        throw new DOMException('Storage is blocked', 'SecurityError');
      },
    },
  });

  assert.equal(readBrowserStorage('theme'), null);
  assert.equal(writeBrowserStorage('theme', 'dark'), false);

  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    get() {
      throw new DOMException('Storage is blocked', 'SecurityError');
    },
  });

  assert.equal(readBrowserStorage('language'), null);
  assert.equal(writeBrowserStorage('language', 'mk'), false);
});

test('storage helpers preserve normal reads and writes', (t) => {
  const originalDescriptor = Object.getOwnPropertyDescriptor(
    globalThis,
    'localStorage',
  );
  t.after(() => restoreStorage(originalDescriptor));

  const values = new Map([['theme', 'dark']]);
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, value),
    },
  });

  assert.equal(readBrowserStorage('theme'), 'dark');
  assert.equal(writeBrowserStorage('language', 'mk'), true);
  assert.equal(values.get('language'), 'mk');
});
