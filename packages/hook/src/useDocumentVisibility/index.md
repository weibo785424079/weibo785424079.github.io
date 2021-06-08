---
title: useDocumentVisibility
group:
  title: 高频
  path: /n
  order: 1
---

# useDocumentVisibility

<code src="./demos/demo1.tsx"/>

### API

```typescript
const visible = useDocumentVisibility();
```

# useDocumentShow

<code src="./demos/demo2.tsx"/>

### API

```typescript
useDocumentShow(() => {
  console.log("页面被唤醒了!");
}, false);
```