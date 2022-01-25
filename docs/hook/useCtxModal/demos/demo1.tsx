import React from 'react';
import { useCtxModal, useCtxModalContext } from '@tms/site-hook';
import { Button, Layout } from 'antd';

const { Header, Footer, Content } = Layout;
function Demo({ name }: { name: string }) {
  const { data, bridge, hide } = useCtxModalContext<{ hobby: string }>();
  bridge.useHook(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('123123');
      }, 3000);
    });
  });
  return (
    <Layout>
      <Header>
        这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题
      </Header>
      <Content>
        <p>
          {name}爱好 : {data.hobby}
        </p>
      </Content>
      <Footer>
        <Button onClick={hide}>关闭</Button>
      </Footer>
    </Layout>
  );
}
const Demo1 = () => {
  const [loading, setLoading] = React.useState(false);
  const { show, hide, RenderModal, bridge } = useCtxModal<{ hobby: string }>({
    title: '标题',
    okText: '关上~',
    cancelText: '取消',
    async onOk() {
      try {
        setLoading(true);
        console.log('您点击了确定', await bridge.getSave());
        hide();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    onCancel() {
      console.log('您点击了取消');
      hide();
    },
    okButtonProps: {
      loading
    }
  });
  return (
    <div>
      <Button onClick={() => show({ hobby: '汽车' })}>打开弹窗</Button>
      <RenderModal>
        <Demo name="波哥" />
      </RenderModal>
    </div>
  );
};

export default Demo1;
