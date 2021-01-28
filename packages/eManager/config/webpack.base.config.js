const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const createErrorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const root = path.resolve(__dirname, '..');

const publicPath = '/e-manager'

module.exports = {
    entry: {
        main: path.resolve(root, './src/index.tsx')
    },
    output: {
        publicPath,
        path: path.resolve(root, 'dist'),
        filename: `[name].[hash:8].js`,
        chunkFilename: '[name].[contentHash:8].js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            '@': path.resolve(root, 'src'),
            'react-dom': '@hot-loader/react-dom',
            'hooks': path.resolve(root, 'src/hooks'),
            'components': path.resolve(root, 'src/components'),
            'utils': path.resolve(root, 'src/utils'),
            'action': path.resolve(root, 'src/action'),
            'view': path.resolve(root, 'src/view'),
            'styles': path.resolve(root, 'src/styles'),
            'asserts': path.resolve(root, 'src/asserts')
        }
    },
    devServer: {
        before(app) {
            app.use(createErrorOverlayMiddleware());
        },
        publicPath,
        disableHostCheck: true,
        contentBase: path.resolve(root, 'dist'),
        compress: true,
        port: 9000,
        open: true,
        hot: true,
        historyApiFallback: true,
        proxy: {}
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    },
                    process.env.mode === 'local'? {
                        loader: 'react-dev-inspector/plugins/webpack/inspector-loader',
                        options: { exclude: [path.resolve(__dirname, '想要排除的目录')] }
                    }: null,
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ].filter(Boolean)
            },
            {
                test: sassModuleRegex,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: sassRegex,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 1024,
                            name: 'images/[name].[hash:7].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.PWD': JSON.stringify(process.env.PWD)
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new ForkTsCheckerPlugin()
    ]
};
