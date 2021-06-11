import { spawn } from 'child_process';
import ora from 'ora';

const spinner = ora();

const runCommand = (command: string, args?: string[]) => new Promise<void>((resolve, reject) => {
  args = args || [];
  const executedCommand = spawn(command, args, {
    stdio: 'inherit',
    shell: true,
  });

  executedCommand.on('error', (error) => {
    reject(error);
  });

  executedCommand.on('exit', (code) => {
    if (code === 0) {
      resolve();
    } else {
      reject();
    }
  });
});

const executedFnWaitLoading = async (fn: any, text: string = "资源加载中...") => {
  if(fn) {
    spinner.start(text)
    await fn();
    spinner.stop()
  }
}

export {
  runCommand,
  executedFnWaitLoading,
  spinner,
}

export default runCommand;
