import React, { useMemo, useState, useCallback } from 'react';
import { Button, Form } from 'antd';
import { FormRender, IFormSchema, useFormRender } from '@tms/site-component';

export default () => {
  // const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const FormRender1 = useFormRender({});
  const schema: IFormSchema = useMemo(() => {
    return {
      column: 1,
      gutter: 50,
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      meta: [
        {
          type: 'Input',
          name: 'text',
          label: '文本',
          required: true,
          initialValue: '123'
        },
        {
          type: 'CheckboxGroup',
          name: 'genderRadio',
          label: '单选',
          enumLabels: ['男', '女'],
          // @ts-ignore
          enumValues: [1, 2],
          widgetProps: {
            mode: 'multiple'
          }
        },
        {
          type: 'Button',
          wrapperCol: { offset: 6, span: 12 },
          buttonMeta: [
            {
              type: 'primary',
              btnType: 'reset',
              children: '重置'
            },
            {
              type: 'primary',
              children: '提交',
              btnType: 'submit',
              loading,
              style: {
                margin: '0 12px'
              },
              onClick: async ({ form }) => {
                console.log('form', form);
                setLoading(true);
                try {
                  console.log('values:', form.getFieldsValue());
                  setTimeout(() => {
                    setLoading(false);
                  }, 2000);
                } catch (error) {
                  console.log(error);
                  // setLoading(false);
                }
              }
            },
            {
              children: '点击获取参数',
              onClick({ form }) {
                console.log('点击', form.getFieldsValue());
              }
            }
          ]
        }
      ]
    };
  }, [loading]);
  console.log('外层', schema);
  return (
    <>
      <FormRender1 schema={schema} />
    </>
  );
};
