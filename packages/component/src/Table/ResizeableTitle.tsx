import React, { useLayoutEffect, useRef, useState } from 'react';
import { Resizable } from 'react-resizable';

const ResizeableTitle = (props: any) => {
  const { onResize, width, hide, ...restProps } = props;
  const ref = useRef<HTMLElement>();
  if (hide) {
    return <th {...restProps} />;
  }
  const [{ width: defaultWidth, inited }, setDefaultWidth] = useState({ inited: false, width: 0 });

  useLayoutEffect(() => {
    if (ref.current && !inited) {
      setDefaultWidth({
        inited: true,
        width: ref.current.clientWidth
      });
    }
  }, [ref.current, inited]);

  return (
    <Resizable
      width={width || defaultWidth}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th ref={ref} {...restProps} />
    </Resizable>
  );
};

export default ResizeableTitle;
