/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Switch } from 'antd';
import 'antd/es/switch/style/index';

const Component = ({ onChange, value, element, widgetChildProps, ...rest }, ref) => {
  return <Switch ref={ref} checked={value} onChange={onChange} {...rest} />;
};

export default React.forwardRef(Component);
