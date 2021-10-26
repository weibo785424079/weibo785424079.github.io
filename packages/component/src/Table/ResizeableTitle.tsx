import React from 'react';
import { Resizable } from 'react-resizable';

const ResizeableTitle = (props: any) => {
  const { onResize, width, hide, ...restProps } = props;

  if (!width || hide) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize} draggableOpts={{ enableUserSelectHack: false }}>
      <th {...restProps} />
    </Resizable>
  );
};

export default ResizeableTitle;