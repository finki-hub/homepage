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
];

export default config;
