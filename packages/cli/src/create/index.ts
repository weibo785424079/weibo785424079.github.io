import shelljs from 'shelljs';
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';
import download from 'download-git-repo';
import chalk from 'chalk';
import runCommand from '../utils';

export interface Create {
    type: 'js-sdk' | 'react-component';
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
  const questions = [
    name ? null : {
      type: 'input',
      name: 'dirName',
      message: 'Please input a dir name',
      default: '',
    },
    {
      type: 'list',
      name: 'type',
      message: 'Please choose which project template to use',
      choices: ['js-sdk', 'react-component', 'git-repo'],
      default: 'react-component',
    },
  ].filter(Boolean);
  const { type, dirName: originDirName } = await inquirer.prompt(questions);
  const dirName = name || originDirName;
  checkDirExist(dirName);
  if (type === 'git-repo') {
    download('direct:http://git.taimei.com/hospital/site-manager-front.git#template', dirName, { clone: true }, (err: Error | null) => {
      console.log(err ? 'download fail!' : chalk.green('template download successfully， let`s code！'));
    });
  } else {
    createProject({ type, dirName });
  }
};
