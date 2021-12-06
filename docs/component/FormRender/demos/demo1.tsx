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
        type: 'Input',
        name: 'userName',
        label: '用户名',
        required: true
      },
      {
        type: 'InputSearch',
        name: 'userNameSearch',
        label: '用户名搜索',
        required: true,
        widgetProps: {
          onSearch() {
            console.log('搜索', formRef.current?.form.getFieldsValue());
          }
        }
      },
      {
        type: 'Upload',
        name: 'fileList',
        label: '文件上传',
        required: true,
        // eslint-disable-next-line max-len
        initialValue: [
          {
            name: '004.docx',
            status: 'done',
            uid: 'rc-upload-1638166255221-2',
            url: 'http://file.test.com/file/getFile?fileId=2c9489627cfd7891017d6a50ebaa509b',
            fileId: '2c9489627cfd7891017d6a50ebaa509b',
            fileName: '004.docx',
            fsId: '2c9489627cfd7891017d6a50ebaa509b',
            fileSuffix: '.docx',
            fileSize: 14015,
            filePath:
              '/taimei/558f236ef19a4f559126a78c00255250/hospital/site-front-repo/2c9489627cfd7891017d6a50ebaa509b.docx'
          }
        ],
        widgetProps: {
          isDownload: false,
          onPreview: (val) => {
            console.log('预览', JSON.stringify(val));
          },
          onFilter: (val) => {
            console.log('过滤', val);
            return val;
          }
        }
      },
      {
        type: 'Editor',
        name: 'use',
        label: '显示编辑器',
        required: true,
        widgetProps: {
          onFilter: (val) => {
            console.log('过滤', val);
            return val;
          }
        }
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
