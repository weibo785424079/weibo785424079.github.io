import React from 'react';
import { useModal } from '@tms/site-hook';
import { Button } from 'antd';
import 'antd/lib/style/css';

export default () => {
  const { show, hide, RenderModal } = useModal({
    title: 'useModal',
    okText: '确定',
    cancelText: '取消',
    onOk() {
      console.log('您点击了确定');
      hide();
    },
    onCancel() {
      console.log('您点击了取消');
      hide();
    },
  });
  return (
    <div>
      <Button onClick={show}>打开弹窗</Button>
      <RenderModal>
        <p>很多东西</p>
      </RenderModal>
    </div>
  );
};
