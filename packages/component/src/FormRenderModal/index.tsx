// 模态框加入form表单
import React, { useImperativeHandle, useRef } from 'react';
import { usePersistFn, useCtxModal } from '@tms/site-hook';
import { ModalProps } from 'antd/es/modal';
import { FormRender, IFormSchema } from '../FormRender';

interface UseMdoal extends ModalProps {
  custom?: boolean; // 自定义title，添加class把内边距去掉
}
export interface IModalFormRenderProps {
  schema: IFormSchema;
  options?: UseMdoal;
  beforeChildren?: React.ReactNode;
  children?: React.ReactNode;
}

// 1、FormRender带模态框 组件ref用法
const FormRenderModal = React.forwardRef(
  ({ schema = {}, children, beforeChildren, options }: IModalFormRenderProps, ref) => {
    const { RenderModal, ...rest } = useCtxModal(options);
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
          {beforeChildren}
          <FormRender wrappedComponentRef={formRef} schema={schema} />
          {children}
        </>
      </RenderModal>
    );
  }
);

// 2、FormRender带模态框 hooks用法
function useFormRenderModal(props?: Pick<IModalFormRenderProps, 'schema' | 'options'>) {
  const { schema = {}, options } = props || {};
  const formRef = useRef<any>({ form: undefined });
  const { RenderModal, ...rest } = useCtxModal(options);
  const ModalComp = usePersistFn((modalProps?: Pick<IModalFormRenderProps, 'children' | 'beforeChildren'>) => {
    // @ts-ignore
    const { children, beforeChildren } = modalProps;
    return (
      <RenderModal>
        <>
          {beforeChildren}
          <FormRender wrappedComponentRef={formRef} schema={schema} />
          {children}
        </>
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
