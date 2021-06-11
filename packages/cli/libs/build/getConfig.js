var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (const p in s) { if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]; }
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
const __spreadArray = (this && this.__spreadArray) || function (to, from) {
  for (let i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
  return to;
};
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const plugin_node_resolve_1 = __importDefault(require('@rollup/plugin-node-resolve'));
const rollup_1 = __importDefault(require('@svgr/rollup'));
const autoprefixer_1 = __importDefault(require('autoprefixer'));
var lodash_camelCase_1 = __importDefault(require("lodash.camelCase")); // eslint-disable-line
const path_1 = require('path');
const rollup_plugin_babel_1 = __importDefault(require('rollup-plugin-babel'));
const rollup_plugin_commonjs_1 = __importDefault(require('rollup-plugin-commonjs'));
const rollup_plugin_inject_1 = __importDefault(require('rollup-plugin-inject'));
const rollup_plugin_json_1 = __importDefault(require('rollup-plugin-json'));
const rollup_plugin_node_builtins_1 = __importDefault(require('rollup-plugin-node-builtins'));
const rollup_plugin_node_globals_1 = __importDefault(require('rollup-plugin-node-globals'));
const rollup_plugin_postcss_1 = __importDefault(require('rollup-plugin-postcss'));
const rollup_plugin_replace_1 = __importDefault(require('rollup-plugin-replace'));
const rollup_plugin_terser_1 = require('rollup-plugin-terser');
const rollup_plugin_typescript2_1 = __importDefault(require('rollup-plugin-typescript2'));
const plugin_url_1 = __importDefault(require('@rollup/plugin-url'));
const temp_dir_1 = __importDefault(require('temp-dir'));

const getConfig = function (opts) {
  const { entry } = opts;
  const { cwd } = opts;
  const { type } = opts;
  const _a = opts.replaceOpts;
  const replaceOpts = _a === void 0 ? {} : _a;
  const userExternal = opts.external;
  const entryExt = path_1.extname(entry);
  const name = path_1.basename(entry, entryExt);
  const isTypeScript = entryExt === '.ts' || entryExt === '.tsx';
  const extensions = ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs'];
  // rollup config
  const input = path_1.join(cwd, entry);
  const format = type;
  let pkg = {};
  try {
        pkg = require(path_1.join(cwd, 'package.json')); // eslint-disable-line
  } catch (e) { /** */ }
  const external = __spreadArray(__spreadArray([], Object.keys(pkg.dependencies || {})), Object.keys(pkg.peerDependencies || {}));
  // umd 只要 external peerDependencies
  const externalPeerDeps = __spreadArray(__spreadArray([], Object.keys({ ...pkg.peerDependencies })), userExternal);
  const terserOpts = {
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: false,
    },
  };
  const injectOpts = false;
  const nodeResolveOpts = {};
  // cjs 不给浏览器用，所以无需 runtimeHelpers
  // const runtimeHelpers = type !== 'cjs';
  const runtimeHelpers = false;
  function getPlugins(options) {
    if (options === void 0) { options = {}; }
    const { miniCss } = options;
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
      plugin_node_resolve_1.default({
        mainFields: ['module', 'jsnext:main', 'main'], extensions, browser: true, preferBuiltins: true, ...nodeResolveOpts,
      }),
      isTypeScript
        ? rollup_plugin_typescript2_1.default({
          cwd,
          clean: true,
          cacheRoot: `${temp_dir_1.default}/.rollup_plugin_typescript2_cache`,
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
        extensions,
        exclude: /\/node_modules\//,
        runtimeHelpers,
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
  const extraUmdPlugins = [
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
          input,
          output: {
            format,
            file: path_1.join(cwd, `dist/${name}.esm.js`),
          },
          plugins: __spreadArray(__spreadArray([], getPlugins()), [rollup_plugin_terser_1.terser(terserOpts)]),
          external: __spreadArray([], external),
        },
      ];
    case 'cjs':
      return [
        {
          input,
          output: {
            format,
            file: path_1.join(cwd, `dist/${name}.js`),
          },
          plugins: __spreadArray(__spreadArray([], getPlugins()), [rollup_plugin_terser_1.terser(terserOpts)]),
          external: __spreadArray([], external),
        },
      ];
    case 'umd':
      return [
        {
          input,
          output: {
            format,
            sourcemap: true,
            file: path_1.join(cwd, `dist/${name}.umd.js`),
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
