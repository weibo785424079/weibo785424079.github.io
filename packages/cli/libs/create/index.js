"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
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
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = exports.copyTemplateFiles = void 0;
var shelljs_1 = __importDefault(require("shelljs"));
var inquirer_1 = __importDefault(require("inquirer"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var download_git_repo_1 = __importDefault(require("download-git-repo"));
var chalk_1 = __importDefault(require("chalk"));
var utils_1 = __importDefault(require("../utils"));
function copyTemplateFiles(options) {
    shelljs_1.default.cp('-R', [options.templateDirectory + "/*", options.templateDirectory + "/.*"], options.targetDirectory + "/");
}
exports.copyTemplateFiles = copyTemplateFiles;
function createProject(options) {
    var cwd = process.cwd();
    var templateDirectory = path_1.default.resolve(__dirname, '../../template/', options.type);
    var targetDirectory = path_1.default.resolve(cwd, options.dirName);
    shelljs_1.default.mkdir([targetDirectory]);
    copyTemplateFiles({
        templateDirectory: templateDirectory,
        targetDirectory: targetDirectory,
    });
    process.chdir(targetDirectory);
    utils_1.default('yarn');
}
exports.createProject = createProject;
var checkDirExist = function (dirName) {
    var cwd = process.cwd();
    var targetDirectory = path_1.default.resolve(cwd, dirName);
    if (fs_1.default.existsSync(targetDirectory)) {
        console.log("directory " + targetDirectory + " already exist!");
        process.exit(1);
    }
};
exports.default = (function (name) { return __awaiter(void 0, void 0, void 0, function () {
    var questions, _a, type, originDirName, dirName;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (name) {
                    checkDirExist(name);
                }
                questions = [
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
                return [4 /*yield*/, inquirer_1.default.prompt(questions)];
            case 1:
                _a = _b.sent(), type = _a.type, originDirName = _a.dirName;
                dirName = name || originDirName;
                checkDirExist(dirName);
                if (type === 'git-repo') {
                    download_git_repo_1.default('direct:http://git.taimei.com/hospital/site-manager-front.git#template', dirName, { clone: true }, function (err) {
                        console.log(err ? 'download fail!' : chalk_1.default.green('template download successfully， let`s code！'));
                    });
                }
                else {
                    createProject({ type: type, dirName: dirName });
                }
                return [2 /*return*/];
        }
    });
}); });
