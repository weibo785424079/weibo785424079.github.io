import React from 'react';
import { FormProps, FormItemProps } from 'antd/es/form';
import { FormComponentProps } from 'antd/lib/form/Form';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { RowProps } from 'antd/es/row';
import { ColProps } from 'antd/es/col';
import { ButtonProps } from 'antd/es/button';
import { Gutter } from 'antd/lib/grid/row';
import { widgetsType } from './widgets';

export type TNoopObject = Record<string, any>;
export type TNoopFunction = (...args: any) => any;

export interface IFormSourceItem {
  label: any;
  value: any;
  children?: IFormSourceItem[];
}

export interface IFormItemRulesItem {
  [key: string]: any;
}

export interface IButtonMetaItem extends ButtonProps {
  btnType?: string; // 按钮类型 reset | search
  children?: React.ReactNode;
  onClick?: (...args: any[]) => any;
  render?: TNoopFunction;
}

export interface ISchemaEventObj {
  values?: any;
  form?: WrappedFormUtils;
  buttonItem?: IButtonMetaItem;
  element?: IFormSchemaMetaItem;
}

export interface IFormSchemaMetaItem extends FormItemProps {
  key?: string;
  widget?: React.ReactNode;
  type?: widgetsType | 'Button';
  rules?: string;
  initialValue?: any;
  valuePropName?: string;
  name?: string; // 显示的字段名
  enumLabels?: any[];
  enumValues?: string[]; // 枚举值需要与source进行合并进行显示,value值会进行去重
  format?: string; // 日期格式化，使用moment
  source?: IFormSourceItem[];
  sourceLabelMap?: string; // source数组label值映射
  sourceValueMap?: string; // source数组value值映射
  formItemProps?: FormItemProps; // 用在Form.Item组件上
  onWidgetProps?: TNoopFunction; // 处理组件props
  widgetProps?: TNoopObject; // 用在组件上属性
  widgetChildProps?: TNoopObject; // 用在 Option 或者 Radio 或者 Checkbox等组件上
  disabled?: boolean;
  readonly?: boolean;
  display?: string;
  required?: boolean; // 是否必传, 提示语：${title}不可为空, 为true，rules规则不显示required
  visible?: boolean;
  children?: React.ReactNode;
  meta?: IFormSchemaMetaItem[];
  RowProps?: RowProps;
  ColProps?: ColProps;
  onChange?: (
    a: any,
    obj: {
      e: any;
      form: WrappedFormUtils;
      formItemProps: FormItemProps;
      element: IFormSchemaMetaItem;
      Form:
        | {
            Item: React.ReactNode;
            [key: string]: any;
          }
        | React.ReactNode;
    }
  ) => any;
  onVisible?: (obj: {
    form: WrappedFormUtils;
    formItemProps: FormItemProps;
    element: IFormSchemaMetaItem;
    Form:
      | {
          Item: React.ReactNode;
          [key: string]: any;
        }
      | React.ReactNode;
  }) => boolean;
  render?: TNoopFunction; // 自定义函数，组件不支持的情况可使用
  buttonMeta?: IButtonMetaItem[];
}

export interface IFormSchema extends FormProps {
  formProps?: FormProps;
  marginBottom?: string | number;
  column?: number;
  gutter?: Gutter | [Gutter, Gutter]; // 表单数据间距
  formItemProps?: FormItemProps;
  RowProps?: RowProps; // column > 1
  ColProps?: ColProps; // column > 1
  widgets?: TNoopObject;
  disabled?: boolean; // 全局控制禁用状态
  readonly?: boolean;
  width?: string | number;
  debug?: boolean; // debug为true，控制台显示日志,process.env.NODE_ENV === 'development' && debug
  initialValues?: TNoopObject;
  onReset?: TNoopFunction; // 重置回调
  onMount?: TNoopFunction; // 表单初始化
  meta?: IFormSchemaMetaItem[];
  onSearch?: (obj: ISchemaEventObj) => any;
  onFinish?: (obj: ISchemaEventObj) => any;
}

export interface IFormRender extends FormComponentProps {
  schema: IFormSchema;
  form: WrappedFormUtils;
  formRef?: any;
  wrappedComponentRef?: any;
  onSearch?: (obj: ISchemaEventObj) => any;
  onFinish?: (obj: ISchemaEventObj) => any;
  onValuesChange?: (changedValues: Record<string, any>, allValues: Record<string, any>) => void;
}
