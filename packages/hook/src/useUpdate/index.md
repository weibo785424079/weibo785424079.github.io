---
title: useUpdate
group:
  title: 组件
  path: /
  order: 2
---

# useUnMount

```tsx

import React, { useEffect } from 'react'
import { useUpdate } from '@tms/site-hook'
import Button from 'antd/es/button';

export default () => {

    const update = useUpdate()
    return (
        <div>
            <Button onClick={update}>update</Button>
            <div>{Math.random()}</div>
        </div>)
}

```

## API

```typescript
  const update = useUpdate()
```