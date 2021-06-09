module.exports = {
  extends: [
    '@tms/eslint-config-site/tsx',
  ],
  rules: {
    'no-use-before-define': 0,
    'no-unused-vars': 1,
    'import/no-extraneous-dependencies': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.ts', '.tsx', '.js', '.jsx','.css'] }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    'import/extensions': ["error", "never", { "svg": "always" }]
  },
};
