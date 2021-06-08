import { rollup, watch as watchFn } from 'rollup';
import { green } from 'chalk';
import { EntryOptions } from '../types';
import getConfig from './getConfig';

const build = async (options: EntryOptions) => {
  const {
    entry,
    watch,
    external = [],
    replaceOpts = {},
    type,
  } = options;
  const cwd = process.cwd();
  const rollupConfig = getConfig({
    entry, cwd, type, replaceOpts, external,
  });

  for (const config of rollupConfig) {
    if (watch) {
      const watcher = watchFn({
        ...config,
      });
      watcher.on('event', (event: any) => {
        if (event.errror) {
          console.log(event.error);
        } else if (event.code === 'START') {
          console.log(green(`[${type}] Rebuild since file changed`));
        }
        process.once('SIGINT', () => {
          watcher.close();
        });
      });
    } else {
      const { output, ...input } = config;
      const bundle = await rollup(input);
      await bundle.write(output);
    }
  }
};

export default build;
