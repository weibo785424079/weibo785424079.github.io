---
title: useVirtualList
group:
  title: 组件
  path: /
  order: 2
---

# useVirtualList


### 固定高度

<code src="./demos/demo1.tsx" />

### 动态高度

## API

```typescript
const {
    list,
    scrollTo,
    containerProps,
    wrapperProps,
  } = useVirtualList(data, option);
```

### Params

| 参数   | 说明 | 类型       | 默认值            |
| ------ | -------------------- | ---------- | ---------------------- |
| data   |  渲染的数据      | `Array`      | `无`                   |
| option     | 配置项      | `object` | `无` |

#### option

| 参数   | 说明 | 类型       | 默认值            |
| ------ | -------------------- | ---------- | ---------------------- |
| itemHeight   |  项目的高度配置项      | `number \| (index:number) => number `      | `无`                   |
| overscan     | 容量之外额外的渲染数目      | `number` | `5` |

### Result

| 参数 | 说明             | 类型       |
| ---- | ---------------- | ---------- |
| list   | 容器渲染的数据 | `Array<{ data: T,index: number }>` |
| scrollTo   | 滚动到制定位置 | `function` |
| containerProps   | 外部容器的属性 | `object` |
| wrapperProps   | 包裹容器的属性 | `object` |
