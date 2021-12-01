import React, { useRef } from 'react';
import { Button } from 'antd';
import { FormRender, IFormSchema } from '@tms/site-component';

export default () => {
  const formRef = useRef();
  const schema: IFormSchema = {
    column: 2,
    // layout: 'horizontal',
    // layout: 'vertical',
    // labelAlign: 'left',
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
    onReset(obj) {
      console.log(obj);
    },
    onFinish(obj) {
      console.log(obj.values);
    },
    meta: [
      {
        // @ts-ignore
        RowProps: {},
        ColProps: {
          span: 8
        },
        formItemProps: {
          labelCol: {
            span: 9
          },
          wrapperCol: {
            span: 12
          }
        },
        children: [
          {
            type: 'Input',
            name: 'userName1',
            label: '用户名1',
            required: true
          },
          {
            type: 'Input',
            name: 'userName111',
            label: '用户名1111',
            required: true
          },
          {
            type: 'Input',
            name: 'userName122',
            label: '用户名122',
            required: true
          }
        ]
      },
      {
        type: 'Input',
        name: 'userName2',
        label: '用户名2',
        required: true
      },
      {
        type: 'Input',
        name: 'userName3',
        label: '用户名3',
        required: true
      },
      {
        type: 'Input',
        name: 'userName4',
        label: '用户名4',
        required: true
      },
      {
        type: 'Button',
        label: ' ',
        formItemProps: {
          colon: false
        },
        widgetProps: {
          className: 'test-1222',
          style: {
            float: 'right',
            clear: 'both'
          }
        },
        buttonMeta: [
          {
            btnType: 'reset',
            children: '重置'
          },
          {
            type: 'primary',
            children: '提交',
            btnType: 'submit',
            style: {
              marginLeft: 10
            }
          }
        ]
      }
    ]
  };
  return (
    <>
      {/* <FormRender formRef={formRef} schema={schema} /> */}
      <FormRender
        wrappedComponentRef={formRef}
        schema={schema}
        onValuesChange={(changedValues) => {
          console.log('changedValues', changedValues);
        }}
      />
    </>
  );
};
