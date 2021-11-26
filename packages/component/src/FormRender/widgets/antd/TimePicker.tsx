/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import moment from 'moment';
import { TimePicker } from 'antd';
import { usePersistFn } from '@tms/site-hook';
import { getFormat } from '../../utils';

const Component = ({ onChange, format, value, style, element, ...rest }, ref) => {
  const timeFormat = getFormat(format);
  const timeValue = value ? moment(value, timeFormat) : undefined;

  const timeParams = {
    value: timeValue,
    style: { width: '100%', ...style },
    onChange,
    ...rest
  };

  return <TimePicker ref={ref} {...timeParams} />;
};

export default React.forwardRef(Component);
