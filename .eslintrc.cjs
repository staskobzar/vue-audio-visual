/* eslint-env node */

module.exports = {
  'root': true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended'
  ],
  'ignorePatterns': ['docs/', 'dist/'],
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
