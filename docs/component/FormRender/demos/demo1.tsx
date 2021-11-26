import React, { useRef } from 'react';
import { Button } from 'antd';
import { FormRender, IFormSchema } from '@tms/site-component';

export default () => {
  const formRef = useRef();
  const schema: IFormSchema = {
    // column: 1,
    // layout: 'horizontal',
    // layout: 'vertical',
    // labelAlign: 'left',
    // labelCol: { span: 6 },
    // wrapperCol: { span: 18 },
    onReset(obj) {
      console.log(obj);
    },
    onFinish(obj) {
      console.log(obj.values);
    },
    meta: [
      {
        type: 'Input',
        name: 'userName',
        label: '用户名',
        required: true
      },
      {
        type: 'Upload',
        name: 'fileList',
        label: '文件上传',
        required: true
      },
      {
        type: 'Editor',
        name: 'use',
        label: '显示编辑器',
        required: true
      },
      {
        type: 'Button',
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
      <Button
        onClick={() => {
          console.log(formRef);
        }}
      >
        获取表单值
      </Button>
    </>
  );
};
