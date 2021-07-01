"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_node_resolve_1 = __importDefault(require("@rollup/plugin-node-resolve"));
var rollup_1 = __importDefault(require("@svgr/rollup"));
var autoprefixer_1 = __importDefault(require("autoprefixer"));
var lodash_camelCase_1 = __importDefault(require("lodash.camelCase")); // eslint-disable-line
var path_1 = require("path");
var rollup_plugin_babel_1 = __importDefault(require("rollup-plugin-babel"));
var rollup_plugin_commonjs_1 = __importDefault(require("rollup-plugin-commonjs"));
var rollup_plugin_inject_1 = __importDefault(require("rollup-plugin-inject"));
var rollup_plugin_json_1 = __importDefault(require("rollup-plugin-json"));
var rollup_plugin_node_builtins_1 = __importDefault(require("rollup-plugin-node-builtins"));
var rollup_plugin_node_globals_1 = __importDefault(require("rollup-plugin-node-globals"));
var rollup_plugin_postcss_1 = __importDefault(require("rollup-plugin-postcss"));
var rollup_plugin_replace_1 = __importDefault(require("rollup-plugin-replace"));
var rollup_plugin_terser_1 = require("rollup-plugin-terser");
var rollup_plugin_typescript2_1 = __importDefault(require("rollup-plugin-typescript2"));
var plugin_url_1 = __importDefault(require("@rollup/plugin-url"));
var temp_dir_1 = __importDefault(require("temp-dir"));
var getConfig = function (opts) {
    var entry = opts.entry, cwd = opts.cwd, type = opts.type, _a = opts.replaceOpts, replaceOpts = _a === void 0 ? {} : _a, userExternal = opts.external;
    var entryExt = path_1.extname(entry);
    var name = path_1.basename(entry, entryExt);
    var isTypeScript = entryExt === '.ts' || entryExt === '.tsx';
    var extensions = ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs'];
    // rollup config
    var input = path_1.join(cwd, entry);
    var format = type;
    var pkg = {};
    try {
        pkg = require(path_1.join(cwd, 'package.json')); // eslint-disable-line
    }
    catch (e) { /** */ }
    var external = __spreadArray(__spreadArray([], Object.keys(pkg.dependencies || {})), Object.keys(pkg.peerDependencies || {}));
    // umd 只要 external peerDependencies
    var externalPeerDeps = __spreadArray(__spreadArray([], Object.keys(__assign({}, pkg.peerDependencies))), userExternal);
    var terserOpts = {
        compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false,
        },
    };
    var injectOpts = false;
    var nodeResolveOpts = {};
    // cjs 不给浏览器用，所以无需 runtimeHelpers
    // const runtimeHelpers = type !== 'cjs';
    var runtimeHelpers = false;
    function getPlugins(options) {
        if (options === void 0) { options = {}; }
        var miniCss = options.miniCss;
        return [
            plugin_url_1.default(),
            rollup_1.default(),
            rollup_plugin_postcss_1.default({
                extract: false,
                inject: true,
                modules: false,
                minimize: !!miniCss,
                plugins: [autoprefixer_1.default()],
            }),
            injectOpts ? rollup_plugin_inject_1.default(injectOpts) : null,
            Object.keys(replaceOpts).length > 0 ? rollup_plugin_replace_1.default(replaceOpts) : null,
            plugin_node_resolve_1.default(__assign({ mainFields: ['module', 'jsnext:main', 'main'], extensions: extensions, browser: true, preferBuiltins: true }, nodeResolveOpts)),
            isTypeScript
                ? rollup_plugin_typescript2_1.default({
                    cwd: cwd,
                    clean: true,
                    cacheRoot: temp_dir_1.default + "/.rollup_plugin_typescript2_cache",
                    // 比如 lerna 的场景不需要每个 package 有个 tsconfig.json
                    tsconfig: path_1.join(cwd, 'tsconfig.json'),
                    tsconfigDefaults: {
                        compilerOptions: {
                        // Generate declaration files by default
                        // declaration: true,
                        },
                    },
                    tsconfigOverride: {
                        compilerOptions: {
                            module: 'ESNext',
                            target: 'esnext',
                        },
                    },
                    check: true,
                })
                : null,
            rollup_plugin_babel_1.default({
                babelrc: false,
                extensions: extensions,
                exclude: /\/node_modules\//,
                runtimeHelpers: runtimeHelpers,
                presets: [
                    [
                        require.resolve('@babel/preset-env'),
                        {
                            targets: { browsers: ['last 2 versions', 'IE 10'] },
                            modules: type === 'esm' ? false : 'auto',
                        },
                    ],
                    require.resolve('@babel/preset-react'),
                ],
                plugins: [
                    require.resolve('@babel/plugin-syntax-dynamic-import'),
                    [
                        require.resolve('@babel/plugin-proposal-decorators'),
                        { legacy: true },
                    ],
                    [
                        require.resolve('@babel/plugin-proposal-class-properties'),
                        { loose: true },
                    ],
                    runtimeHelpers
                        ? [
                            require.resolve('@babel/plugin-transform-runtime'),
                            { useESModules: type === 'esm' },
                        ]
                        : null,
                ].filter(Boolean),
            }),
            rollup_plugin_json_1.default(),
        ].filter(Boolean);
    }
    var extraUmdPlugins = [
        rollup_plugin_commonjs_1.default({
            include: /node_modules/,
        }),
        rollup_plugin_node_globals_1.default(),
        rollup_plugin_node_builtins_1.default(),
    ];
    switch (type) {
        case 'esm':
            return [
                {
                    input: input,
                    output: {
                        format: format,
                        file: path_1.join(cwd, "dist/" + name + ".esm.js"),
                    },
                    plugins: __spreadArray(__spreadArray([], getPlugins()), [rollup_plugin_terser_1.terser(terserOpts)]),
                    external: __spreadArray([], external),
                },
            ];
        case 'cjs':
            return [
                {
                    input: input,
                    output: {
                        format: format,
                        file: path_1.join(cwd, "dist/" + name + ".js"),
                    },
                    plugins: __spreadArray(__spreadArray([], getPlugins()), [rollup_plugin_terser_1.terser(terserOpts)]),
                    external: __spreadArray([], external),
                },
            ];
        case 'umd':
            return [
                {
                    input: input,
                    output: {
                        format: format,
                        sourcemap: true,
                        file: path_1.join(cwd, "dist/" + name + ".umd.js"),
                        name: pkg.name && lodash_camelCase_1.default(path_1.basename(pkg.name)),
                    },
                    plugins: __spreadArray(__spreadArray(__spreadArray([], getPlugins()), extraUmdPlugins), [
                        Object.keys(replaceOpts).length > 0 ? rollup_plugin_replace_1.default(replaceOpts) : null,
                    ]).filter(Boolean),
                    external: __spreadArray([], externalPeerDeps),
                },
            ];
        default:
            return [];
    }
};
exports.default = getConfig;
