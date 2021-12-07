import React from 'react';
import { FormRender, IFormSchema } from '@tms/site-component';

export default () => {
  const formRef = React.useRef();
  const schema: IFormSchema = {
    onFinish(obj) {
      console.log('完成', obj.values);
    },
    column: 2,
    // gutter: 10,
    debug: false,
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    marginBottom: 10,
    disabled: true,
    meta: [
      {
        type: 'Input',
        name: 'userName',
        label: '用户名',
        required: true,
        onChange: (val) => {
          console.log('值变化', val);
        }
        // style: {
        //     marginBottom: 0,
        // },
      },
      {
        type: 'TimePicker',
        name: 'time',
        format: 'time',
        label: '时间',
        // visible: dateVisible,
        // 函数控制当前数据条是否可见
        onVisible({ form }) {
          return !!(form.getFieldValue('gender') || []).includes(1);
        },
        onChange: (val) => {
          console.log('值变化', val);
        }
      },
      {
        type: 'DatePicker',
        name: 'time2222',
        format: 'dateTime',
        label: '单选日期选择',
        onChange: (val) => {
          console.log('值变化', val);
        }
      },
      {
        type: 'DateRangePicker',
        name: 'date-range',
        label: '日期范围',
        onChange: (val) => {
          console.log('DateRangePicker 值变化', val);
        }
      },
      {
        type: 'MultiSelect',
        name: 'multiNum',
        label: '多选数字',
        enumLabels: ['壹', '贰', '弎'],
        enumValues: [1, 2, 3]
        // widgetProps: {
        //     mode: 'multiple',
        // },
      },
      {
        type: 'Radio',
        name: 'genderRadio',
        label: '单选',
        enumLabels: ['男', '女'],
        enumValues: [1, 2],
        widgetProps: {
          mode: 'multiple'
        }
      },
      {
        type: 'CheckboxGroup',
        name: 'genderCheckbox',
        label: '多选',
        enumLabels: ['男', '女'],
        enumValues: [1, 2]
      },
      {
        type: 'Checkbox',
        name: 'genderCheckboxBoolean',
        label: ' ',
        children: '选择这里',
        formItemProps: {
          colon: false
        },
        onChange: (val) => {
          console.log('Checkbox值变化', val);
        }
      },
      {
        type: 'Color',
        name: 'color',
        label: '颜色选择器',
        onChange: (val) => {
          console.log('Color值变化', val);
        }
      },
      {
        type: 'UrlInput',
        name: 'url',
        label: '输入连接',
        onChange: (val) => {
          console.log('UrlInput值变化', val);
        }
      },
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
  console.log('schema', schema);
  return (
    <>
      <FormRender wrappedComponentRef={formRef} schema={schema} />
    </>
  );
};
