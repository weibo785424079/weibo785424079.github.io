module.exports = {
    root: true,
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'airbnb-base',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: [
      '@typescript-eslint',
    ],
    rules: {
      'no-await-in-loop': 0,
      'no-restricted-syntax': 0,
      'import/no-dynamic-require': 0,
      'global-require': 0,
      'no-use-before-define': 0,
      'no-console': 0,
      'linebreak-style': 0,
      'no-param-reassign': 0,
      'import/extensions': [
        'error',
        {
          ts: 'never',
          tsx: 'never',
          js: 'never',
          jsx: 'never',
          mjs: 'never',
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  };
  