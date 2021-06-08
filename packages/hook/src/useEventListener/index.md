---
title: useEventListener
group:
  title: 组件
  path: /
  order: 1
---

# useEventListener

```tsx

import React, { useState, useRef } from 'react'
import { useEventListener } from '@tms/site-hook'
import Button from 'antd/es/button'

export default () => {
    const ref = useRef()
    useEventListener('click',() => {
        console.log('触发绑定事件')
    }, 
    {
        target: ref
    })

    return <div>
        <Button ref={ref}>触发事件</Button>
    </div>
}

```

## API

```typescript
   useEventListener('click',() => {
        alert('触发绑定事件')
    }, 
    {
        target: ref
})
```