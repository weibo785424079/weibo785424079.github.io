import React from 'react';
import { FormBuilder, FormEditor } from '@tms/site-component';
import { Form, Input, Button } from 'antd/es/index';
import { FormComponentProps } from 'antd/es/form';

export default Form.create<FormComponentProps>()(({ form }: FormComponentProps) => (
  <Form layout="horizontal">
    <FormBuilder
      formItemLayout={{
        wrapperCol: {
          span: 20
        },
        labelCol: {
          span: 2
        }
      }}
      meta={[
        {
          key: 'name',
          label: '用戶名',
          widget: Input
        },
        {
          key: 'pass',
          label: '密码',
          widget: Input
        },
        {
          key: 'richText',
          label: '富文本',
          initialValue: '波哥',
          widget: FormEditor
        }
      ]}
      form={form}
    />
    <Button type="primary" onClick={() => alert(JSON.stringify(form.getFieldsValue()))}>
      提交
    </Button>
  </Form>
));
