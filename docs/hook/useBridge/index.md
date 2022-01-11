---
title: useBridge
group:
  title: 常用-hook
  path: /hook-usually
---

# useBridge <Badge>0.2.0-alpha4.0+</Badge>

```tsx

import React, { useState, useRef } from 'react'
import { useBridge } from '@tms/site-hook'
import {Button} from 'antd'

const Child = ({useHook}) => {
    useHook(() => ('数据'))
    return <div>子组件</div>
}
export default () => {
    const bridge = useBridge();
    return <div>
        <Button onClick={async () => {
            alert(await bridge.getSave())
        }}>获取数据</Button>
        <Child useHook={bridge.useHook}/>
    </div>
}

```

*ref简单封装*

## API
```typescript
    const bridge = useBridge()
const { project, form } = useBridge(['project', 'form'] as const);
```


