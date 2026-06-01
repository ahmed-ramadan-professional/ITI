const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    ignores: ['**/dist/**', '**/coverage/**', '**/node_modules/**']
  },
  js.configs.recommended,
  {
    files: ['apps/api/**/*.js', 'packages/**/*.js', '*.js', '*.cjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node
      }
    },
    rules: {
      'no-console': 'off'
    }
  },
  {
    files: ['apps/dashboard/**/*.js', 'apps/dashboard/**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser
      }
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'off'
    }
  },
  {
    files: ['**/*.test.js', '**/*.test.jsx', '**/tests/**/*.js', '**/tests/**/*.jsx'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.vitest
      }
    }
  }
];
