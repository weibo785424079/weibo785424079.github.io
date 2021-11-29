// 模态框加入form表单
import React, { useImperativeHandle, useRef } from 'react';
import { usePersistFn, useRefModal } from '@tms/site-hook';
import { ModalProps } from 'antd/es/modal';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { FormRender, IFormSchema } from '../FormRender';

export interface IModalFormRenderProps {
  schema?: IFormSchema;
  options?: ModalProps;
  beforeChildren?: React.ReactNode;
  children?: React.ReactNode;
}

export interface IFormRenderModalRef<T = any, CS = Record<string, any>, CR = any> {
  form: WrappedFormUtils;
  hide: () => void;
  show: (childData?: T, modalData?: ModalProps) => () => void;
  visible: boolean;
  RenderModal: any;
  contextState: CS;
  setContextState: (...args: any) => void;
  contextRef: {
    current: CR;
  };
}

// 1、FormRender带模态框 组件ref用法
const FormRenderModal = React.forwardRef(
  ({ schema, children, beforeChildren, options }: IModalFormRenderProps, ref) => {
    const { RenderModal, ...rest } = useRefModal(options);
    const formRef = useRef<any>({ form: undefined });
    useImperativeHandle(ref, () => ({
      ...rest,
      get form() {
        return formRef.current.form;
      }
    }));
    return (
      <RenderModal>
        {(childProps) => (
          <>
            {beforeChildren}
            <FormRender wrappedComponentRef={formRef} schema={schema} {...childProps} />
            {children}
          </>
        )}
      </RenderModal>
    );
  }
);

// 2、FormRender带模态框 hooks用法
function useFormRenderModal(props?: Pick<IModalFormRenderProps, 'schema'>) {
  const { schema } = props || {};
  const formRef = useRef<any>({ form: undefined });
  const { RenderModal, ...rest } = useRefModal();
  const ModalComp = usePersistFn((modalProps?: Pick<IModalFormRenderProps, 'children' | 'beforeChildren'>) => {
    // @ts-ignore
    const { children, beforeChildren } = modalProps;
    return (
      <RenderModal>
        {(childProps) => (
          <>
            {beforeChildren}
            <FormRender wrappedComponentRef={formRef} schema={schema} {...childProps} />
            {children}
          </>
        )}
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
