import React from 'react';
import Button from 'antd/es/button';
import { useUrlState } from '@tms/site-hook';

export default () => {
  const [state, setState] = useUrlState({ name: 123 });
  console.log('render', state);
  return (
    <>
      <Button onClick={() => {
        setState({
          name: 456,
        });
      }}
      >
        设置
      </Button>
      <Button onClick={() => {
        setState({
          name: undefined,
        });
      }}
      >
        清除
      </Button>
    </>
  );
};
