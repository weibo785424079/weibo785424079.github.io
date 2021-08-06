---
title: useUpdate
group:
  title: hook
  path: /hook
  order: 2
---

# useUpdate

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