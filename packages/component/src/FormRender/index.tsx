/* eslint-disable no-else-return */
/* eslint-disable guard-for-in */
/* eslint-disable react/prop-types */
import React, { forwardRef, useImperativeHandle, useEffect, ReactElement } from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
import { FormProps } from 'antd/es/form';
import { Form, Row, Col } from 'antd';
import { usePersistFn, useImmutable } from '@tms/site-hook';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { IFormRender, TNoopObject } from './types';
import { setWidgets, getWidgets } from './widgets';
import { FormPropsPickArray, pickProps } from './helper';
import RenderElement from './renderElement';
import { createBaseWidget } from './widgets/createBaseWidget';
import { parseStringExpress } from './utils';

import 'antd/es/col/style/index';
import 'antd/es/row/style/index';
import 'antd/es/form/style/index';

export * from './types';

export interface IFormRenderFormRef {
  form: WrappedFormUtils;
}

const FCForm = forwardRef<FormComponentProps, IFormRender>((props, ref) => {
  const { form, formRef, onFinish, onSearch } = props;
  const schema = props.schema || {};
  const { column = 1, meta, gutter = 0 } = schema;
  if (!meta) {
    console.warn('未配置schema meta参数');
    return null;
  }
  useImperativeHandle(formRef || ref, () => ({
    form
  }));
  const formProps: FormProps = {
    ...pickProps(schema, FormPropsPickArray),
    ...(schema.formProps || {})
  };
  if (schema.debug) {
    console.log('schema => ', schema, '\n', ' form => ', form);
  }
  const renderRowLayout = usePersistFn((elements) => {
    if (column === 1) {
      return elements.map((element, i) => {
        if (element && Array.isArray(element.meta)) {
          const { ColProps, RowProps } = element;
          const cols: ReactElement[] = [];
          element.meta.forEach((item, index) => {
            cols.push(
              <Col key={(i + index) as string} {...(ColProps || {})}>
                {elementFun(item, index, element)}
              </Col>
            );
          });
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Row key={i} {...(RowProps || {})}>
              {cols}
            </Row>
          );
        }
        return element;
      });
    }
    // eslint-disable-next-line no-param-reassign
    elements = elements.filter(Boolean); // 过滤不渲染的元素
    const rows: ReactElement[] = [];
    const colspan = 24 / column;
    for (let i = 0; i < elements.length; ) {
      const cols: ReactElement[] = [];
      const element = elements[i];
      if (Array.isArray(element.meta) && element.meta) {
        const { ColProps, RowProps } = element;
        element.meta.forEach((item, index) => {
          cols.push(
            <Col key={(i + index) as string} {...(ColProps || {})}>
              {elementFun(item, index, element)}
            </Col>
          );
        });
        rows.push(
          <Row key={i} {...(RowProps || {})}>
            {cols}
          </Row>
        );
        i += 1;
      } else {
        let tempIndex = column;
        for (let j = 0; j < column; j += 1) {
          if (Array.isArray(elements[i + j]?.meta)) {
            tempIndex = j;
            break;
          }
          cols.push(
            <Col key={j} span={colspan} {...(schema.ColProps || {})}>
              {elements[i + j] as any}
            </Col>
          );
        }
        rows.push(
          <Row key={i} gutter={gutter} {...(schema.RowProps || {})}>
            {cols}
          </Row>
        );
        i += tempIndex;
      }
    }
    return rows;
  });
  // 销毁重置字段
  useEffect(() => {
    // 表单初始化回调，可设置表单字段默认值等
    if (typeof schema.onMount === 'function') {
      schema.onMount({ form });
    }
    return () => {
      form.resetFields();
    };
  }, []);

  const elementFun = (element, index, schemaObj) => {
    if (Array.isArray(element.meta)) {
      return element;
    }
    const key = element.key || element.name || index;
    const ElementEl = (
      <RenderElement onFinish={onFinish} onSearch={onSearch} form={form} element={element} schema={schemaObj} />
    );
    // 一行展示多列数据，display: 显示隐藏占空间
    if (element.display) {
      return (
        <div key={key} style={{ display: element.display }}>
          {ElementEl}
        </div>
      );
    }
    if (Object.prototype.hasOwnProperty.call(element, 'visible')) {
      if (typeof element.visible === 'string' && element.visible.indexOf('this') > -1) {
        if (parseStringExpress(element.visible, form)) {
          return <React.Fragment key={key}>{ElementEl}</React.Fragment>;
        }
      } else if (element.visible) {
        return <React.Fragment key={key}>{ElementEl}</React.Fragment>;
      }
      return null;
    }
    return <React.Fragment key={key}>{ElementEl}</React.Fragment>;
  };

  return (
    <Form {...formProps}>
      {renderRowLayout(
        meta.map((item, index) => {
          return elementFun(item, index, schema);
        })
      )}
    </Form>
  );
});

const FormRender = React.memo(
  Form.create<IFormRender>({
    name: `${new Date().getTime()}_${Math.random()}`,
    onValuesChange(props: IFormRender, changedValues, allValues) {
      if (typeof props?.onValuesChange === 'function') {
        props.onValuesChange(changedValues, allValues);
      }
    }
  })(FCForm)
);

type OmitFormRender = Omit<IFormRender, 'form'>;

const useFormRender = ({ name }: { name?: string }) =>
  useImmutable((obj: OmitFormRender) => {
    const Comp = useImmutable(
      Form.create<IFormRender>({
        name: name || `${new Date().getTime()}_${Math.random()}`,
        onValuesChange(props: IFormRender, changedValues, allValues) {
          if (typeof props?.onValuesChange === 'function') {
            props.onValuesChange(changedValues, allValues);
          }
        }
      })(FCForm)
    );
    return <Comp {...obj} />;
  });

// 设置全局组件
const FormRenderSetGlobalWidgets = (widget: TNoopObject) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in widget) {
    if (Object.prototype.hasOwnProperty.call(widget, key)) {
      console.warn(`已覆盖默认${key}组件`);
    }
    setWidgets(key, widget[key]);
  }
};

export { createBaseWidget, FormRenderSetGlobalWidgets, FormRender, useFormRender, getWidgets };
