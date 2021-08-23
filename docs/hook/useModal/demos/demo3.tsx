import React from 'react';
import { useImmutable, useModal } from '@tms/site-hook';
import { Button } from 'antd';
import 'antd/lib/style/css';

function Demo({ hobby }: { hobby: string }) {
  return <p>爱好: {hobby}</p>;
}

const useXXX = () => {
  const { RenderModal, hide, ...rest } = useModal<{ hobby: string }>({
    title: '标题',
    okText: '关上~',
    cancelText: '取消',
    onOk() {
      console.log('您点击了确定');
      hide();
    },
    onCancel() {
      console.log('您点击了取消');
      hide();
    }
  });
  const Render = useImmutable(() => {
    return <RenderModal>{(props: { hobby: string }) => <Demo {...props} />}</RenderModal>;
  });
  return {
    ...rest,
    Render
  };
};

const Demo3 = () => {
  const { show, Render } = useXXX();
  return (
    <>
      <Button onClick={() => show({ hobby: '篮球' })}>打开弹窗</Button>
      <Render />
    </>
  );
};

export default Demo3;
