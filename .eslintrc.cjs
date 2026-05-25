/* eslint-env node */

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
    project: './tsconfig.eslint.json'
  },
  plugins: ['vue', '@typescript-eslint'],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  ignorePatterns: ['docs/', 'dist/'],
  rules: {
    'keyword-spacing': ['error', { after: true, before: true }],
    'space-infix-ops': 'error',
    'arrow-spacing': 'error',
    'comma-spacing': ['error', { before: false, after: true }],
    'indent': ['error', 2],
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'vue/script-setup-uses-vars': 'error'
  },
  overrides: [
    {
      files: ['**/*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      rules: {
        '@typescript-eslint/no-unused-vars': 'off'
      }
    },
    {
      files: ['eslint.config.cjs', '.eslintrc.cjs'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off'
      }
    }
  ]
}
