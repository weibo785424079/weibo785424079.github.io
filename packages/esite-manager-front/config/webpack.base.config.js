const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const isDevelopment = process.env.NODE_ENV === 'development'; // NODE_ENV 在 package.json scripts 中通过 cross-env 定义

const root = path.resolve(__dirname, '..');
const publicPath = '/site-manager/';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
        main: path.resolve(root, './src/index.tsx'),
    },
    output: {
        publicPath,
        path: path.resolve(root, 'dist'),
        filename: `js/[name].[hash:8].js`,
        chunkFilename: 'js/[name].[contentHash:8].js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            '@': path.resolve(root, 'src'),
            hooks: path.resolve(root, 'src/hooks'),
            component: path.resolve(root, 'src/component'),
            utils: path.resolve(root, 'src/utils'),
            action: path.resolve(root, 'src/action'),
            view: path.resolve(root, 'src/view'),
            asserts: path.resolve(root, 'src/asserts'),
            store: path.resolve(root, 'src/store'),
        },
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 0,
            minChunks: 2,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                    isDevelopment && {
                        loader: '@tms/react-dev-inspector/plugins/webpack/inspector-loader',
                    },
                ].filter(Boolean),
            },
            {
                test: /\.less$/,
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: {
                                'primary-color': '#0A47ED',
                                'link-color': '#0A47ED',
                                'border-radius-base': '0px',
                            },
                            javascriptEnabled: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 8,
                            name: 'images/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.PWD': JSON.stringify(process.cwd()),
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[ContentHash:8].css',
        }),
        new ForkTsCheckerPlugin({
            typescript: {
                configOverwrite: {
                    compilerOptions: {
                        noUnusedLocals: false,
                    },
                },
            },
        }),
        new CopyPlugin([{ from: 'public/favicon.png', to: '' }]),
        isDevelopment && new webpack.HotModuleReplacementPlugin(),
        isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
};
