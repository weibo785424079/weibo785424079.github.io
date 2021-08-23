import React from 'react';
import { useModal } from '@tms/site-hook';
import { Button } from 'antd';
import 'antd/lib/style/css';

function Demo({ hobby }: { hobby: string }) {
  return <p>爱好: {hobby}</p>;
}
const Demo1 = () => {
  const { show, hide, RenderModal } = useModal<{ hobby: string }>({
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
  return (
    <div>
      <Button onClick={() => show({ hobby: '汽车' })}>打开弹窗</Button>
      <RenderModal>{(props: { hobby: string }) => <Demo {...props} />}</RenderModal>
    </div>
  );
};

export default Demo1;
