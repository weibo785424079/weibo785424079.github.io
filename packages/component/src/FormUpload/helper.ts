import { commonUpload, commonDownload } from '@tms/fs.js';

export const defaultDownload = (file: { fsId: string } | { fileId: string }) => {
  commonDownload({
    repositoryName: 'site/site-front',
    fileIdList: ['fsId' in file ? file.fsId : file.fileId]
  });
};

export const fsUpload = async (
  file: File | Array<File>,
  onUploadProgress: (data: { loaded: number; total: number; status: number }) => void
) => {
  return commonUpload({
    repositoryName: 'hospital/site-front-repo',
    fileList: Array.isArray(file) ? file : [file],
    token: sessionStorage.token,
    onUploadProgress
  });
};

export const getValueFromEvent = ({ fileList = [] }) =>
  fileList.map((item) => {
    if (item?.response?.success) {
      return {
        name: item.name,
        status: item.status || 'done',
        uid: item.uid,
        url: item.response.data.fileUrl,
        fileId: item.response.data.fileId,
        fileName: item.name,
        fsId: item.response.data.id || item.fileId,
        fileSuffix: item.response.data.fileSuffix,
        fileSize: item.response.data.fileSize,
        filePath: item.response.data.filePath
      };
    }
    return item;
  });
