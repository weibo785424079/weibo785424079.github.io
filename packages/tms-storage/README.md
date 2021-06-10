# 操作 localStorage 和 sessionStorage

```js
// use example:
import { set, get, remove, clear, session } from '@tms/storage';

// 1. 操作 window.localStorage
const name = 'lilei'
set('name', name);

// 1.1 从 localStorage 获取值
const name = get<string>('name');
console.log('name?.length', name?.length);

// 1.2 从 localStorage 删除值
remove('name'); 

// 1.3 清空 localStorage
clear(); 

// 操作 window.sessionStorage
session.set('name', 'lilei');
session.get('name');
session.remove('name'); 
session.clear(); 

```