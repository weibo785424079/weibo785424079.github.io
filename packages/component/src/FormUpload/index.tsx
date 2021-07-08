import React, { useState, forwardRef } from 'react';
import { Upload, Button } from 'antd';
import { UploadProps, UploadChangeParam } from 'antd/es/upload/interface';

interface FormUploadProps extends UploadProps {
  appId?: string;
  getProcessor: (name: string) => string;
  [key: string]: any
}

interface FileObj {
  name: string;
  status: string;
  uid: string;
  url: string;
  fileId: string;
  fileName: string;
  fsId: string;
  fileSuffix: string;
  fileSize: string;
  filePath: string;
}

export const FormUpload = forwardRef((props: FormUploadProps, _ref) => { // eslint-disable-line
  const {
    appId,
    accept = '*',
    action = '/file/defaultUpload',
    text = '上传附件',
    fileList = [],
    beforeUpload,
    getProcessor,
    ...rest
  } = props;
  const [processor, setProcessor] = useState('');

  const options = {
    accept,
    action,
  };

  return (
    <Upload
      {...rest}
      {...options}
      fileList={fileList}
      data={{
        appId,
        processor,
      }}
      beforeUpload={(file, list) => {
        setProcessor(getProcessor(file.name));
        return typeof beforeUpload === 'function' ? beforeUpload(file, list) : true;
      }}
    >
      <Button>
        {text}
      </Button>
    </Upload>
  );
});

FormUpload.defaultProps = {
  appId: 'site',
};

export const getValueFromEvent = (e: UploadChangeParam) => {
  const list: Array<FileObj> = [];
  if (Array.isArray(e.fileList)) {
    e.fileList.forEach((item: any) => {
      if (item.response && item.response.success) {
        list.push({
          name: item.name,
          status: item.status || 'done',
          uid: item.uid,
          url: item.response.data.fileUrl,
          fileId: item.response.data.fileId,
          fileName: item.name,
          fsId: item.response.data.id || item.fileId,
          fileSuffix: item.response.data.fileSuffix,
          fileSize: item.response.data.fileSize,
          filePath: item.response.data.filePath,
        });
      } else {
        list.push(item);
      }
    });
  }
  return list;
};
