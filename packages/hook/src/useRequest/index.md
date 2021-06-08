---
title: useRequest
group:
  title: 高频
  path: /n
  order: 2
---

# useRequest

<code src="./demos/demo1.tsx" />

### API

```typescript
const action = useCallback(() => new Promise((resolve) => {
    setTimeout(() => {
      resolve("data");
    }, 300);
  );
}, []);
const option = { manul: false, delay: 1000, immediate: true }
const { result, loading, error } = useRequest(action, option);
```

### Params

| 参数 | 说明| 必须 | 类型 |
|--|--|--| -- |
| action | 执行函数，也是刷新的依赖，所以需要使用useCallback包裹 | 必须 | `Function` |
| option | 执行参数 | 可选 | `object` |

#### option

| 参数 | 说明| 必须 | 类型 | 默认值 |
|--|--|--| -- | -- |
| manul | 是否手动执行 | 可选 | `boolean` | `false` |
| delay | loading延时时间 | 可选 | `number` | `1000` |
| immediate | 是否在组件初次挂载时执行 | 可选 | `boolean` | `true` |
| handelResult | 返回值处理函数 | 可选 | `function` | `d => d` |


### Result

| 参数 | 说明 | 类型 |
|--|--|--|
| run | 函数执行方法  | `Function` |
| loading | 是否正在请求 | `boolean` 
| error | 执行异常  | `undefined \| Error` |
| result | 返回的结果  | `undefined \| T`|