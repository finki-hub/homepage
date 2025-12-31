import {
  base,
  browser,
  perfectionist,
  prettier,
  solid,
  typescript,
} from 'eslint-config-imperium';

export default [
  { ignores: ['dist', 'node_modules', 'vite.config.ts'] },
  base,
  browser,
  solid,
  typescript,
  prettier,
  perfectionist,
  {
    rules: {
      'no-console': 'off',
    },
  },
];
