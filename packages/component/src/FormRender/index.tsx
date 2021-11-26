/* eslint-disable guard-for-in */
/* eslint-disable react/prop-types */
import React, { forwardRef, useImperativeHandle, useEffect, ReactElement } from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
import { FormProps } from 'antd/es/form';
import { Form, Row, Col } from 'antd';
import { usePersistFn, useImmutable } from '@tms/site-hook';
import { IFormRender, TNoopObject } from './types';
import { setWidgets } from './widgets';
import { FormPropsPickArray, pickProps } from './helper';
import RenderElement from './renderElement';
import { createBaseWidget } from './widgets/createBaseWidget';

export * from './types';

const FCForm = forwardRef<FormComponentProps, IFormRender>((props, ref) => {
  const { form, formRef, onFinish, onSearch, schema } = props;
  const { column = 1, meta, gutter = 0 } = schema;
  if (!meta) {
    console.warn('未配置schema meta');
    return null;
  }
  useImperativeHandle(formRef || ref, () => ({
    form
  }));
  const formProps: FormProps = {
    ...pickProps(schema, FormPropsPickArray),
    ...(schema.formProps || {})
  };
  console.log('formProps', formProps);
  if (schema.debug) {
    console.log('schema => ', schema, '\n', ' form => ', form);
  }
  const renderRowLayout = usePersistFn((elements) => {
    if (column === 1) {
      return elements;
    }
    // eslint-disable-next-line no-param-reassign
    elements = elements.filter(Boolean); // 过滤不渲染的元素
    const rows: ReactElement[] = [];
    const colspan = 24 / column;
    for (let i = 0; i < elements.length; i += column) {
      const cols: ReactElement[] = [];
      for (let j = 0; j < column; j += 1) {
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
  return (
    <Form {...formProps}>
      {renderRowLayout(
        meta.map((element, index) => {
          const key = element.key || element.name || index;
          const ElementEl = (
            <RenderElement onFinish={onFinish} onSearch={onSearch} form={form} element={element} schema={schema} />
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
            if (element.visible) {
              return <React.Fragment key={key}>{ElementEl}</React.Fragment>;
            }
            return null;
          }

          return <React.Fragment key={key}>{ElementEl}</React.Fragment>;
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
      console.warn(`存已覆盖默认${key}组件`);
    }
    setWidgets(key, widget[key]);
  }
};

export { createBaseWidget, FormRenderSetGlobalWidgets, FormRender, useFormRender };
