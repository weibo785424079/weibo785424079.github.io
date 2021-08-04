import nodeResolve from '@rollup/plugin-node-resolve';
import svgr from '@svgr/rollup';
import autoprefixer from 'autoprefixer';
import camelCase from 'lodash.camelCase'; // eslint-disable-line
import { basename, extname, join } from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import inject from 'rollup-plugin-inject';
import json from 'rollup-plugin-json';
import buildins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import typescript2 from 'rollup-plugin-typescript2';
import url from '@rollup/plugin-url';
import tempDir from 'temp-dir';

interface IOpts {
  entry: string;
  cwd: string;
  type: 'esm' | 'cjs' | 'umd';
  replaceOpts: any;
  external: string[];
}

interface IPkg {
  dependencies?: Object;
  peerDependencies?: Object;
  name?: string;
}

const getConfig = (opts: IOpts) => {
  const { entry, cwd, type, replaceOpts = {}, external: userExternal } = opts;
  const entryExt = extname(entry);
  const name = basename(entry, entryExt);
  const isTypeScript = entryExt === '.ts' || entryExt === '.tsx';
  const extensions = ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs'];
  // rollup config
  const input = join(cwd, entry);
  const format = type;

  let pkg = {} as IPkg;
  try {
    pkg = require(join(cwd, 'package.json')); // eslint-disable-line
  } catch (e) {
    /** */
  }

  const external = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];

  // umd 只要 external peerDependencies
  const externalPeerDeps = [...Object.keys({ ...pkg.peerDependencies }), ...userExternal];

  const terserOpts = {
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: false
    }
  };
  const injectOpts = false;
  const nodeResolveOpts = {};
  // cjs 不给浏览器用，所以无需 runtimeHelpers
  // const runtimeHelpers = type !== 'cjs';
  const runtimeHelpers = false;

  function getPlugins(options = {} as { miniCss: boolean }) {
    const { miniCss } = options;
    return [
      url(),
      svgr(),
      postcss({
        extract: false,
        inject: true,
        modules: false,
        minimize: !!miniCss,
        plugins: [autoprefixer()]
      }),
      injectOpts ? inject(injectOpts) : null,
      Object.keys(replaceOpts).length > 0 ? replace(replaceOpts) : null,
      nodeResolve({
        mainFields: ['module', 'jsnext:main', 'main'],
        extensions,
        browser: true,
        preferBuiltins: true,
        ...nodeResolveOpts
      }),
      isTypeScript
        ? typescript2({
            cwd,
            clean: true,
            cacheRoot: `${tempDir}/.rollup_plugin_typescript2_cache`,
            // 比如 lerna 的场景不需要每个 package 有个 tsconfig.json
            tsconfig: join(cwd, 'tsconfig.json'),
            tsconfigDefaults: {
              compilerOptions: {
                // Generate declaration files by default
                // declaration: true,
              }
            },
            tsconfigOverride: {
              compilerOptions: {
                module: 'ESNext',
                target: 'esnext'
              }
            },
            check: true
          })
        : null,
      babel({
        babelrc: false,
        extensions,
        exclude: /\/node_modules\//,
        runtimeHelpers,
        presets: [
          [
            require.resolve('@babel/preset-env'),
            {
              targets: { browsers: ['last 2 versions', 'IE 10'] },
              modules: type === 'esm' ? false : 'auto'
            }
          ],
          require.resolve('@babel/preset-react')
        ],
        plugins: [
          require.resolve('@babel/plugin-syntax-dynamic-import'),
          [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
          [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
          runtimeHelpers ? [require.resolve('@babel/plugin-transform-runtime'), { useESModules: type === 'esm' }] : null
        ].filter(Boolean)
      }),
      json()
    ].filter(Boolean);
  }
  const extraUmdPlugins = [
    commonjs({
      include: /node_modules/
    }),
    globals(),
    buildins()
  ];
  switch (type) {
    case 'esm':
      return [
        {
          input,
          output: {
            format,
            file: join(cwd, `dist/${name}.esm.js`)
          },
          plugins: [...getPlugins(), terser(terserOpts)],
          external: [...external]
        }
      ];
    case 'cjs':
      return [
        {
          input,
          output: {
            format,
            file: join(cwd, `dist/${name}.js`)
          },
          plugins: [...getPlugins(), terser(terserOpts)],
          external: [...external]
        }
      ];
    case 'umd':
      return [
        {
          input,
          output: {
            format,
            sourcemap: true,
            file: join(cwd, `dist/${name}.umd.js`),
            name: pkg.name && camelCase(basename(pkg.name))
          },
          plugins: [
            ...getPlugins(),
            ...extraUmdPlugins,
            Object.keys(replaceOpts).length > 0 ? replace(replaceOpts) : null
          ].filter(Boolean),
          external: [...externalPeerDeps]
        }
      ];
    default:
      return [];
  }
};

export default getConfig;
