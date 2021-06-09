---
title: FormUpload
group:
  title: 组件
  path: /component
  order: 1
---

# FormUpload

<code src="./demos/demo1.tsx"/>

- 将上传组件封装成FormItemComponent
- 保留Upload参数，此外拓展已下字段
### Props

| 参数 | 说明| 必须 | 类型 | 默认值|
|--|--|--| -- | -- |
| getProcessor | 获取上传参数 | 必须 | `function` | `无`|
| appId | 上传的参数 | 可选 | `string` | `site` |
| text | 上传button文案 | 可选 | `string` | `上传附件`|
| action | 上传地址 | 可选 | `string` | `/file/defaultUpload，修改注意设置新的getValueFromEvent` |