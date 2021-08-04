import React, { ReactElement } from 'react';
import { Col, Form, Icon, Row, Tooltip } from 'antd';
import { FormComponentProps, GetFieldDecoratorOptions } from 'antd/lib/form/Form';

const FormItem = Form.Item;

const defaultFormItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
};

function pickProps<T = any>(source: T, props: string[]) {
  const target = {};
  props.forEach((prop: string) => {
    if (prop in source) target[prop] = source[prop];
  });
  return target;
}

export interface Element extends GetFieldDecoratorOptions {
  key: string;
  widget: React.ComponentType;
  label?: string;
  tooltip?: string;
  formItemProps?: { [key: string]: any };
  fieldProps?: { [key: string]: any };
  widgetProps?: { [key: string]: any };
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  rules?: GetFieldDecoratorOptions['rules'];
  render?: (opt: { formItemProps: any; element: Element; disabled: boolean }) => ReactElement;
  children?: ReactElement | null | ReactElement[];
}

interface FormBuilderProps {
  meta: Array<Element>;
  form: FormComponentProps['form'];
  formItemLayout?: typeof defaultFormItemLayout;
  disabled?: boolean;
  columns?: number;
  gutter?: number;
  colon?: boolean;
}

const FormBuilder = (props: FormBuilderProps) => {
  const {
    meta,
    form: { getFieldDecorator },
    disabled,
    columns = 1,
    gutter = 0,
    colon = true,
    formItemLayout
  } = props;

  const renderElement = (element: Element) => {
    const label = element.tooltip ? (
      <span>
        {element.label}
        <Tooltip title={element.tooltip}>
          {' '}
          <Icon type="question-circle-o" />
        </Tooltip>
      </span>
    ) : (
      element.label
    );

    const formItemProps = {
      key: element.key,
      colon,
      ...(formItemLayout || (element.label ? defaultFormItemLayout : null)),
      label,
      ...pickProps(element, ['help', 'extra', 'labelCol', 'wrapperCol', 'colon', 'hasFeedback', 'validateStatus']),
      ...element.formItemProps
    };

    if (element.render) {
      return element.render.call(element, {
        formItemProps,
        element,
        disabled: disabled || false
      });
    }

    let rules = element.rules || [];
    if (element.required) {
      rules = [
        ...rules,
        {
          required: true,
          message: `${element.label || element.key} is required`
        }
      ];
    }

    const fieldProps = {
      ...pickProps(element, [
        'getValueFromEvent',
        'initialValue',
        'normalize',
        'trigger',
        'valuePropName',
        'validateTrigger',
        'validateFirst'
      ]),
      rules,
      ...element.fieldProps
    };

    const wp = element.widgetProps || {};
    const widgetProps = {
      ...pickProps(element, ['placeholder', 'type', 'className', 'class']),
      ...wp,
      disabled: element.disabled || wp.disabled || disabled
    };
    return (
      <FormItem {...formItemProps}>
        {getFieldDecorator(
          element.key,
          fieldProps
        )(<element.widget {...widgetProps}>{element.children || null}</element.widget>)}
      </FormItem>
    );
  };

  const renderLayout = (elements) => {
    if (columns === 1) return elements;
    const rows: ReactElement[] = [];
    const colospan = 24 / columns;

    for (let i = 0; i < elements.length; i += columns) {
      const cols: ReactElement[] = [];
      for (let j = 0; j < columns; j += 1) {
        cols.push(
          <Col key={j} span={colospan}>
            {elements[i + j] as any}
          </Col>
        );
      }
      rows.push(
        <Row key={i} gutter={gutter}>
          {cols}
        </Row>
      );
    }

    return rows;
  };
  return renderLayout(meta.map(renderElement));
};

export default FormBuilder;
