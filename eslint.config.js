import {
  base,
  browser,
  jsxA11y,
  perfectionist,
  prettier,
  react,
  typescript,
} from 'eslint-config-imperium';

const config = [
  { ignores: ['dist'] },
  ...base,
  browser,
  react,
  jsxA11y,
  typescript,
  prettier,
  perfectionist,
  {
    files: ['vite.config.js'],
    rules: {
      // Vite's configuration entrypoint intentionally instantiates build plugins.
      'unicorn/no-top-level-side-effects': 'off',
    },
  },
];

export default config;
