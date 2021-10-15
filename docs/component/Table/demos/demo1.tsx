import React from 'react';
import { Table } from '@tms/site-component';

const Demo = () => {
  return (
    <Table
      id="default"
      columns={[
        {
          key: 'index',
          title: '首页',
          width: 100
        },
        {
          key: '2',
          title: '首页-2',
          width: 100
        },
        {
          key: '3',
          title: '首页-3',
          width: 100
        },
        {
          key: '4',
          title: '首页-4',
          width: 100
        },
        {
          key: '5',
          title: '首页-5',
          width: 100
        }
      ]}
      dataSource={[]}
    />
  );
};

export default Demo;
