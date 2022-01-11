import React from 'react';
import { useCtxModal, useCtxModalContext, useImmutable } from '@tms/site-hook';
import { Button, Layout } from 'antd';

const { Header, Footer, Content } = Layout;

function Inner({ id }: { id: string }) {
  const { data, bridge, hide } = useCtxModalContext<{ hobby: string }>();
  bridge.useHook(() => {
    return new Promise((resolkve) => {
      setTimeout(() => {
        resolkve('123123');
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
          {id}爱好 : {data.hobby}
        </p>
      </Content>
      <Footer>
        <Button onClick={hide}>关闭</Button>
      </Footer>
    </Layout>
  );
}
const useProfile = ({ onSuccess }: { onSuccess: () => void }) => {
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
        onSuccess();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    onCancel() {
      hide();
    },
    okButtonProps: {
      loading
    }
  });
  return {
    show,
    RenderProfile: useImmutable(({ id }: { id: string }) => (
      <RenderModal>
        <Inner id={id} />
      </RenderModal>
    ))
  };
};
const Demo2 = () => {
  const { show, RenderProfile } = useProfile({
    onSuccess: () => console.log('刷新页面')
  });
  return (
    <>
      <Button onClick={() => show({ hobby: '汽车' })}>打开弹窗</Button>
      <RenderProfile id="id" />
    </>
  );
};

export default Demo2;
