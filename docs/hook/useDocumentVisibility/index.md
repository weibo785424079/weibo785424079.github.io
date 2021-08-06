---
title: useDocumentVisibility
group:
  title: 常用-hook
  path: /hook-usually
---

# useDocumentVisibility

<code src="./demos/demo1.tsx"/>

### API

```typescript
const visible = useDocumentVisibility();
```

### Res

`visible` | `hidden`


# useDocumentShow

<code src="./demos/demo2.tsx"/>

### API

```typescript
useDocumentShow(() => {
  console.log("页面被唤醒了!");
}, false);

useDocumentShow(fun, immediate);
```

### Params

| 参数 | 说明| 必须 | 类型 | 默认值 |
|--|--|--| -- | -- |
| fun | 执行函数 | 必须 | `Function` | 无 |
| immediate | 是否初始化执行 | 可选 | `boolean` | false | 