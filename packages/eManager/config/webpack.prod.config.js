const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const base = require('./webpack.base.config.js');

module.exports = merge(base, {
  plugins: [new CleanWebpackPlugin()],
});
