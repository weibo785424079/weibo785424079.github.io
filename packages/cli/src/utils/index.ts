import { spawn } from 'child_process';

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

export default runCommand;
