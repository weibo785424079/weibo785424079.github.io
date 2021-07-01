import shelljs from 'shelljs';
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';
import download from 'download-git-repo';
import chalk from 'chalk';
import { runCommand } from '../utils';

export interface Create {
    type: 'js-sdk' | 'react-component' | 'git-repo';
    dirName: string;
}
interface CopyTemplateFiles {
    templateDirectory: string;
    targetDirectory: string;
}
export function copyTemplateFiles(options: CopyTemplateFiles) {
  shelljs.cp('-R', [`${options.templateDirectory}/*`, `${options.templateDirectory}/.*`], `${options.targetDirectory}/`);
}

export function createProject(options: Create) {
  const cwd = process.cwd();
  const templateDirectory = path.resolve(__dirname, '../../template/', options.type);
  const targetDirectory = path.resolve(cwd, options.dirName);
  shelljs.mkdir([targetDirectory]);
  copyTemplateFiles({
    templateDirectory,
    targetDirectory,
  });
  process.chdir(targetDirectory);
  runCommand('yarn');
}

const checkDirExist = (dirName:string) => {
  const cwd = process.cwd();
  const targetDirectory = path.resolve(cwd, dirName);
  if (fs.existsSync(targetDirectory)) {
    console.log(`directory ${targetDirectory} already exist!`);
    process.exit(1);
  }
};

export default async (name:string) => {
  if (name) {
    checkDirExist(name);
  }
  // 支持创建的项目类型列表
  const typeList = [
    { type: 'git-repo', desc: 'react-typescript-single-app-template（react 单页面应用）' },
    { type: 'js-sdk', desc: 'js-sdk（纯 js 库）' },
    { type: 'react-component', desc: 'react-component（React UI 组件）' },
  ];
  // 创建项目，询问用户问题
  const questions = [
    name ? null : {
      type: 'input',
      name: 'dirName',
      message: '请输入项目名称：',
      validate(val: string) {
        const validate = val.trim().length > 0;
        return validate || '项目名称不能为空，请重新输入';
      },
      default: null,
    },
    {
      type: 'list',
      name: 'type',
      message: '请选择要使用的模板类型：',
      choices: typeList.map((item) => item.type),
      default: 'react-component',
    },
  ].filter(Boolean);

  const { type, dirName: originDirName } = await inquirer.prompt(questions);
  const dirName = name || originDirName;
  checkDirExist(dirName); // 检查当前项目目录是否已经存在
  if (type === 'git-repo') {
    download('direct:http://git.taimei.com/hospital/site-manager-front.git#template', dirName, { clone: true }, (err: Error | null) => {
      console.log(err ? chalk.red('download fail!') : chalk.green('template download successfully， let`s code！'));
    });
  } else {
    createProject({ type, dirName });
  }
};
