---
title: 手写js实现
date: 2019-11-21 16:20:36
tags:
---
## 1.setTimeout模拟setInterval
```js
let index = 1
let cache = new Map()
const mySetInterval = function (fn, time = 0, ...args) {
  let i = index++
  cache.set(i, setTimeout(() => {
    fn.call(this, ...args)
    run()
  }, time))
  const run = () => {
    if (cache.get(i)) {
      cache.set(i, setTimeout(() => {
        fn.call(this, ...args)
        run()
      }, time))
    }
  }
  return i
}
const myClearInterval = function (number) {
  clearTimeout(cache[number])
  cache.delete(number)
}
const i = mySetInterval(function () {
  console.log(arguments)
}, 1000, 1, 2, 3, 4)
```
**注意:**
1. setTimeout不支持多个参数(3个以上),setInterval支持
2. setTimeout,Node平台返回的是Timeout对象，浏览器是数字，经测试最小为1

## Object.create
```js
Object.myCreate = function (proto, des) {
  if (!(proto instanceof Object || proto === null)) {
    throw new TypeError(`Object prototype may only be an Object or null: ${proto}`)
  }
  const fn = function () { }
  fn.prototype = proto
  const o = new fn()
  if (des) {
    Object.defineProperties(o, des)
  }
  return o
}
const obj = Object.myCreate({}, {
  value: {
    value: 123
  }
})
console.log(obj.value) // 123
```

### call,apply,bind
```js
Function.prototype.mycall = function (obj) {
  const args = []
  for (let i = 1; i < arguments.length; i++) {
    args.push(`arguments[${i}]`)
  }
  if (obj === undefined) {
    obj = typeof window !== 'undefined' ? window : global

  }
  if (typeof obj !== 'object') {
    obj = Object(obj)
  }
  obj.fn = this
  const result = eval(`obj.fn(${args})`)
  delete obj.fn
  return result
}

Function.prototype.myapply = function (obj, arg) {
  if (arg) {
    if (arg.length === undefined) {
      throw new TypeError('TypeError: CreateListFromArrayLike called on non-object')
    }
  }
  const args = []
  for (let i = 0; i < arg.length; i++) {
    args.push(`arg[${i}]`)
  }
  if (obj === undefined) {
    obj = typeof window !== 'undefined' ? window : global

  }
  if (typeof obj !== 'object') {
    obj = Object(obj)
  }
  obj.fn = this
  const result = eval(`obj.fn(${args})`)
  delete obj.fn
  return result
}

Function.prototype.mybind = function (context) {
  const self = this
  if (context === undefined) {
    context = window
  }
  if (typeof context !== 'object') {
    context = Object(context)
  }
  const args = [].slice.call(arguments, 1)
  const fn = function () {
    const args2 = [].slice.call(arguments)
    return self.apply(this instanceof self ? this : context, args.concat(args2))
  }
  fn.prototype = Object.create(this.prototype)
  return fn
}

```

**注意**

1. 使用了一个eval，因为处理参数还是需要...es5还是需要call，apply表示
2. bind就有一个this问题
3. 基本类型会包装成Object，貌似很多文章没有，这里也是测试出来的

### 深拷贝
```js
const clone = function (obj, set = new Set()) {
  // 考虑循环引用
  if (set.has(obj)) {
    return obj
  }
  if (typeof obj !== 'object') {
    return obj
  }
  set.add(obj)
  if (Array.isArray(obj)) {
    let res = []
    for (let i = 0; i < obj.length; i++) {
      res[i] = clone(obj[i], set)
    }
    return res
  } else if (Object.prototype.toString.call(obj) === '[object RegExp]') {
    return new RegExp(obj.source, obj.flags)
  } else {
    let res = {}
    for (let key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        res[key] = clone(obj[key], set)
      }
    }
    return res
  }
}
```
**实现的一般，也够用了**

### 继承
```js
// 方法一
function SuperClass(name) {
  this.name = name
}
function SubClass(name, age) {
  SuperClass.apply(this, arguments)
  this.age = age
}
SubClass.prototype = Object.create(SuperClass.prototype)
SubClass.prototype.constructor = SubClass
```
```js
// 方法二
function _inherits(subClass, superClass) {  // babel模拟es6
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass) Object.setPrototypeOf(subClass, superClass)
}
```

### 手写jsonp
```js
function jsonp(obj) {
  const { url, data } = obj;
  if (!url) return
  return new Promise((resolve, reject) => {
    const cbFn = `jsonp_${Date.now()}`
    data.callback = cbFn
    const head = document.querySelector('head')
    const script = document.createElement('script')
    const src = `${url}?${data2Url(data)}`
    script.src = src
    head.appendChild(script)

    window[cbFn] = function (res) {
      res ? resolve(res) : reject('error')
      head.removeChild(script)
      window[cbFn] = null
    }
  })
}

function data2Url(data) {
  return Object.keys(data).reduce((acc, cur) => {
    acc.push(`${cur}=${data[cur]}`)
    return acc
  }, []).join('&')
}
// jsonp({url:'www.xxx.com',data:{a:1,b:2}})\
```

### 转为二维数组
```js
let count = 32
let arr = []
while (count > 0) {
  arr.unshift(count--)
}
const toTwoMatrix = (arr, scale = 4) => {
  for (let i = 0; i < arr.length; i++) {
    const first = Math.floor(i / scale)
    const second = i % scale
    if (second !== 0) {
      arr[first][second] = arr[i]
    } else {
      arr[first] = [arr[i]]
    }
  }
  arr.length = Math.ceil(arr.length / 4)
  return arr
}
```