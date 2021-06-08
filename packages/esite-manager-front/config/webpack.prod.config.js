const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const base = require('./webpack.base.config');

module.exports = merge(base, {
    externals: {
        react: 'React', // cdn版本为 v16.13.1
        'react-dom': 'ReactDOM', // cdn版本为 16.13.1
        'react-router-dom': 'ReactRouterDOM', // cdn版本为 v5.2.0
        moment: 'moment', // cdn版本为 未知
        axios: 'axios',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                cache: true,
                parallel: true,
                terserOptions: {
                    ecma: 5,
                    warnings: false,
                    compress: {
                        properties: false,
                        drop_console: process.env.TMS_ENV === 'prod' || false,
                    },
                    output: {
                        comments: false,
                        beautify: false,
                    },
                },
            }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index-prod.html',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.TMS_ENV': JSON.stringify(process.env.TMS_ENV),
        }),
    ],
});
