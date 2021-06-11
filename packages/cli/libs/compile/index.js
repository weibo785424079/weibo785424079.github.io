const __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, { enumerable: true, get() { return m[k]; } });
}) : (function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}));
const __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
  Object.defineProperty(o, 'default', { enumerable: true, value: v });
}) : function (o, v) {
  o.default = v;
});
const __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) return mod;
  const result = {};
  if (mod != null) for (const k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
const __spreadArray = (this && this.__spreadArray) || function (to, from) {
  for (let i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
  return to;
};
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const path_1 = __importDefault(require('path'));
const fs_1 = require('fs');
const vinyl_fs_1 = __importDefault(require('vinyl-fs'));
const gulp_typescript_1 = __importDefault(require('gulp-typescript'));
const gulp_sass_1 = __importDefault(require('gulp-sass'));
const gulp_if_1 = __importDefault(require('gulp-if'));
const through2_1 = __importDefault(require('through2'));
const chokidar = __importStar(require('chokidar'));
const chalk_1 = __importDefault(require('chalk'));
const babel_1 = __importDefault(require('./babel'));

const createStream = function (files, _a) {
  const { runtimeHelpers } = _a;
  const { baseDir } = _a;
  const { destPath } = _a;
  const _b = _a.type;
  const type = _b === void 0 ? 'esm' : _b;
  return vinyl_fs_1.default.src(files, {
    allowEmpty: true,
    base: baseDir,
  })
    .pipe(gulp_if_1.default((f) => /\.scss$/.test(f.path), gulp_sass_1.default()))
    .pipe(gulp_if_1.default((f) => /(\.(ts)|(\.tsx))$/.test(f.path), gulp_typescript_1.default({
      allowSyntheticDefaultImports: true,
      declaration: true,
      module: 'esnext',
      target: 'esnext',
      moduleResolution: 'node',
      jsx: 'react',
    })))
    .pipe(gulp_if_1.default((f) => /\.js$/.test(f.path), through2_1.default.obj((file, env, cb) => {
      try {
        const str = Buffer.from(babel_1.default({
          file,
          type,
          runtimeHelpers,
        }));
        file.contents = str;
        cb(null, file);
      } catch (error) {
        console.log(error);
      }
    })))
    .pipe(vinyl_fs_1.default.dest(destPath));
};
exports.default = (function (_a) {
  const { cwd } = _a;
  const { sourceDir } = _a;
  const { watch } = _a;
  const { runtimeHelpers } = _a;
  const { type } = _a;
  const ignores = [
    `!${path_1.default.resolve(cwd, sourceDir, '.umi/')}`,
    `!${path_1.default.resolve(cwd, sourceDir, '.umi-production/')}`,
    `!${path_1.default.resolve(cwd, sourceDir, '**/fixtures{,/**}')}`,
    `!${path_1.default.resolve(cwd, sourceDir, '**/demos{,/**}')}`,
    `!${path_1.default.resolve(cwd, sourceDir, '**/__test__{,/**}')}`,
    `!${path_1.default.resolve(cwd, sourceDir, '**/__tests__{,/**}')}`,
    `!${path_1.default.resolve(cwd, sourceDir, '**/*.mdx')}`,
    `!${path_1.default.resolve(cwd, sourceDir, '**/*.md')}`,
  ];
  const patterns = __spreadArray([
    path_1.default.resolve(cwd, sourceDir, '**/*.js'),
    path_1.default.resolve(cwd, sourceDir, '**/*.jsx'),
    path_1.default.resolve(cwd, sourceDir, '**/*.ts'),
    path_1.default.resolve(cwd, sourceDir, '**/*.tsx'),
    path_1.default.resolve(cwd, sourceDir, '**/*.scss'),
    path_1.default.resolve(cwd, sourceDir, '**/*.css'),
    path_1.default.resolve(cwd, sourceDir, '**/*'),
  ], ignores);
  return new Promise((resolve) => {
    const baseDir = path_1.default.resolve(cwd, sourceDir);
    const destPath = path_1.default.resolve(cwd, 'dist', type);
    createStream(patterns, {
      destPath, runtimeHelpers, type, baseDir,
    }).on('end', () => {
      if (watch) {
        console.log(chalk_1.default.green('开始监听文件夹...', path_1.default.resolve(cwd, sourceDir)));
        const watcher = chokidar.watch(patterns, {
          ignoreInitial: true,
        });
        watcher.on('all', (event, fullPath) => {
          const relPath = fullPath.replace(sourceDir, '');
          console.log(`[${event}] ${path_1.default.join(sourceDir, relPath).replace(`${cwd}/`, '')}`);
          if (fs_1.statSync(fullPath).isFile()) {
            createStream(__spreadArray([fullPath], ignores), {
              destPath, baseDir, runtimeHelpers, type,
            });
          }
        });
      } else {
        console.log();
        console.log(chalk_1.default.green(`esite compile ${path_1.default.resolve(cwd, sourceDir)} \u6210\u529F...`));
        resolve();
      }
    });
  });
});
