// 模态框加入form表单
import React, { useImperativeHandle, useRef } from 'react';
import { usePersistFn, useModal } from '@tms/site-hook';
import { ModalProps } from 'antd/es/modal';
import { FormRender } from '../FormRender';

interface UseMdoal extends ModalProps {
  custom?: boolean; // 自定义title，添加class把内边距去掉
}
export interface IModalFormRenderProps {
  options?: UseMdoal;
  beforeChildren?: React.ReactNode;
  children?: React.ReactNode;
}

// 1、FormRender带模态框 组件ref用法
const FormRenderModal = React.forwardRef(({ children, beforeChildren, options }: IModalFormRenderProps, ref) => {
  const { RenderModal, ...rest } = useModal(options);
  const formRef = useRef<any>({ form: undefined });
  useImperativeHandle(ref, () => ({
    ...rest,
    get form() {
      return formRef.current.form;
    }
  }));
  return (
    <RenderModal>
      <>
        {(data) => {
          return (
            <>
              {typeof beforeChildren === 'function' ? beforeChildren(data) : beforeChildren}
              <FormRender wrappedComponentRef={formRef} schema={data?.schema || {}} />
              {typeof children === 'function' ? children(data) : children}
            </>
          );
        }}
      </>
    </RenderModal>
  );
});

// 2、FormRender带模态框 hooks用法
function useFormRenderModal(options) {
  const formRef = useRef<any>({ form: undefined });
  const { RenderModal, ...rest } = useModal(options);
  const ModalComp = usePersistFn((modalProps?: Pick<IModalFormRenderProps, 'children' | 'beforeChildren'>) => {
    // @ts-ignore
    const { children, beforeChildren } = modalProps;
    return (
      <RenderModal>
        {(data) => {
          return (
            <>
              {typeof beforeChildren === 'function' ? beforeChildren(data) : beforeChildren}
              <FormRender wrappedComponentRef={formRef} schema={data?.schema || {}} />
              {typeof children === 'function' ? children(data) : children}
            </>
          );
        }}
      </RenderModal>
    );
  });
  return {
    ...rest,
    formRef,
    getForm() {
      return formRef.current.form;
    },
    RenderModal: ModalComp
  };
}

export { FormRenderModal, useFormRenderModal };
