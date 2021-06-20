import React, { useState } from 'react';
import { Signature } from '@tms/site-component';
import { useModal, useUnMount } from '@tms/site-hook';

export default () => {
  const [url, setUrl] = useState('');
  const { show, RenderModal } = useModal({
    okText: '确定',
    cancelText: '取消',
  });

  useUnMount(() => {
    if (url) {
      URL.revokeObjectURL(url);
    }
  });

  return (
    <div>
      <Signature
        onFile={(file) => {
          setUrl(URL.createObjectURL(file));
          show();
        }}
      />
      <RenderModal>
        {url ? <img src={url} alt="img" /> : null}
      </RenderModal>
    </div>
  );
};
