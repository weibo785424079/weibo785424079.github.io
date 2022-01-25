/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { Radio } from 'antd';

import 'antd/es/radio/style/index';

/* eslint-disable react/no-danger */
// import { usePersistFn } from '@tms/site-hook';

const Component = ({ onChange, value, element, widgetChildProps, style, source, ...rest }, ref) => {
  const radioProps = {
    style: { width: '100%', ...style },
    ...rest
  };
  const radioItemProps = {
    ...widgetChildProps
  };
  return (
    <Radio.Group ref={ref} value={value} onChange={onChange} {...radioProps}>
      {(source || []).map((item, index) => {
        let label = item[element?.sourceLabelMap] || item.label;
        const isHtml = typeof label === 'string' && label[0] === '<';
        if (isHtml) {
          label = <span dangerouslySetInnerHTML={{ __html: label }} />;
        }
        return (
          <Radio key={index} value={item[element?.sourceValueMap || 'value']} {...radioItemProps}>
            {label}
          </Radio>
        );
      })}
    </Radio.Group>
  );
};

export default React.forwardRef(Component);
