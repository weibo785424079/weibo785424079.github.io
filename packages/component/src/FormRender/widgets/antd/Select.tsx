/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
import React from 'react';
import { Select } from 'antd';

// import { usePersistFn } from '@tms/site-hook';

import 'antd/es/select/style/index';

const { Option } = Select;

const Component = ({ onChange, value, element, widgetChildProps, style, source, ...rest }, ref) => {
  const selectParams = {
    style: { width: '100%', ...style },
    ...rest
  };
  const childParams = {
    ...widgetChildProps
  };
  return (
    <Select ref={ref} value={value} onChange={onChange} {...selectParams}>
      {(source || []).map((item, index) => {
        const key = item.value || index;
        let label = item[element?.sourceLabelMap || 'label'];
        const isHtml = typeof label === 'string' && label[0] === '<';
        if (isHtml) {
          label = <span dangerouslySetInnerHTML={{ __html: label }} />;
        }
        return (
          <Option key={key} value={item[element?.sourceValueMap || 'value']} {...childParams}>
            {label}
          </Option>
        );
      })}
    </Select>
  );
};

const ComponentSelect = React.forwardRef(Component);

export const MultiSelect = React.forwardRef((props, ref) => <ComponentSelect ref={ref} {...props} mode="multiple" />);

export default ComponentSelect;
