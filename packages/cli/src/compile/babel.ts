import * as babel from '@babel/core';
import transformImportLess2Css from '../importScssOrLess2Css';

interface ItransformOpts {
  file: {
    contents: string;
    path: string;
  };
  type: 'esm' | 'cjs';
  runtimeHelpers: boolean;
}

function transofrmCode(options: ItransformOpts) {
  const {
    file: { contents },
    type,
    runtimeHelpers = false
  } = options;
  return babel.transformSync(contents, {
    babelrc: false,
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          targets: { browsers: ['last 2 versions', 'IE 10'] },
          modules: type === 'esm' ? false : 'cjs'
        }
      ],
      require.resolve('@babel/preset-react')
    ],
    plugins: [
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      [require.resolve('@babel/plugin-proposal-private-methods'), { loose: true }],
      [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
      transformImportLess2Css(),
      runtimeHelpers ? [require.resolve('@babel/plugin-transform-runtime'), { useESModules: type === 'esm' }] : null
    ].filter(Boolean)
  }).code;
}

export default transofrmCode;
