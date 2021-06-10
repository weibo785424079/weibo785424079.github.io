---
title: useSize
group:
  title: hook
  path: /hook
  order: 2
---

# useSize

```tsx

import React, {useState} from 'react'
import { useSize } from '@tms/site-hook'

export default () => {

    const [{width,height}, ref] = useSize()

    return <div ref={ref}>
        <div>width: {width} </div>
        <div>height: {height} </div>
    </div>
}

```

## API

```typescript
  const [{width,height}, ref] = useSize()

const [{width,height}] = useSize(document.body)
```