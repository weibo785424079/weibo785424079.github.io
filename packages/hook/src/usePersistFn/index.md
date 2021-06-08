---
title: usePersistFn
group:
  title: 组件
  path: /
  order: 2
---

# usePersistFn

```tsx
import React, { useState } from "react";
import { usePersistFn } from "@tms/site-hook";

export default () => {
  const fn = usePersistFn(() => {
    console.log('usePersitFn')
  })
  return <div>usePersistFn</div>;
};
```

## API

```typescript
const fn = usePersitFn(() => {
  console.log('usePersitFn')
})
```
