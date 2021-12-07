/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Button } from 'antd';
import { ValidationRule, WrappedFormUtils } from 'antd/es/form/Form';
import { usePersistFn } from '@tms/site-hook';
import widgets from './widgets';
import { pickProps, FormItemPropsPickArray, isFunction, hasOwnProperty, defaultGetValueFromEvent } from './helper';
import { IFormSchemaMetaItem, IFormSchema, IFormSourceItem, ISchemaEventObj } from './types';

import 'antd/es/button/style/index';

const rulesRequired = (rules, element) => {
  if (!Array.isArray(rules) || rules.length <= 0) {
    if (element.required) {
      return {
        rules: [{ required: true, message: `${element.label}不可为空` }]
      };
    }
    return { rules: [] };
  }
  return {
    rules: rules.map((item) => {
      if (!item.hasOwnproperty('required') && element.required) {
        return { ...item, message: `${element.label}不可为空` };
      }
      return item;
    })
  };
};

const pickSource = (element: IFormSchemaMetaItem): IFormSourceItem[] => {
  const { enumLabels, enumValues } = element;
  const options = (enumValues || []).map((item, idx) => {
    const label = enumLabels && Array.isArray(enumLabels) ? enumLabels[idx] : item;
    const val = item;
    return { label, value: val };
  });
  return [...options, ...(element.source || [])];
};

export interface IRenderElementProps {
  form: WrappedFormUtils;
  element: IFormSchemaMetaItem;
  schema: IFormSchema;
  onSearch?: (obj: ISchemaEventObj) => any;
  onFinish?: (obj: ISchemaEventObj) => any;
}
const renderElement = ({ form, element, schema, onFinish, onSearch }: IRenderElementProps): any => {
  const { getFieldDecorator } = form;
  const pickRules: { rules: ValidationRule[] } = rulesRequired(element.rules, element);
  const formItemProps = {
    ...(schema.formItemProps || {}),
    ...(element.formItemProps || {}),
    style: {
      ...(hasOwnProperty(schema, 'marginBottom') ? { marginBottom: schema.marginBottom } : {}),
      ...((schema.formItemProps || {}).style || {}),
      ...(element.style || {}),
      ...((element.formItemProps || {}).style || {})
    },
    ...pickProps(element, FormItemPropsPickArray)
  };
  // 优先使用本地传递的组件进行覆盖, 没有再查找系统自带功能
  let Comp: any;
  // element 有组件
  if (element.widget) {
    Comp = element.widget;
  } else {
    Comp = (schema.widgets || {})[element.type as string] || widgets[element.type as string];
  }

  const handleChange = usePersistFn((val) => {
    if (isFunction(element.onChange) && element.onChange) {
      let valuePropName = 'value';
      if (element.valuePropName && typeof element.valuePropName === 'string') {
        valuePropName = element.valuePropName;
      }
      const newVal = defaultGetValueFromEvent(valuePropName, val);
      element.onChange(newVal, {
        e: val,
        form,
        formItemProps,
        element,
        Form
      });
    }
  });
  const renderFunction = usePersistFn(() => {
    if (element.render && isFunction(element.render)) {
      element.render.call(element, {
        form,
        formItemProps,
        element,
        Form
      });
      return;
    }
    console.warn('请传入render函数');
  });
  const renderJsx = usePersistFn(() => {
    if (!Comp) {
      // console.warn('组件未渲染成功', element);
      return <></>;
    }
    let compProps: any = {
      element,
      onChange: handleChange,
      // source: ,
      // format: element.format,
      // widgetChildProps: element.widgetChildProps,
      // disabled: schema.disabled || element.disabled,
      // readonly: schema.readonly || element.readonly,
      ...(element.widgetProps || {})
    };
    const source = pickSource(element);
    if (source.length > 0) {
      compProps.source = source;
    }
    if (hasOwnProperty(element, 'format')) {
      compProps.format = element.format;
    }
    if (hasOwnProperty(element, 'widgetChildProps')) {
      compProps.widgetChildProps = element.widgetChildProps;
    }
    if (hasOwnProperty(schema, 'disabled') || hasOwnProperty(element, 'disabled')) {
      compProps.disabled = schema.disabled || element.disabled;
    }
    // if (hasOwnProperty(schema, 'readonly') || hasOwnProperty(element, 'readonly')) {
    //   compProps.readonly = schema.readonly || element.readonly;
    // }
    // 渲染组件前处理widgetProps
    if (isFunction(element.onWidgetProps) && element.onWidgetProps) {
      const result = element.onWidgetProps(compProps, { form, element, schema });
      if (result) {
        compProps = result;
      }
    }
    const elementName = element.name || '';
    if (!elementName) {
      console.log(`name字段未传`, element);
    }

    return (
      <Form.Item {...formItemProps}>
        {getFieldDecorator(elementName, {
          initialValue: hasOwnProperty(element, 'initialValue') ? element.initialValue : undefined,
          rules: pickRules.rules
        })(<Comp {...compProps}>{element.children}</Comp>)}
      </Form.Item>
    );
  });
  if (typeof element.onVisible === 'function') {
    if (
      element.onVisible({
        form,
        formItemProps,
        element,
        Form
      })
    ) {
      return renderJsx();
    }
    return <></>;
  }
  if (typeof element.render === 'function') {
    return renderFunction();
  }
  // 渲染按钮
  if (element.type === 'Button') {
    return (
      <Form.Item {...formItemProps}>
        <span {...(element.widgetProps || {})}>
          {(element.buttonMeta || []).map((item, index: number) => {
            const { children, btnType, render, onClick, ...rest } = item;
            if (typeof render === 'function') {
              return render.call(item, {
                form,
                buttonItem: item,
                element
              });
            }
            return (
              <React.Fragment key={index}>
                <Button
                  onClick={async (e) => {
                    e.preventDefault();
                    const obj = { form, buttonItem: item, element, values: {} };
                    if (btnType === 'reset') {
                      form.resetFields();
                      if (schema.onReset && isFunction(schema.onReset)) {
                        schema.onReset(obj);
                      }
                      return;
                    }
                    if (btnType === 'search') {
                      const values = form.getFieldsValue();
                      if (onSearch) {
                        onSearch({ ...obj, values });
                        return;
                      }
                      if (schema.onSearch) {
                        schema.onSearch({ ...obj, values });
                      }
                      return;
                    }
                    if (btnType === 'submit') {
                      try {
                        const values = await form.validateFieldsAndScroll();
                        if (onFinish) {
                          onFinish({ ...obj, values });
                          return;
                        }
                        if (schema.onFinish) {
                          schema.onFinish({ ...obj, values });
                          return;
                        }
                        if (onClick) {
                          onClick(obj);
                        }
                      } catch (error) {
                        console.log(error);
                      }
                      return;
                    }
                    if (onClick) {
                      onClick(obj);
                    }
                  }}
                  {...rest}
                >
                  {children}
                </Button>
              </React.Fragment>
            );
          })}
        </span>
      </Form.Item>
    );
  }
  return renderJsx();
};

export default renderElement;
