---
title: Buttons
group:
  title: 组件
  path: /component
  order: 1
---

# Buttons

<code src="./demos/demo1.tsx"/>

### Props

| 参数 | 说明| 必须 | 类型 |
|--|--|--| -- |
| meta | 渲染按钮列表数据 | 必须 | `Array<IButtonsItem>` |
| style | 样式 | 可选 | `React.CSSProperties` |
| className | 类名 | 可选 | `string` |
| metaItem | 渲染按钮列表公共参数 | 可选 | `Record<string, any>` |


### IButtonsItem

| 参数 | 说明| 必须 | 类型 | 默认值 |
|--|--|--| -- | -- |
| text | 按钮名称 | 必须 | `string` | `无` |
| onClick | 点击执行函数 | 可选 | `function` | `无` |
| render | 自定义渲染 | 可选 | `function` | `无` |
| visible | 是否可见 | 可选 | `boolean` | `true` |
| onVisible | 是否可见 | 可选 | `boolean` | `无` |
| disabled | 是否禁用 | 可选 | `boolean` | `false` |
| style | 样式 | 可选 | `React.CSSProperties` | `{}` |
| ... | 其他属性 |  | `参考Button属性` |  |

