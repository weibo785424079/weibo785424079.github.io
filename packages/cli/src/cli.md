---
title: 脚手架
group:
  title: 脚手架
  path: /cli
  order: 1
---

### @tms/site-cli 脚手架

* 组件，应用模板
* 组件编译ts => es5, tsx => es5
* rollup 打包成 单文件 umd，cjs，esm
* babel + gulp 编译支持目录转换转换成 cjs, esm 
* 命令查看 site -h

<br/>

### 用户自定义配置，待完善

### site build entryfile

- rollup 打包单文件
  - 支持 umd，cjs，esm
  - umd 模块 external peerDenpendencies，esm 和 cjs external denpendencies peerDenpendencies

<br/>

### site compile dir

- 将目录下的 TS，ES6，JSX 转换为 es5

### site docs dev | build

- 内部完全调用 dumi

#### site create [dirname]

- 初始化项目支持以下类型

1. react-component
2. js-sdk
4. 从 gitlab 初始化项目,为 site-manager-front 的template分支
