---
title: useClickAway
group:
  path: /hook
---

# useClickAway

```tsx

import React, { useState, useRef } from 'react'
import { useClickAway } from '@tms/site-hook'

export default () => {
    const ref = useRef();

    useClickAway(() => {
        alert(`点击了目标之外,useClickAway: cb`)
    }, ref);

    return <div>
        <div ref={ref}>目标</div>
        <div>目标之外</div>
    </div>
}

```

## API

```typescript
    const ref = useRef()
useClickAway(() => {
    alert(`点击了目标之外,useClickAway: cb`)
},ref)
```
