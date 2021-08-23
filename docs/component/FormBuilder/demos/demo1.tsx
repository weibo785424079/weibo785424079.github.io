import React from 'react';
import { FormBuilder } from '@tms/site-component';
import { Form, Input, Button } from 'antd/es/index';
import 'antd/lib/input/style';
import 'antd/lib/form/style';

export default Form.create()(({ form }) => (
  <Form layout="inline">
    <FormBuilder
      formItemLayout={{
        wrapperCol: {
          span: 16
        },
        labelCol: {
          span: 8
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
        }
      ]}
      form={form}
    />
    <Button onClick={() => console.log((form as any).getFieldsValue())}>提交</Button>
  </Form>
));
