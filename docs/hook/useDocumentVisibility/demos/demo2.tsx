/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useDocumentShow } from '@tms/site-hook';

export default () => {
  const [list, setList] = useState([]);
  useDocumentShow(() => {
    setList((l) => [...l, '页面被唤醒了']);
  }, true);

  return (
    <div style={{ maxHeight: 110, overflowY: 'auto' }}>
      {list.map((v, i) => (
        <div key={i}>
          {v}
        </div>
      ))}
    </div>
  );
};
