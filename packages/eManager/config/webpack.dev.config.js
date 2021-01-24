const base = require('./webpack.base.config');
const {merge} = require('webpack-merge');

module.exports = merge(base, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map'
});
