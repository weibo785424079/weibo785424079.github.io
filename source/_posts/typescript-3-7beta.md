---
title: typescript@3.7beta
date: 2019-10-29 20:02:29
tags:
---
# 新增功能

## 1，可选链 ?.


```ts
  let x = foo.bar.baz()
    =>
  let x = (f===null || foo === undefined) ?
        Undefined :
        foo.bar.baz()
```
不同于&&，这个操作符仅处理null和undefined

## 2，空值合并 ??
  ```ts
  let x = foo ?? Bar()
  =>
  let x = (foo!==null&&foo!==undefined) ?
    foo :
    bar()
  ```
  同可选链, 只判断null和iundefined，(|| 会有意外发生，因为 0 NaN ‘’ 会被认为是假)


  哈哈
