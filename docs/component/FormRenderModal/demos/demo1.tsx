import React, { useMemo } from 'react';
import { Button } from 'antd';
import { useFormRenderModal, IFormSchema } from '@tms/site-component';

export default () => {
  const schema: IFormSchema = useMemo(
    () => ({
      meta: [
        {
          type: 'Input',
          name: 'userName',
          label: '用户名',
          // initialValue: '姓名',
          required: true
        }
      ]
    }),
    []
  );
  const { RenderModal, ...modal } = useFormRenderModal({
    title: '标题',
    // @ts-ignore
    onOk() {
      console.log(modal.formRef.current.form);
      console.log(11111, modal.getForm());
      // console.log('modal.form', modal.getForm());

      // const values = modal.form.getFieldsValue();
      // console.log('values22', values);
    }
  });

  return (
    <>
      <RenderModal />
      <Button
        onClick={() => {
          modal.show({ schema });
        }}
      >
        hooks用法
      </Button>
    </>
  );
};
