/* eslint-env node */

const { FlatCompat } = require('@eslint/eslintrc');
const compat = new FlatCompat({
  recommendedConfig: require('@eslint/js').configs.recommended,
  allConfig: require('@eslint/js').configs.all
});

module.exports = compat.config(require('./.eslintrc.cjs'));
