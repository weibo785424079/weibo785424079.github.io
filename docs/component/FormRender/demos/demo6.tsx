import React, { useRef } from 'react';
import { Button } from 'antd';
import { FormRender, IFormSchema } from '@tms/site-component';
import { WrappedFormUtils } from 'antd/es/form/Form';

export default () => {
  const formRef = useRef<{ form: WrappedFormUtils }>();
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
        type: 'Select',
        name: 'city',
        label: '选择城市后控制显示其他选项',
        enumLabels: ['上海', '北京'],
        enumValues: ['shanghai', 'beijing'],
        renderReadonly: 'function(obj){return 123}'
        // renderReadonly: () => {
        // return <>123</>;
        // }
      },
      {
        type: 'Select',
        name: 'course',
        label: '选择上海显示',
        enumLabels: ['语文', '数学'],
        enumValues: ['yuwen', 'shuxue'],
        onChange: 'function(obj){return console.log(this.course)}',
        // visible: "this.city=='shanghai'",
        onVisible: "function(obj){return this.city=='shanghai'}"
      },
      {
        type: 'Select',
        name: 'data',
        label: '选择北京显示',
        enumLabels: ['语文', '数学'],
        enumValues: ['yuwen', 'shuxue'],
        onChange: 'function(obj){return console.log(this.data)}',
        visible: "this.city=='beijing'"
      },
      {
        type: 'Radio',
        name: 'Radio',
        label: '选择控制 不可编辑、可编辑',
        enumLabels: ['不可编辑', '可编辑'],
        initialValue: false,
        // @ts-ignore
        enumValues: [false, true]
      },
      {
        type: 'Input',
        name: 'textInput',
        label: '文本输入',
        renderReadonly: "function(obj){return obj.form.getFieldsValue().Radio ? undefined : '默认值'}"
      }
    ]
  };
  return (
    <>
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
