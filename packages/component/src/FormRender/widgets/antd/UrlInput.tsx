/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Input } from 'antd';
import { usePersistFn } from '@tms/site-hook';
import { isUrl } from '../../utils';

const TestNode = ({ value }) => {
  const useUrl = isUrl(value);
  if (useUrl) {
    return (
      <a target="_blank" href={value} rel="noreferrer">
        测试链接
      </a>
    );
  }
  return <div>测试链接</div>;
};

const UrlInput = ({ onChange, value, element, ...rest }, ref) => {
  return <Input ref={ref} onChange={onChange} value={value} addonAfter={<TestNode value={value} />} {...rest} />;
};

export default React.forwardRef(UrlInput);
