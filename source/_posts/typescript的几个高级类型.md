---
title: typescript的几个高级类型
date: 2019-11-13 10:28:48
tags:
---

## lib库中的五个高级类型
**以下所有例子皆以person为例**

```ts
interface Person {
  name: string
  age?: number
}
```
### Partial
源码
```ts
type Partial<T> = {
  [P in keyof T]? T[P]
}
```
实例
```ts
type person2 = Partial<Person>
// person2 === {name?:string; age?:number}
```

### Required
源码
```ts
type Required<T> = {
  [P in keyof T]-?: T[P]
}
```

实例
```js
type person3 = Required<Person>
// person3 === {name: string; age: number}
```

### Readonly
源码
```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
```
实例
```ts
type person4 = Readonly<Person>
// person4 === {
//   readonly name: string
//   readonly age?: number
}
```

### Pick
源码：
```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```
实例
```ts
type person5 = Pick<Person, "name">
// person5 = {name: string}
```

### Record
源码：
```ts
type Record<K extends ketof any, T> = {
  [P in K]: T
}
```
实例
```ts
type person6 = Recoed<'name'| 'age', string>
// person6 === {name: string, age: string}
```

## 条件类型
关于条件类型,官网上说的很详细了,我就直接拿过来
```ts
type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

type T02 = Exclude<string | number | (() => void), Function>;  // string | number
type T03 = Extract<string | number | (() => void), Function>;  // () => void

type T04 = NonNullable<string | number | undefined>;  // string | number
type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]

function f1(s: string) {
    return { a: 1, b: s };
}

class C {
    x = 0;
    y = 0;
}

type T10 = ReturnType<() => string>;  // string
type T11 = ReturnType<(s: string) => void>;  // void
type T12 = ReturnType<(<T>() => T)>;  // {}
type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
type T15 = ReturnType<any>;  // any
type T16 = ReturnType<never>;  // any
type T17 = ReturnType<string>;  // Error
type T18 = ReturnType<Function>;  // Error

type T20 = InstanceType<typeof C>;  // CP
type T21 = InstanceType<any>;  // any
type T22 = InstanceType<never>;  // any
type T23 = InstanceType<string>;  // Error
type T24 = InstanceType<Function>;  // Error
```
**高级类型与条件类型就这些,如果能够掌握他们,你就能在 ts 的海洋中任意遨游了**