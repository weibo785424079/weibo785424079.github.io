// process.env.NODE_ENV = 'development';
const base = require('./webpack.base.config');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const DevServer = require('webpack-dev-server');
const detectPort = require('detect-port');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const createErrorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const { printInstructions, getLocalIp, getLocalIpSync } = require('./utils');

const root = path.resolve(__dirname, '..');

const TARGET_MAP = {
    dev: 'http://trialos.dev.com',
    test: 'http://trialos.test.com',
    uat: 'https://uat.trialos.com',
    demo: 'https://demo.trialos.com',
    prod: 'https://www.trialos.com',
    event: 'https://event.trialos.com',
};
const publicPath = '/'; // 这里不要修改，会导致路由刷新404的问题，如有需要，在打包配置里修改即可
const target = TARGET_MAP[process.env.TMS_ENV] || TARGET_MAP.test;
const host = getLocalIpSync();

// 代理接口
let proxy = [];

try {
    proxy = require('../.proxy')(target, host);
    console.log('proxy', proxy);
} catch (error) {
    console.log('加载代理失败，如果没有设置本地代理，请忽略此提示：');
}

const webpackConfig = merge(base, {
    devtool: 'cheap-module-source-map',
    output: {
        publicPath: '/',
    },
    externals: {
        moment: 'moment',
        axios: 'axios',
    },
    devServer: {
        before(app) {
            app.use(createErrorOverlayMiddleware());
        },
        onListening: function (server) {
            setImmediate(() => {
                getLocalIp((localIp) => {
                    const port = server.listeningApp.address().port;
                    printInstructions(
                        'eManager',
                        {
                            localUrlForTerminal: '',
                            lanUrlForTerminal: `http://${localIp}:${port}/site-manager/`,
                        },
                        true,
                    );
                });
            });
        },
        publicPath,
        disableHostCheck: true,
        contentBase: path.resolve(root, 'dist'),
        compress: true,
        port: 9000,
        open: true,
        hot: true,
        host,
        historyApiFallback: true,
        proxy: [
            ...proxy,
            {
                context: ['!/site-manager/**'],
                target,
                changeOrigin: true,
                pathRewrite: {
                    '^/$': '',
                },
                historyApiFallback: true,
                cookieDomainRewrite: host,
            },
        ],
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index-dev.html',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.TMS_ENV': JSON.stringify(process.env.TMS_ENV),
        }),
    ],
});
(async () => {
    const port = await detectPort(9000);
    new DevServer(webpack(webpackConfig), webpackConfig.devServer).listen(port);
})();
