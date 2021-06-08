/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useDocumentVisibility } from '@tms/site-hook';

export default () => {
  const [list, setList] = useState([]);
  const visible = useDocumentVisibility();

  useEffect(() => {
    if (list[list.length - 1] !== visible) {
      setList((l) => ([...l, visible]));
    }
  }, [visible]);

  return (
    <div style={{ maxHeight: 110, overflowY: 'auto' }}>
      {list.map((v, i) => (
        <div key={i}>
          {`页面当前状态: ${v}`}
        </div>
      ))}
    </div>
  );
};
