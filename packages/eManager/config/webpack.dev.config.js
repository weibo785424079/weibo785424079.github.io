const base = require('./webpack.base.config');
const {merge} = require('webpack-merge');
const webpack = require('webpack')

module.exports = merge(base, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    
    plugins: [new webpack.DefinePlugin({
        'process.env.esite': JSON.stringify('local')
    })]
});
