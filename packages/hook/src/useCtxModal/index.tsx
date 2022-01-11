import React, { useState, useCallback, useRef, createContext, useContext, useMemo } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/es/modal';
import { useImmutable, usePersistFn } from '@tms/site-hook';
import useBridge, { BridgeItem } from '../useBridge';
import './index.css';

interface UseMdoal extends ModalProps {
  custom?: boolean; // 自定义title，添加class把内边距去掉
}

type ModalContextProps<T = any> = {
  show: (d: T) => void;
  hide: () => void;
  data: T;
  modal: ModalProps;
  // visible: boolean; 会多一次渲染，这个值也不是必要的、所以注释掉
  bridge: BridgeItem;
  setModalProps: (data: ModalProps) => void;
};

const Context = createContext<ModalContextProps>({} as ModalContextProps);

export function useCtxModalContext<T = any>() {
  return useContext<ModalContextProps<T>>(Context);
}

function useCtxModal<T = any>(options: UseMdoal = {}) {
  const [visible, setVisible] = useState(false);

  // 暂存子组件数据
  const dataRef = useRef<T>();

  const visibleRef = useRef(visible);

  visibleRef.current = visible;
  // 设置弹窗数据
  const [modalProps, $setModalProps] = useState({});

  const setModalProps = useCallback((data: ModalProps) => {
    if (visibleRef.current) {
      $setModalProps((prev) => ({ ...prev, ...data }));
    }
  }, []);

  // 暂存弹窗数据
  const propsRef = useRef({ modalProps, options });

  propsRef.current = { modalProps, options };

  const bridge = useBridge();

  const show = useCallback((data?: T) => {
    if (typeof data !== 'undefined') {
      dataRef.current = data;
    }
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  const ContextValue = useRef<ModalContextProps<T>>();

  ContextValue.current = useMemo(
    () => ({
      data: dataRef.current,
      modal: modalProps,
      show,
      hide,
      setModalProps,
      bridge
    }),
    [modalProps, dataRef.current]
  ) as ModalContextProps<T>;

  const RenderModal = useImmutable(({ children, ...rest }) => {
    const props = {
      destroyOnClose: true,
      onCancel: hide,
      onOk: hide,
      visible: visibleRef.current,
      ...rest,
      ...propsRef.current.options,
      ...propsRef.current.modalProps
    };
    const { custom } = props;
    let { wrapClassName = '' } = props;
    if (custom) {
      wrapClassName += ' site-hook-ctxmodal-custom';
    }
    props.afterClose = usePersistFn(function close(...args: any[]) {
      const { afterClose = () => {} } = { ...rest, ...propsRef.current.options, ...propsRef.current.modalProps };
      const res = afterClose.apply(this, args);
      dataRef.current = undefined;
      $setModalProps({});
      return res;
    });
    return (
      <Context.Provider value={ContextValue.current!}>
        <Modal {...props} wrapClassName={wrapClassName}>
          {children}
        </Modal>
      </Context.Provider>
    );
  });

  return {
    hide,
    show,
    visible,
    RenderModal,
    setModalProps,
    bridge,
    context: ContextValue.current
  };
}

export default useCtxModal;
