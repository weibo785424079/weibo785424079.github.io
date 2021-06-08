## site的hook组件库

### 开始使用

```bash
yarn add @tms/site-hook
```

```tsx | pure
import React,{useState} from 'react'
import { useWatch } from '@tms/site-hook'

const App = () => {
    const [count, setCount] = useState(1)
    useWatch(count, prev => {
        console.log(prev, count)
    })

    return <div onClick={() => setCount(c => c+1)}>count:{count}</div>
}

export default App;
```

[文档](https://weibo785424079.github.io/hook/)
