/* eslint-disable react/no-array-index-key */
import React, { useRef } from 'react';
import { useScroll } from '@tms/site-hook';

const list = Array(100).fill('x');
export default () => {
  const ref = useRef<HTMLDivElement>(null);
  const position = useScroll(ref);
  return (
    <>
      <div>
        {JSON.stringify(position)}
      </div>
      <div ref={ref} style={{ height: 200, width: 400, overflow: 'scroll' }}>
        {
            list.map((x, i) => <div key={i} style={{ height: 20, width: 600 }}>{x}</div>)
        }
      </div>
    </>
  );
};
