import { fork } from 'child_process';

export default async ({ command }: { command: string }) => {
  try {
    if (command === 'dev' || command === 'build') {
      process.env.UMI_PRESETS = require.resolve('@umijs/preset-dumi'); // start umi use child process
      const child = fork(require.resolve('umi/bin/umi'), [command], {
        stdio: 'inherit'
      }); // handle exit signals

      child.on('exit', (code, signal) => {
        if (signal === 'SIGABRT') {
          process.exit(1);
        }

        process.exit(code || 0);
      }); // for e2e test

      child.on('message', (args) => {
        if (process.send) {
          process.send(args);
        }
      });
      process.on('SIGINT', () => {
        child.kill('SIGINT');
      });
      process.on('SIGTERM', () => {
        child.kill('SIGTERM');
      });
    } else {
      console.log('未知命令');
      process.exit(1);
    }
  } catch (error) {
    console.log(error);
  }
};
