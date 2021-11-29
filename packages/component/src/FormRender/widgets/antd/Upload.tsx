/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef } from 'react';
import { usePersistFn } from '@tms/site-hook';
import FormUpload from '../../../FormUpload';

const Upload = ({ onChange, format, value, style, element, onFilter, ...rest }: any, ref) => {
  const change = usePersistFn((val) => {
    // eslint-disable-next-line no-underscore-dangle
    const _val = (val && val.fileList) || [];
    if (typeof onFilter === 'function') {
      onChange(onFilter(_val));
      return;
    }
    onChange(_val);
  });
  return <FormUpload onChange={change} fileList={value} {...rest} />;
};

export default forwardRef(Upload);
