---
title: TabsList
group:
  title: 组件
  path: /component
  order: 1
---

# TabsList

<code src="./demos/demo1.tsx"/>

### Props

| 参数 | 说明| 必须 | 类型 |
|--|--|--| -- |
| meta | 渲染按钮列表数据 | 必须 | `Array<ITabsListItemProps>` |
| ... | 其他属性 |  | `参考TabsProps属性` |  |


### ITabsListItemProps

| 参数 | 说明| 必须 | 类型 | 默认值 |
|--|--|--| -- | -- |
| render | 自定义渲染 | 可选 | `function` | `无` |
| children | 组件 | 可选 | `React.ReactNode` | `无` |
| visible | 是否可见 | 可选 | `boolean` | `true` |
| onVisible | 是否可见 | 可选 | `boolean` | `无` |
| ... | 其他属性 |  | `参考TabPaneProps属性` |  |