module.exports = {
    extends: ['@tms/eslint-config-esite', 'eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
    rules: {
        'import/no-unresolved': 0,
        'no-redeclare': 0,
        'max-len': ['error', { code: 160 }],
        'react-hooks/exhaustive-deps': 0,
        'arrow-body-style': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-unused-vars': 1,
        '@typescript-eslint/no-var-requires': 0,
        'no-debugger': 1,
        'no-return-await': 0,
        'import/prefer-default-export': 0,
        'no-plusplus': 0,
    },
};
