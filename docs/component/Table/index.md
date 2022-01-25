---
title: Table
group:
  title: 组件
  path: /component
  order: 1
---

# Table <Badge>0.1.0+</Badge>

<code src="./demos/demo1.tsx"/>

<code src="./demos/demo2.tsx"/>

#### 前端存储表格列拉伸宽度，排序，冻结，显示、隐藏

# CacheTable

## Params

| 参数名称| 类型 | 作用 | 必须 | 默认值 |
|--|--|--|--|--|
|accountId|`string`|数据库id|否|-|
|db|`boolean`|是否启用indexedDB存储|否|`false`|
|id| `string` | 存储表格id | 是 | - |
|minWidth| `number` | 限制单列最小宽度 | 否 | - |

# Table 

## Params

| 参数名称| 类型 | 作用 | 必须 | 默认值 |
|--|--|--|--|--|
| 与Antd Table参数一致 | - | - | - | - |

# SortTableTrigger
## Params

| 参数名称| 类型 | 作用 | 必须 | 默认值 |
|--|--|--|--|--|
|children| `ReactElement` | 触发排序弹窗节点 | 是 | - |

* 默认使用lcoalStorage存储、传入db使用indexedDB存储数据
* 以下两种情况不参与列排序
  * fixed: right
  * key: operations