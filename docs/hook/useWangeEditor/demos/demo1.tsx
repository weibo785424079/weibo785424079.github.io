import React from 'react';
import { useEditor } from '@tms/site-hook';
import { Button } from 'antd';

const Demo = () => {
  const [Editor, { getValue, setValue }] = useEditor(() => {
    console.log(getValue());
  }, '初始值');

  return (
    <div>
      <h3>基于WangEditor</h3>
      <Editor />
      <Button.Group>
        <Button onClick={() => alert(getValue())}>获取当前值</Button>
        <Button onClick={() => setValue('波哥')}>设置值</Button>
      </Button.Group>
    </div>
  );
};

export default Demo;
