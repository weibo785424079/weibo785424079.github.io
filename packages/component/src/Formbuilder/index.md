---
title: FormBuilder
group:
  title: 组件
  path: /component
  order: 1
---

# FormBuilder

<code src="./demos/demo1.tsx"/>

### Props

| 参数 | 说明| 必须 | 类型 | 默认值 |
|--|--|--| -- | --|
| form | 表单对象 | 必须 | `form` | `无` |
| meta | 列表数据 | 必须 | `Array<Element>` | `无` |
| formItemLayout | 而外类名 | 可选 | `object` | `{ labelCol: { span: 4 }, wrapperCol: { span: 16 },}` |
| disabled | 全局禁用 | 可选 | `boolean` | `false` |
| columns | 一行多少列 | 可选 | `number` | `1` |
| gutter | 列间隙 | 可选 | `number` | `0` |
| colon | 是否显示(:) | 可选 | `boolean` | `true` |

#### Element

| 参数 | 说明| 必须 | 类型 | 默认值 |
|--|--|--| -- | -- |
| key | 字段值 | 必须 | `string` | `无` |
| widget | 表单组件 | 必须 | `React.ComponentType` | `无` |
| label | 组件lable | 可选 | `string` | `无` |
| tooltip | 提示 | 可选 | `boolean` | `false` |
| formItemProps | FormItem.props | 可选 | `object` | `{}` |
| fieldProps | 包裹组件props | 可选 | `object` | `{}` |
| widgetProps | 渲染组件props | 可选 | `object` | `{}` |
| placeholder | 占位 | 可选 | `string` | `无` |
| disabled | 是否禁用 | 可选 | `boolean` | `false` |
| required | 是否必须 | 可选 | `boolean` | `false` |
| rules | 校验规则 | 可选 | `同antd` | `无` |
| render | 自定义渲染 | 可选 | `function` | `无` |
| children | widget的子节点 | 可选 | `React.child` | `null` |