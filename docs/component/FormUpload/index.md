---
title: FormUpload
group:
  title: 组件
  path: /component
  order: 1
---

# FormUpload <Badge>0.0.9+</Badge>

<code src="./demos/demo1.tsx"/>

- 将上传组件封装成FormItemComponent
- 保留Upload参数，此外拓展已下字段
- 使用@tms/fs.js上传文件和下载文件
### Props

| 参数 | 说明| 必须 | 类型 | 默认值|
|--|--|--| -- | -- |
| isDownload | 点击文件行为是下载 | 否 | `boolean` | `true`|
| loadBtn | 上传按钮 | 可选 | `ReactElement` | `<Button>上传附件</Button>` |