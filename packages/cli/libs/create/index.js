const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P((resolve) => { resolve(value); }); }
  return new (P || (P = Promise))((resolve, reject) => {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const __generator = (this && this.__generator) || function (thisArg, body) {
  let _ = {
    label: 0, sent() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [],
  }; let f; let y; let t; let
    g;
  return g = { next: verb(0), throw: verb(1), return: verb(2) }, typeof Symbol === 'function' && (g[Symbol.iterator] = function () { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
    if (f) throw new TypeError('Generator is already executing.');
    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y.return : op[0] ? y.throw || ((t = y.return) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0: case 1: t = op; break;
          case 4: _.label++; return { value: op[1], done: false };
          case 5: _.label++; y = op[1]; op = [0]; continue;
          case 7: op = _.ops.pop(); _.trys.pop(); continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
            if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
            if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
            if (t[2]) _.ops.pop();
            _.trys.pop(); continue;
        }
        op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
    }
    if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
};
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.createProject = exports.copyTemplateFiles = void 0;
const shelljs_1 = __importDefault(require('shelljs'));
const inquirer_1 = __importDefault(require('inquirer'));
const path_1 = __importDefault(require('path'));
const fs_1 = __importDefault(require('fs'));
const download_git_repo_1 = __importDefault(require('download-git-repo'));
const chalk_1 = __importDefault(require('chalk'));
const utils_1 = __importDefault(require('../utils'));

function copyTemplateFiles(options) {
  shelljs_1.default.cp('-R', [`${options.templateDirectory}/*`, `${options.templateDirectory}/.*`], `${options.targetDirectory}/`);
}
exports.copyTemplateFiles = copyTemplateFiles;
function createProject(options) {
  const cwd = process.cwd();
  const templateDirectory = path_1.default.resolve(__dirname, '../../template/', options.type);
  const targetDirectory = path_1.default.resolve(cwd, options.dirName);
  shelljs_1.default.mkdir([targetDirectory]);
  copyTemplateFiles({
    templateDirectory,
    targetDirectory,
  });
  process.chdir(targetDirectory);
  utils_1.default('yarn');
}
exports.createProject = createProject;
const checkDirExist = function (dirName) {
  const cwd = process.cwd();
  const targetDirectory = path_1.default.resolve(cwd, dirName);
  if (fs_1.default.existsSync(targetDirectory)) {
    console.log(`directory ${targetDirectory} already exist!`);
    process.exit(1);
  }
};
exports.default = (function (name) {
  return __awaiter(void 0, void 0, void 0, function () {
    let typeList; let questions; let _a; let type; let originDirName; let dirName; let
      userSelectedType;
    return __generator(this, (_b) => {
      switch (_b.label) {
        case 0:
          if (name) {
            checkDirExist(name);
          }
          typeList = [
            { type: 'git-repo', desc: 'react-typescript-single-app-template（react 单页面应用）' },
            { type: 'js-sdk', desc: 'js-sdk（纯 js 库）' },
            { type: 'react-component', desc: 'react-component（React UI 组件）' },
          ];
          questions = [
            name ? null : {
              type: 'input',
              name: 'dirName',
              message: '请输入项目名称：',
              validate(val) {
                const validate = val.trim().length > 0;
                return validate || '项目名称不能为空，请重新输入';
              },
              default: null,
            },
            {
              type: 'list',
              name: 'type',
              message: '请选择要使用的模板类型：',
              choices: typeList.map((item) => item.desc),
              default: 'react-component',
            },
          ].filter(Boolean);
          return [4 /* yield */, inquirer_1.default.prompt(questions)];
        case 1:
          _a = _b.sent(), type = _a.type, originDirName = _a.dirName;
          dirName = name || originDirName;
          checkDirExist(dirName); // 检查当前项目目录是否已经存在
          userSelectedType = typeList.filter((item) => item.desc === type)[0].type;
          if (userSelectedType === 'git-repo') {
            download_git_repo_1.default('direct:http://git.taimei.com/hospital/site-manager-front.git#template', dirName, { clone: true }, (err) => {
              console.log(err ? chalk_1.default.red('download fail!') : chalk_1.default.green('template download successfully， let`s code！'));
            });
          } else {
            createProject({ type, dirName });
          }
          return [2];
      }
    });
  });
});
