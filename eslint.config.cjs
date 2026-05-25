// Flat config for ESLint v10
// Registers plugins and parsers and mirrors rules from the legacy .eslintrc.cjs

const vuePlugin = require('eslint-plugin-vue');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const vueParser = require('vue-eslint-parser');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  {
    ignores: ['docs/**', 'dist/**'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.eslint.json',
        extraFileExtensions: ['.vue']
      }
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': tsPlugin
    },
    rules: {
      'keyword-spacing': ['error', { after: true, before: true }],
      'space-infix-ops': 'error',
      'arrow-spacing': 'error',
      'comma-spacing': ['error', { before: false, after: true }],
      'indent': ['error', 2],
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'vue/script-setup-uses-vars': 'off'
    }
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off'
    }
  }
];
