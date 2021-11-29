import React, { useState, useCallback, useRef } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/es/modal';
import useImmutable from '../useImmutable';
import usePersistFn from '../usePersistFn';
import 'antd/lib/modal/style/css';

interface IUseModal extends ModalProps {}

// export interface IUseRefModal<CS = Record<string, any>, CR = any> {
//   contextState: CS;
//   setContextState: (...args: any) => void;
//   contextRef: {
//     current: CR;
//   };
// }

export interface IUseRefModal<T = any, CS = Record<string, any>, CR = any> {
  hide: () => void;
  show: (childData?: T, modalData?: IUseModal) => () => void;
  visible: boolean;
  RenderModal: any;
  contextState: CS;
  setContextState: (...args: any) => void;
  contextRef: {
    current: CR;
  };
}

function useRefModal<T = any, CS = Record<string, any>, CR = any, M = IUseModal>(options: IUseModal = {}) {
  const [visible, setVisible] = useState(false);
  // @ts-ignore
  const [contextState, setContextStateData] = useState<CS>({});

  // 模态框子组件参数传递
  const childRef = useRef<T>(null);

  // 模态框配置参数
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const modalDataRef = useRef<M>();

  // 上下文状态管理
  const contextStateRef = useRef<CS>(contextState);
  contextStateRef.current = contextState;

  // 模态框是否可见
  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  // 在footer、title、content组件注入ref，方便组件通讯
  const contextRef = useRef<CR>();

  const setContextState = usePersistFn((obj, isClear?: boolean) => {
    if (isClear) {
      // @ts-ignore
      setContextStateData({});
      return;
    }
    setContextStateData({
      ...contextState,
      ...(obj || {})
    });
  });

  const hide = useCallback(() => setVisible(false), []);

  const show = useCallback((childData?: T, modalData?: M): ((...args: any[]) => void) => {
    // @ts-ignore
    childRef.current = childData || {};
    // @ts-ignore
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
      // onOk: hide,
      cancelText: '取消',
      onText: '确定',
      keyboard: false,
      maskClosable: false,
      visible: visibleRef.current,
      ...rest,
      ...optionsRef.current,
      ...modalDataRef.current,
      afterClose
    };
    const ctx = {
      ...(childRef.current || {}),
      contextState: contextStateRef.current,
      setContextState,
      contextRef
    };
    // // footer自动注入contextRef
    if (props.footer && typeof props.footer !== 'string') {
      // @ts-ignore
      if (typeof props.footer.type !== 'string') {
        props.footer = React.cloneElement(props.footer as any, {
          ...ctx
        });
      }
    }
    // title自动注入contextRef
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
