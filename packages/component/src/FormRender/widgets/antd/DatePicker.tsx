/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { getFormat } from '../../utils';
import DateRangePicker from './DateRangePicker';

import 'antd/es/date-picker/style/index';

const { RangePicker } = DatePicker;

const Component = ({ onChange, format, value, style, element, ...rest }, ref) => {
  const dateFormat = getFormat(format);
  let _value = value || undefined;
  if (typeof _value === 'string') {
    if (format === 'week') {
      _value = _value ? _value.substring(0, _value.length - 1) : _value;
    }
  }
  if (_value) {
    _value = moment(_value, dateFormat);
  }

  const changeFunction = (c, val) => {
    onChange(val);
  };

  const dateProps = {
    element,
    showTime: false,
    format: dateFormat,
    value: _value,
    style: { width: '100%', ...style },
    onChange: changeFunction,
    ...rest
  };
  if (format === 'dateTime') {
    dateProps.showTime = true;
  }

  // if (['week', 'month', 'year'].indexOf(format) > -1) {
  //     dateProps.picker = format;
  // }
  return <DatePicker ref={ref} {...dateProps} />;
};

export default React.forwardRef(Component);
