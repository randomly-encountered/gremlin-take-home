export default {
  extends: [
    'stylelint-config-standard',
    '@stylistic/stylelint-config',
    'stylelint-config-rational-order',
  ],
  rules: {
    '@stylistic/string-quotes': 'single',
    'declaration-empty-line-before': 'never',
    'rule-empty-line-before': [
      'always-multi-line',
      { except: ['after-single-line-comment', 'first-nested'] },
    ],
  },
}
