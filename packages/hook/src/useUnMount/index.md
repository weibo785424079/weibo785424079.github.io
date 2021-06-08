---
title: useUnMount
group:
  title: 组件
  path: /
  order: 2
---

# useUnMount

```tsx

import React from 'react'
import { useUnMount } from '@tms/site-hook'

export default () => {

   useUnMount(() => {
     console.log('unMount')
   })

    return <div>useUnMount</div>
}

```

## API

```typescript
useUnMount(() => {
  console.log('unMount')
})
```