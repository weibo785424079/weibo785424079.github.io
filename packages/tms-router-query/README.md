# 路由辅助工具函数

1.给定 key 值获取 loaction.href 对应 value

```js
// use example:
import { getQueryString } from '@tms/router-query';

// 假定当前 location.search=?id=2c94b28376075bfe0176076c070f00c3&taskId=1332252110695325696&operationType=APPROVE

const id = getQueryString('id')
console.log('id', id) ; // 2c94b28376075bfe0176076c070f00c3


```