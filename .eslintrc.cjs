/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  'root': true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended'
  ],
  'ignorePatterns': ['demo/'],
  'parserOptions': {
    'ecmaVersion': 'latest'
  },
  'rules': {
    'keyword-spacing': ['error', { 'after': true, 'before': true }],
    'space-infix-ops': 'error',
    'arrow-spacing': 'error',
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'indent': ['error', 2]
  }
}
