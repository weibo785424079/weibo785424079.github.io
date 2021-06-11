var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (const p in s) { if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]; }
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
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
const __rest = (this && this.__rest) || function (s, e) {
  const t = {};
  for (var p in s) { if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p]; }
  if (s != null && typeof Object.getOwnPropertySymbols === 'function') {
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
  }
  return t;
};
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const rollup_1 = require('rollup');
const chalk_1 = require('chalk');
const getConfig_1 = __importDefault(require('./getConfig'));

const build = function (options) {
  return __awaiter(void 0, void 0, void 0, function () {
    let entry; let watch; let _a; let external; let _b; let replaceOpts; let type; let cwd; let rollupConfig; let _loop_1; let _i; let rollupConfig_1; let
      config;
    return __generator(this, (_c) => {
      switch (_c.label) {
        case 0:
          entry = options.entry, watch = options.watch, _a = options.external, external = _a === void 0 ? [] : _a, _b = options.replaceOpts, replaceOpts = _b === void 0 ? {} : _b, type = options.type;
          cwd = process.cwd();
          rollupConfig = getConfig_1.default({
            entry, cwd, type, replaceOpts, external,
          });
          _loop_1 = function (config) {
            let watcher_1; let output; let input; let
              bundle;
            return __generator(this, (_d) => {
              switch (_d.label) {
                case 0:
                  if (!watch) return [3 /* break */, 1];
                  watcher_1 = rollup_1.watch({ ...config });
                  watcher_1.on('event', (event) => {
                    if (event.errror) {
                      console.log(event.error);
                    } else if (event.code === 'START') {
                      console.log(chalk_1.green(`[${type}] Rebuild since file changed`));
                    }
                    process.once('SIGINT', () => {
                      watcher_1.close();
                    });
                  });
                  return [3 /* break */, 4];
                case 1:
                  output = config.output, input = __rest(config, ['output']);
                  return [4 /* yield */, rollup_1.rollup(input)];
                case 2:
                  bundle = _d.sent();
                  return [4 /* yield */, bundle.write(output)];
                case 3:
                  _d.sent();
                  _d.label = 4;
                case 4: return [2];
              }
            });
          };
          _i = 0, rollupConfig_1 = rollupConfig;
          _c.label = 1;
        case 1:
          if (!(_i < rollupConfig_1.length)) return [3 /* break */, 4];
          config = rollupConfig_1[_i];
          return [5 /* yield* */, _loop_1(config)];
        case 2:
          _c.sent();
          _c.label = 3;
        case 3:
          _i++;
          return [3 /* break */, 1];
        case 4: return [2];
      }
    });
  });
};
exports.default = build;
