/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Cascader } from 'antd';
import 'antd/es/cascader/style/index';

const Component = ({ onChange, value, element, widgetChildProps, style, source, ...rest }, ref) => {
  const checkboxProps = {
    style: { width: '100%', ...style },
    onChange,
    ...rest
  };
  return <Cascader ref={ref} value={value} options={source || []} {...checkboxProps} />;
};

export default React.forwardRef(Component);
