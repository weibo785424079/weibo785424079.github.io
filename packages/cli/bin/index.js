#!/usr/bin/env node

/* eslint-disable */
const path = require('path');
const chalk = require('chalk');
const { Command } = require('commander');
const build = require('../libs/build/index').default;
const compile = require('../libs/compile/index').default;
const docs = require('../libs/docs/index').default;
const create = require('../libs/create/index').default;

const program = new Command();

const cwd = process.cwd();

const loadUserConfig = (type) => {
  let userConfig = {};

  const userConfigFile = path.resolve(cwd, '.siterc.js');
  try {
    userConfig = require(userConfigFile);
    console.log(chalk.green('加载 .siterc.js...'));
  } catch (e) {
    // console.error(e);
  }
  return userConfig[type] || {};
};

program.command('compile <sourceDir>')
  .description('编译指定目录文件')
  .option('-w, --watch', '开启watch模式', false)
  .option('-t, --type [type]', '打包格式', 'esm')
  .action((sourceDir, { watch, type }) => {
    compile({
      ...loadUserConfig('compile'),
      cwd,
      sourceDir,
      watch,
      type,
    });
  });

program.command('build <entry>')
  .description('使用rollup构建单文件')
  .option('-t, --type [type]', '打包格式', 'umd')
  .option('-w, --watch', '开启观察文件夹', false)
  .action((entry, { type, watch }) => {
    build({
      ...loadUserConfig('build'),
      cwd,
      entry,
      type,
      watch,
    });
  });

program.command('docs <command>')
  .description('使用dumi构建文档')
  .action((command) => {
    docs({
      command,
    });
  });

program.command('create [name]')
  .description('初始化项目，组件')
  .action((name = '') => {
    create(name);
  });

program.parse(process.argv);
