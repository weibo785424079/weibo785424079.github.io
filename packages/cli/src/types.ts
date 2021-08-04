export interface EntryOptions {
  esm: boolean;
  umd: boolean;
  cjs: boolean;
  entry: string;
  watch: boolean;
  replaceOpts: any;
  external: string[];
  type: 'esm' | 'cjs' | 'umd';
}

export interface TransformOPtions {
  sourceDir: string;
  cwd: string;
  watch: boolean;
  runtimeHelpers: boolean;
  type: CompileTypes;
}

export type CompileTypes = 'esm' | 'cjs';
