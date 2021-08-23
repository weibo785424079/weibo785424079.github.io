/* eslint-disable react/require-default-props */
import React, { useRef, useImperativeHandle, ReactElement } from 'react';
import { Upload, Button } from 'antd';
import { UploadProps } from 'antd/es/upload';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { defaultDownload, fsUpload } from './helper';

export { getValueFromEvent } from './helper';

interface Props extends UploadProps {
  isDownload?: boolean;
  uploadBtn?: ReactElement;
}

const FormUpload = React.forwardRef((props: Props, ref) => {
  const {
    accept = '*',
    fileList = [],
    onPreview,
    onChange,
    uploadBtn = <Button>上传附件</Button>,
    isDownload = true, // 点击文件是下载还是预览，默认下载
    ...rest
  } = props;

  const currList = useRef(fileList);
  currList.current = fileList;

  useImperativeHandle(ref, () => ({}));

  return (
    <Upload
      {...rest}
      accept={accept}
      withCredentials
      fileList={fileList}
      customRequest={async ({ file }) => {
        try {
          // @ts-ignore
          const { uid } = file;
          const { data } = await fsUpload(file, ({ loaded, total, status }) => {
            if (status === 1) {
              const item = {
                uid,
                status: 'uploading' as const,
                name: file.name,
                url: '',
                percent: (loaded / total) * 100,
                size: 0,
                type: '',
                file
              };
              const index = currList.current.findIndex((one) => one.uid === uid);
              if (index > -1) {
                currList.current.splice(index, 1, item);
              } else {
                currList.current.push(item);
              }
              onChange({ fileList: [...currList.current] } as UploadChangeParam<UploadFile<any>>);
            }
          });
          const list = data.map((item) => {
            // 只会有一项数据
            return {
              name: item.originFileName,
              status: 'done',
              uid,
              url: item.fileUrl,
              fileId: item.fileId,
              fileName: item.originFileName,
              fsId: item.fileId,
              fileSuffix: item.fileSuffix,
              fileSize: item.fileSize,
              filePath: item.filePath
            };
          });
          const index = currList.current.findIndex((item) => item.uid === uid);
          if (index > -1) {
            currList.current.splice(index, 1);
          }
          onChange({ fileList: [...currList.current, ...list] } as UploadChangeParam<UploadFile<any>>);
        } catch (error) {
          console.log(error);
        }
      }}
      onRemove={({ uid }) => {
        onChange({ fileList: fileList.filter((file) => file.uid !== uid) } as UploadChangeParam<UploadFile<any>>);
      }}
      onPreview={(file) => {
        if (isDownload) {
          defaultDownload(file as any);
        } else {
          onPreview?.(file);
        }
      }}
      onDownload={defaultDownload as any}
    >
      {uploadBtn}
    </Upload>
  );
});

export default FormUpload;
