import React from 'react';
import { useCountDown } from '@tms/site-hook';
import { Button, Input } from 'antd';
import 'antd/lib/input/style/css';

export default () => {
  const [{ isCountDowning, remaning }, { start }] = useCountDown();
  return (
    <div>
      <Input suffix={
            isCountDowning ? (
              <span>
                {`${remaning}s`}
              </span>
            ) : <Button onClick={() => start()}>获取验证码</Button>
        }
      />
    </div>
  );
};
