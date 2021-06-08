import React from 'react';
import { createUseComponent } from '@tms/site-hook';
import { Button } from 'antd';
import 'antd/lib/style/css';

const Profile = () => <p>Profile</p>;

const useProfile = createUseComponent(Profile)({
  title: 'useProfile',
  okText: '确定',
  cancelText: '取消',
});

export default () => {
  const { Render, show } = useProfile();
  return (
    <div>
      <Button onClick={show}>打开弹窗</Button>
      <Render>
        <p>很多东西</p>
      </Render>
    </div>
  );
};
