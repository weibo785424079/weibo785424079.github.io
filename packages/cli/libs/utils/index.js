"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var runCommand = function (command, args) { return new Promise(function (resolve, reject) {
    args = args || [];
    var executedCommand = child_process_1.spawn(command, args, {
        stdio: 'inherit',
        shell: true,
    });
    executedCommand.on('error', function (error) {
        reject(error);
    });
    executedCommand.on('exit', function (code) {
        if (code === 0) {
            resolve();
        }
        else {
            reject();
        }
    });
}); };
exports.default = runCommand;
