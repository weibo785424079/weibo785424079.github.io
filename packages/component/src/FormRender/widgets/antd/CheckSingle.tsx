/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Checkbox } from 'antd';

const Component = ({ onChange, value, element, widgetChildProps, ...rest }, ref) => {
  const changeFunction = (e) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };
  return <Checkbox ref={ref} checked={value} onChange={changeFunction} {...rest} />;
};

export default React.forwardRef(Component);
