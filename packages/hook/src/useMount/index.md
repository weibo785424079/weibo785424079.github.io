---
title: useMount
group:
  title: 高频
  path: /n
  order: 2
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
