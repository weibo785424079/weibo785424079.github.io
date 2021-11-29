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
  const { RenderModal, ...modal } = useFormRenderModal({ schema });

  return (
    <>
      {/* <modal.RenderModal
                beforeChildren={
                    <div>前部分</div>
                }
            >
                <div>后部分</div>
            </modal.RenderModal> */}
      <RenderModal />
      <Button
        onClick={() => {
          modal.show(
            {},
            {
              onOk() {
                console.log(modal.formRef.current.form);
                console.log(11111, modal.getForm());
                // console.log('modal.form', modal.getForm());

                // const values = modal.form.getFieldsValue();
                // console.log('values22', values);
              }
            }
          );
        }}
      >
        hooks用法
      </Button>
    </>
  );
};
