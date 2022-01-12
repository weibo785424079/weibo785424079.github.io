import React from 'react';
import { FormRender, IFormSchema } from '@tms/site-component';

export default () => {
  const formRef = React.useRef();
  console.log('渲染');
  const schema: IFormSchema = {
    onFinish(obj) {
      console.log('完成', obj.values);
    },
    column: 2,
    debug: false,
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    marginBottom: 10,
    meta: [
      {
        type: 'Input',
        name: 'text',
        label: '文本',
        // required: true,
        widgetProps: {
          style: {
            display: 'inline-block',
            width: 150
          }
        },
        initialValue: '123',
        onChange: (val) => {
          console.log('值变化', val);
        },
        // renderReadonly: () => {
        //   // return '123';
        //   // return undefined;
        // },
        afterNode: <span> 后部分</span>
      },
      {
        type: 'DatePicker',
        name: 'dateTime',
        format: 'dateTime',
        label: '单选日期',
        onChange: (val) => {
          console.log('值变化', val);
        }
      },
      {
        type: 'DateRangePicker',
        name: 'date-range',
        label: '日期范围'
      },
      {
        type: 'MultiSelect',
        name: 'multiNum',
        label: '多选',
        initialValue: ['china'],
        widgetProps: {
          placeholder: 'select one country'
        },
        enumLabels: ['China (中国)', 'USA (美国)', 'Japan (日本)', 'Korea (韩国)'],
        enumValues: ['china', 'usa', 'japan', 'korea']
      },
      {},
      {
        type: 'Button',
        label: ' ',
        formItemProps: {
          colon: false
        },
        buttonMeta: [
          {
            btnType: 'reset',
            children: '重置'
          },
          {
            type: 'primary',
            children: '搜索',
            btnType: 'submit',
            style: {
              margin: '0 12px'
            }
          }
        ]
      }
    ]
  };
  return <FormRender wrappedComponentRef={formRef} schema={schema} />;
};
