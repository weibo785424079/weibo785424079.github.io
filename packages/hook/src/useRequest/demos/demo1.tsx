import React, { useCallback } from 'react';
import { useRequest } from '@tms/site-hook';
import Button from 'antd/es/button';

type Res = number;

export default () => {
  const action = useCallback(() => new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random());
    }, 3000);
  }), []);

  const {
    result, loading, error, run,
  } = useRequest<Res>(action,
    {
      delay: 0,
      handelResult(res: Res) {
        return res;
      },
    });

  return (
    <div>
      <div>
        {`loading: ${loading ? 'true' : 'false'}`}
      </div>
      <div>
        {`result: ${String(result)}`}
      </div>
      <div>
        {`error: ${String(error)}`}
      </div>
      <Button style={{ marginTop: 20 }} onClick={run}>重新請求</Button>
    </div>
  );
};
