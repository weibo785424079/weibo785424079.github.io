import React, { useState, useCallback, useRef } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/es/modal';
import useImmutable from '../useImmutable';
import usePersistFn from '../usePersistFn';
import 'antd/lib/modal/style/css';

export interface IUseModal extends ModalProps {}

export interface IuseModalReturn<T, K> {
  show: (modalData?: K, childData?: T) => () => void;
  hide: () => void;
  contextState: Record<string, any>;
  setContextState: (...args: any[]) => any;
  visible: boolean;
  RenderModal: any;
  contextRef: {
    current: any;
  };
}

function useRefModal<T = any, K = IUseModal>(options: IUseModal = {}): IuseModalReturn<T, K> {
  const [visible, setVisible] = useState(false);
  const [contextState, setData] = useState({});

  // 模态框子组件参数传递
  const childRef = useRef<any>(null);

  // 模态框配置参数
  const optionsRef = useRef(options);
  optionsRef.current = options;

  // 上下文状态管理
  const contextStateRef = useRef(contextState);
  contextStateRef.current = contextState;

  // 模态框配置数据
  const modalDataRef = useRef({});

  // 模态框是否可见
  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  const contextRef = useRef();

  const setContextState = usePersistFn((obj, isClear?: boolean) => {
    if (isClear) {
      setData({});
      return;
    }
    setData({
      ...contextState,
      ...(obj || {})
    });
  });

  const hide = useCallback(() => setVisible(false), []);

  const show = useCallback((modalData?: K, childData?: T) => {
    childRef.current = childData || ({} as T);
    modalDataRef.current = modalData || {};
    setVisible(true);
    return hide;
  }, []);

  const RenderModal = useImmutable(({ children, ...rest }) => {
    const afterClose = usePersistFn(() => {
      setContextState({}, true);
      if (typeof rest.afterClose === 'function') {
        rest.afterClose();
      }
    });
    const props = {
      destroyOnClose: true,
      onCancel: hide,
      onOk: hide,
      cancelText: '取消',
      onText: '确定',
      keyboard: false,
      maskClosable: false,
      visible: visibleRef.current,
      ...rest,
      afterClose,
      ...optionsRef.current,
      ...modalDataRef.current
    };
    const ctx = {
      ...(childRef.current || {}),
      contextState: contextStateRef.current,
      setContextState,
      contextRef
    };
    // // 自动注入contextRef
    if (props.footer && typeof props.footer !== 'string') {
      // @ts-ignore
      if (typeof props.footer.type !== 'string') {
        props.footer = React.cloneElement(props.footer as any, {
          ...ctx
        });
      }
    }
    // 自动注入contextRef
    if (props.title && typeof props.title !== 'string') {
      // @ts-ignore
      if (typeof props.title.type !== 'string') {
        props.title = React.cloneElement(props.title as any, {
          ...ctx
        });
      }
    }

    const childProps = {
      ...(childRef.current || {}),
      contextState: contextStateRef.current,
      setContextState,
      contextRef
    };
    let node: any;
    if (typeof children === 'string') {
      node = children;
    } else if (typeof children === 'function') {
      node = children(childProps);
    } else {
      // eslint-disable-next-line no-lonely-if
      if (typeof children.type !== 'string') {
        node = React.cloneElement(children, childProps);
      } else {
        node = React.cloneElement(children, {
          ...(childRef.current || {}),
          contextRef
        });
      }
    }
    return <Modal {...props}>{node}</Modal>;
  });

  return {
    hide,
    show,
    visible,
    RenderModal,
    contextState,
    setContextState,
    contextRef
  };
}

export default useRefModal;
