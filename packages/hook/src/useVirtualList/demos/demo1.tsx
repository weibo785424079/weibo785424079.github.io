import React from 'react';
import { useVirtualList } from '@tms/site-hook';

const Item = ({ text, index } : {text: string, index: number}) => (
  <div
    style={{ height: 50, background: index % 2 === 0 ? '#ccc' : 'transparent' }}
  >
    {text}
  </div>
);

const data = Array.from({ length: 100 }, (_, index) => index);

export default () => {
  const {
    list,
    containerProps,
    wrapperProps,
  } = useVirtualList(data, { itemHeight: 50 });

  return (
    <div {...containerProps} style={{ height: '300px', overflow: 'auto' }}>
      <div {...wrapperProps}>
        {
              list.map((i) => <Item key={i.index} index={i.index} text={String(i.data)} />)
          }
      </div>
    </div>
  );
};
