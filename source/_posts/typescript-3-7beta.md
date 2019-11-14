---
title: typescript@3.7beta
date: 2019-10-29 20:02:29
tags:
---
# 新增功能

## 1，可选链 ?.


```ts
  let x = foo?.bar.baz()
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

## 3,断言函数
  ```ts
function assertIsString(val: any): asserts val is string {
  if (typeof val !== "string") {
      throw new AssertionError("Not a string!");
  }
}

function yell(str: any) {
    assertIsString(str);
    // 现在 TypeScript 知道 'str' 是一个 'string'。
    return str.toUppercase();
    //         ~~~~~~~~~~~
    // 错误：属性 'toUppercase' 在 'string' 类型上不存在。
    //      你是说 'toUpperCase' 吗？
}

=>

// 这些断言签名与编写类型断言签名非常相似
function isString(val: any): val is string {
  return typeof val === "string";
}

function yell(str: any) {
    if (isString(str)) {
        return str.toUppercase();
    }
    throw "Oops!";
}
```
就像是类型断言签名，这些断言签名也具有难以置信的表现力。我们可以用它们表达一些相当复杂的想法。
```ts
function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
    if (val === undefined || val === null) {
        throw new AssertionError(
            `Expected 'val' to be defined, but received ${val}`
        );
    }
}
```
## 4,类型递归

```ts

type Json =
    | string
    | number
    | boolean
    | null
    | JsonObject
    | JsonArray;

interface JsonObject {
    [property: string]: Json;
}

interface JsonArray extends Array<Json> {}

=> 

type Json =
    | string
    | number
    | boolean
    | null
    | { [property: string]: Json }
    | Json[];
```

这种新的宽松（模式）使我们也可以在元组中递归引用类型别名。下面这个曾经报错的代码现在是有效的 TypeScript 代码

```ts
type VirtualNode =
    | string
    | [string, { [key: string]: any }, ...VirtualNode[]];

const myNode: VirtualNode =
    ["div", { id: "parent" },
      ["div", { id: "first-child" }, "I'm the first child"],
      ["div", { id: "second-child" }, "I'm the second child"]
    ]
```

## 5,未调用的函数检查

  ```ts
  interface User {
    isAdministrator(): boolean;
    notify(): void;
    doNotDisturb?(): boolean;
  }

  // 稍后……

  // 有问题的代码，请勿使用！
  function doAdminThing(user: User) {
      // 糟糕！
      if (user.isAdministrator) {
          sudo();
          editTheConfiguration();
      }
      else {
          throw new AccessDeniedError("User is not an admin");
      }
  }
```
在这里，我们忘记了调用 isAdministrator，该代码将错误地允许非管理员用户编辑配置！
在 TypeScript 3.7 中，这会被标识为可能的错误：
```ts
function doAdminThing(user: User) {
    if (user.isAdministrator) {
    //  ~~~~~~~~~~~~~~~~~~~~
    // 错误！这个条件将始终返回 true，因为这个函数定义是一直存在的
    //      你的意思是调用它吗？
    }
}
```
strictNullChecks关闭或者参数或之后在 if 中调用此函数或者属性是可选的，将不会产生错误：
```ts
interface User {
    isAdministrator(): boolean;
    notify(): void;
    doNotDisturb?(): boolean;
}

function issueNotification(user: User) {
    if (user.doNotDisturb) {
        // OK，属性是可选的
    }
    if (user.notify) {
        // OK，调用了这个方法
        user.notify();
    }
}
```

以及其它...这里只列举了几项主要的.


