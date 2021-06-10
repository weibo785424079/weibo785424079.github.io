---
title: useMount
group:
  title: 常用-hook
  path: /hook-usually
  order: 1
---

# useMount

```tsx
import React, { useState } from "react";
import { useMount } from "@tms/site-hook";

export default () => {
  const [mounted, setMounted] = useState(false)
  
  useMount(() => {
    setMounted(true)
  });

  return <div>component: {mounted ? 'MOUNTED' : 'NOTMOUNTED'}</div>;
};
```

## API

```typescript
useMount(() => {
  ...dosomething
});
```
