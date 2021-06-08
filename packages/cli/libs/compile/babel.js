"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var babel = __importStar(require("@babel/core"));
var importScssOrLess2Css_1 = __importDefault(require("../importScssOrLess2Css"));
function transofrmCode(options) {
    var contents = options.file.contents, type = options.type, _a = options.runtimeHelpers, runtimeHelpers = _a === void 0 ? false : _a;
    return babel.transformSync(contents, {
        babelrc: false,
        presets: [
            [
                require.resolve('@babel/preset-env'),
                {
                    targets: { browsers: ['last 2 versions', 'IE 10'] },
                    modules: type === 'esm' ? false : 'cjs',
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
            [require.resolve('@babel/plugin-proposal-private-methods'), { loose: true }],
            [
                require.resolve('@babel/plugin-proposal-class-properties'),
                { loose: true },
            ],
            importScssOrLess2Css_1.default(),
            runtimeHelpers
                ? [
                    require.resolve('@babel/plugin-transform-runtime'),
                    { useESModules: type === 'esm' },
                ]
                : null,
        ].filter(Boolean),
    }).code;
}
exports.default = transofrmCode;
