/* eslint-disable react/prop-types */
import React from 'react';
import { Form, DatePicker, Button, Input, Select, Row, Col } from 'antd';
import { WrappedFormUtils } from 'antd/es/form/Form';

const { RangePicker } = DatePicker;
const { Option } = Select;
interface ITestDemo {
  form: WrappedFormUtils;
}
const TestDemo: React.FC<ITestDemo> = ({ form }) => {
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };
  const config = {
    rules: [{ required: true, message: '此项必填' }]
  };
  const rangeConfig = {
    rules: [{ required: true, message: '请选择时间!' }]
  };
  const InputChange = (e) => {
    console.log('变化', e);
  };
  const dateTimeChange = (val) => {
    console.log('变化', val);
  };
  const onReset = () => {
    console.log('重置');
    form.resetFields();
  };
  const onSearch = () => {
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }
      console.log('搜索', values);
    });
  };
  return (
    <Form {...formItemLayout}>
      <Row>
        <Col span={12}>
          <Form.Item label="文本">{getFieldDecorator('text', config)(<Input onChange={InputChange} />)}</Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="单选日期">
            {getFieldDecorator('date-time', config)(<DatePicker onChange={dateTimeChange} />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="日期范围">{getFieldDecorator('date-range', rangeConfig)(<RangePicker />)}</Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="多选">
            {getFieldDecorator('multiNum', {
              initialValue: ['china']
            })(
              <Select mode="multiple" style={{ width: '100%' }} placeholder="select one country">
                <Option value="china">China (中国)</Option>
                <Option value="usa">USA (美国)</Option>
                <Option value="japan">Japan (日本)</Option>
                <Option value="korea">Korea (韩国)</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12} />
        <Col span={12}>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 }
            }}
          >
            <Button style={{ marginRight: 10 }} onClick={onReset}>
              重置
            </Button>
            <Button type="primary" onClick={onSearch}>
              搜索
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
const WrappedTestDemoForm = Form.create({ name: 'test-controller' })(TestDemo);
export default WrappedTestDemoForm;
