import {
  base,
  browser,
  perfectionist,
  prettier,
  react,
  typescript,
} from 'eslint-config-imperium';

export default [
  { ignores: ['dist', 'vite.config.ts'] },
  base,
  browser,
  react,
  typescript,
  prettier,
  perfectionist,
  {
    rules: {
      'max-lines-per-function': 'off',
      'no-console': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
];
