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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var vinyl_fs_1 = __importDefault(require("vinyl-fs"));
var gulp_typescript_1 = __importDefault(require("gulp-typescript"));
var gulp_sass_1 = __importDefault(require("gulp-sass"));
var gulp_if_1 = __importDefault(require("gulp-if"));
var through2_1 = __importDefault(require("through2"));
var chokidar = __importStar(require("chokidar"));
var chalk_1 = __importDefault(require("chalk"));
var babel_1 = __importDefault(require("./babel"));
var createStream = function (files, _a) {
    var runtimeHelpers = _a.runtimeHelpers, baseDir = _a.baseDir, destPath = _a.destPath, _b = _a.type, type = _b === void 0 ? 'esm' : _b;
    return vinyl_fs_1.default.src(files, {
        allowEmpty: true,
        base: baseDir,
    })
        .pipe(gulp_if_1.default(function (f) { return /\.scss$/.test(f.path); }, gulp_sass_1.default()))
        .pipe(gulp_if_1.default(function (f) { return /(\.(ts)|(\.tsx))$/.test(f.path); }, gulp_typescript_1.default({
        allowSyntheticDefaultImports: true,
        declaration: true,
        module: 'esnext',
        target: 'esnext',
        moduleResolution: 'node',
        jsx: 'react',
    })))
        .pipe(gulp_if_1.default(function (f) { return /\.js$/.test(f.path); }, through2_1.default.obj(function (file, env, cb) {
        try {
            var str = Buffer.from(babel_1.default({
                file: file,
                type: type,
                runtimeHelpers: runtimeHelpers,
            }));
            file.contents = str; // eslint-disable-line
            cb(null, file);
        }
        catch (error) {
            console.log(error);
        }
    })))
        .pipe(vinyl_fs_1.default.dest(destPath));
};
exports.default = (function (_a) {
    var cwd = _a.cwd, sourceDir = _a.sourceDir, watch = _a.watch, runtimeHelpers = _a.runtimeHelpers, type = _a.type;
    var ignores = [
        "!" + path_1.default.resolve(cwd, sourceDir, '.umi/'),
        "!" + path_1.default.resolve(cwd, sourceDir, '.umi-production/'),
        "!" + path_1.default.resolve(cwd, sourceDir, '**/fixtures{,/**}'),
        "!" + path_1.default.resolve(cwd, sourceDir, '**/demos{,/**}'),
        "!" + path_1.default.resolve(cwd, sourceDir, '**/__test__{,/**}'),
        "!" + path_1.default.resolve(cwd, sourceDir, '**/__tests__{,/**}'),
        "!" + path_1.default.resolve(cwd, sourceDir, '**/*.mdx'),
        "!" + path_1.default.resolve(cwd, sourceDir, '**/*.md'),
    ];
    var patterns = __spreadArray([
        path_1.default.resolve(cwd, sourceDir, '**/*.js'),
        path_1.default.resolve(cwd, sourceDir, '**/*.jsx'),
        path_1.default.resolve(cwd, sourceDir, '**/*.ts'),
        path_1.default.resolve(cwd, sourceDir, '**/*.tsx'),
        path_1.default.resolve(cwd, sourceDir, '**/*.scss'),
        path_1.default.resolve(cwd, sourceDir, '**/*.css'),
        path_1.default.resolve(cwd, sourceDir, '**/*')
    ], ignores);
    return new Promise(function (resolve) {
        var baseDir = path_1.default.resolve(cwd, sourceDir);
        var destPath = path_1.default.resolve(cwd, 'dist', type);
        createStream(patterns, {
            destPath: destPath, runtimeHelpers: runtimeHelpers, type: type, baseDir: baseDir,
        }).on('end', function () {
            if (watch) {
                console.log(chalk_1.default.green('开始监听文件夹...', path_1.default.resolve(cwd, sourceDir)));
                var watcher = chokidar.watch(patterns, {
                    ignoreInitial: true,
                });
                watcher.on('all', function (event, fullPath) {
                    var relPath = fullPath.replace(sourceDir, '');
                    console.log("[" + event + "] " + path_1.default.join(sourceDir, relPath).replace(cwd + "/", ''));
                    if (fs_1.statSync(fullPath).isFile()) {
                        createStream(__spreadArray([fullPath], ignores), {
                            destPath: destPath, baseDir: baseDir, runtimeHelpers: runtimeHelpers, type: type,
                        });
                    }
                });
            }
            else {
                console.log();
                console.log(chalk_1.default.green("esite compile " + path_1.default.resolve(cwd, sourceDir) + " \u6210\u529F..."));
                resolve();
            }
        });
    });
});
