import React, { useImperativeHandle, useState } from 'react';
import { Button, Spin } from 'antd';
import { usePersistFn, useRefModal } from '@tms/site-hook';

export default () => {
  const { RenderModal, show, hide } = useRefModal({});
  const clickOpen = usePersistFn(() => {
    show(
      {
        title: (
          <div>
            <span>标题</span>
          </div>
        ),
        afterClose() {
          console.log('关闭回调');
        },
        onOk() {
          console.log('点击确定');
          hide();
        }
      },
      { a: 123 }
    );
  });

  return (
    <>
      <Button type="primary" onClick={clickOpen}>
        简单弹框
      </Button>
      <RenderModal>
        <div>内容</div>
      </RenderModal>
    </>
  );
};
