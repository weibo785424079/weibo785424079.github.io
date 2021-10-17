import React from 'react';
import { Table, CacheTable, SortTableTrigger } from '@tms/site-component';
import { Button } from 'antd';

const Demo = () => {
  return (
    <CacheTable id="default">
      <Table
        rowKey="id"
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
          },
          {
            key: '6',
            title: '操作',
            render() {
              return (
                <SortTableTrigger>
                  <Button>操作</Button>
                </SortTableTrigger>
              );
            }
          }
        ]}
        dataSource={[{}]}
      />
    </CacheTable>
  );
};

export default Demo;
