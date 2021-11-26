/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useImperativeHandle, useState } from 'react';
import { Button, Spin } from 'antd';
import { usePersistFn, useRefModal } from '@tms/site-hook';
// import useModal from '../index';

const Child = (props) => {
  console.log('子组件', props);
  const [random, setRandom] = useState(Math.random());
  useImperativeHandle(props.contextRef, () => ({
    get random() {
      return random;
    }
  }));
  const contextState = props.contextState || {};
  return (
    <Spin spinning={contextState.loading || false}>
      <div>child 组件 - {contextState.global}</div>
      <div
        onClick={() => {
          setRandom(Math.random());
        }}
      >
        {random}
      </div>
    </Spin>
  );
};

const Footer = (props) => {
  console.log('footer', props);
  const { contextState, setContextState } = props;

  return (
    <Button
      type="primary"
      loading={contextState.loading}
      onClick={() => {
        console.log('获取child组件的数据', props.contextRef);
        console.log(contextState);
        setContextState({
          loading: true
        });

        setTimeout(() => {
          setContextState({
            loading: false
          });
        }, 2000);
      }}
    >
      获取child组件的数据
    </Button>
  );
};

export default () => {
  const { RenderModal, show, hide, setContextState } = useRefModal({});
  const clickOpen = usePersistFn(() => {
    // 设置默认状态值
    setContextState({ loading: false });
    let close = show(
      {
        title: '标题',
        footer: <Footer />,
        afterClose() {
          console.log('关闭回调');
        },
        onOk() {
          console.log('点击确定');
          close();
          close = null;
        }
      },
      { a: 123 }
    );
  });

  return (
    <>
      <Button type="primary" onClick={clickOpen}>
        Open Modal
      </Button>
      <RenderModal>
        <Child />
      </RenderModal>
    </>
  );
};
