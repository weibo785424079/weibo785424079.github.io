module.exports = {
    plugins: {
        'postcss-preset-env': {
            stage: 3,
            features: {
                'color-mod-function': { unresolved: 'warn' },
                'nesting-rules': true,
            },
            insertBefore: {},
            autoprefixer: { grid: true },
        },
        cssnano: {
            safe: true,
        },
    },
};
