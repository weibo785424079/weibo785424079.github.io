---
title: useModal
group:
  title: 常用-hook
  path: /hook-usually
  order: 1
---

# useModal

### 常规用法
<code src="./demos/demo1.tsx"/>


#### API

```typescript
const { show, hide, RenderModal } = useModal({
  title: 'useModal',
  okText: '确定',
  cancelText: '取消',
  onOk() {
    console.log('您点击了确定');
  },
  onCancel() {
    console.log('您点击了取消');
  },
});
```

### 快捷用法
<code src="./demos/demo2.tsx"/>

#### API

```typescript
const useProfile = createUseComponent(Profile)({
  title: 'useProfile',
  okText: '确定',
  cancelText: '取消',
});
```
