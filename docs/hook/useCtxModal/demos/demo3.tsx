import React from 'react';
import { useCtxModal, useCtxModalContext, useImmutable } from '@tms/site-hook';
import { Container } from '@tms/site-component';
import { Button } from 'antd';

function Inner({ id }: { id: string }) {
  const { data, hide } = useCtxModalContext<{ hobby: string }>();

  return (
    <Container footer={<Button onClick={hide}>关闭</Button>} header={<div>标题</div>}>
      <p>
        {id}爱好 : {data.hobby}
        <p>根据id异步查询操作按钮权限</p>
      </p>
    </Container>
  );
}
const useProfile = () => {
  const { show, RenderModal } = useCtxModal<{ hobby: string }>({
    footer: null,
    title: null,
    custom: true
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
  const { show, RenderProfile } = useProfile();
  return (
    <>
      <Button onClick={() => show({ hobby: '汽车' })}>打开弹窗</Button>
      <RenderProfile id="id" />
    </>
  );
};

export default Demo2;
