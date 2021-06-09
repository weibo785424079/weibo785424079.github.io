import React from 'react';
import { FormBuilder, FormUpload, getValueFromEvent } from '@tms/site-component';
import { Form, Input, Button } from 'antd/es/index';
import { FormComponentProps } from 'antd/es/form';

export default Form.create<FormComponentProps>()(({ form }: FormComponentProps) => (
  <Form layout="inline">
    <FormBuilder
      formItemLayout={{
        wrapperCol: {
          span: 16,
        },
        labelCol: {
          span: 8,
        },
      }}
      meta={[
        {
          key: 'name',
          label: '用戶名',
          widget: Input,
        },
        {
          key: 'pass',
          label: '密码',
          widget: Input,
        },
        {
          key: 'file',
          label: '附件',
          widget: FormUpload,
          valuePropName: 'fileList',
          getValueFromEvent,
          widgetProps: {
            getProcessor(name) {
              console.log(name);
              return 'site';
            },
          },
        },
      ]}
      form={form}
    />
    <Button
      style={{ marginTop: 4 }}
      type="primary"
      onClick={() => console.log(form.getFieldsValue())}
    >
      提交
    </Button>
  </Form>
));
