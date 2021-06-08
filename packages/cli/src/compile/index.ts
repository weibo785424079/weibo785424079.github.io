import path from 'path';
import { statSync } from 'fs';
import vfs from 'vinyl-fs';
import gulpTs from 'gulp-typescript';
import gulpSass from 'gulp-sass';
import gulpIf from 'gulp-if';
import through from 'through2';
import * as chokidar from 'chokidar';
import chalk from 'chalk';
import transofrmCode from './babel';
import { TransformOPtions, CompileTypes } from '../types';

interface Option {
  runtimeHelpers: boolean, destPath: string, type: CompileTypes, baseDir: string
}

const createStream = (files: string[], {
  runtimeHelpers,
  baseDir,
  destPath,
  type = 'esm',
} : Option) => vfs.src(files, {
  allowEmpty: true,
  base: baseDir,
})
  .pipe(gulpIf((f) => /\.scss$/.test(f.path), gulpSass()))
  .pipe(gulpIf((f) => /(\.(ts)|(\.tsx))$/.test(f.path), gulpTs(
    {
      allowSyntheticDefaultImports: true,
      declaration: true,
      module: 'esnext',
      target: 'esnext',
      moduleResolution: 'node',
      jsx: 'react',
    },
  )))
  .pipe(gulpIf((f: {path: string}) => /\.js$/.test(f.path), through.obj((file, env, cb) => {
    try {
      const str = Buffer.from(
        transofrmCode({
          file,
          type,
          runtimeHelpers,
        }),
      );
      file.contents = str;
      cb(null, file);
    } catch (error) {
      console.log(error);
    }
  })))
  .pipe(vfs.dest(destPath));

export default ({
  cwd,
  sourceDir,
  watch,
  runtimeHelpers,
  type,
}: TransformOPtions) => {
  const ignores = [
    `!${path.resolve(cwd, sourceDir, '.umi/')}`,
    `!${path.resolve(cwd, sourceDir, '.umi-production/')}`,
    `!${path.resolve(cwd, sourceDir, '**/fixtures{,/**}')}`,
    `!${path.resolve(cwd, sourceDir, '**/demos{,/**}')}`,
    `!${path.resolve(cwd, sourceDir, '**/__test__{,/**}')}`,
    `!${path.resolve(cwd, sourceDir, '**/__tests__{,/**}')}`,
    `!${path.resolve(cwd, sourceDir, '**/*.mdx')}`,
    `!${path.resolve(cwd, sourceDir, '**/*.md')}`,
  ];
  const patterns = [
    path.resolve(cwd, sourceDir, '**/*.js'),
    path.resolve(cwd, sourceDir, '**/*.jsx'),
    path.resolve(cwd, sourceDir, '**/*.ts'),
    path.resolve(cwd, sourceDir, '**/*.tsx'),
    path.resolve(cwd, sourceDir, '**/*.scss'),
    path.resolve(cwd, sourceDir, '**/*.css'),
    path.resolve(cwd, sourceDir, '**/*'),
    ...ignores,
  ];
  return new Promise<void>((resolve) => {
    const baseDir = path.resolve(cwd, sourceDir);
    const destPath = path.resolve(cwd, 'dist', type);
    createStream(patterns, {
      destPath, runtimeHelpers, type, baseDir,
    }).on('end', () => {
      if (watch) {
        console.log(chalk.green('开始监听文件夹...', path.resolve(cwd, sourceDir)));
        const watcher = chokidar.watch(patterns, {
          ignoreInitial: true,
        });
        watcher.on('all', (event, fullPath) => {
          const relPath = fullPath.replace(sourceDir, '');
          console.log(
            `[${event}] ${path.join(sourceDir, relPath).replace(
              `${cwd}/`,
              '',
            )}`,
          );
          if (statSync(fullPath).isFile()) {
            createStream([fullPath, ...ignores], {
              destPath, baseDir, runtimeHelpers, type,
            });
          }
        });
      } else {
        console.log();
        console.log(chalk.green(`esite compile ${path.resolve(cwd, sourceDir)} 成功...`));
        resolve();
      }
    });
  });
};
