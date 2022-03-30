import React from 'react';
import { Table, CacheTable, SortTableTrigger } from '@tms/site-component';
import { Button, Icon } from 'antd';

const Demo2 = () => {
  return (
    <CacheTable accountId="accountId1" minWidth={100} id="default" db>
      <Table
        rowKey="1"
        columns={[
          {
            key: '1',
            title: '首页',
            // width: 100,
            dataIndex: '1'
          },
          {
            key: '2',
            title: '首页-2',
            // width: 100,
            dataIndex: '2'
          },
          {
            key: '3',
            title: '首页-3',
            // width: 100,
            dataIndex: '3'
          },
          {
            key: '4',
            title: '首页-4',
            // width: 100,
            dataIndex: '4'
          },
          {
            key: '5',
            title: '首页-5',
            // width: 100,
            dataIndex: '5'
          },
          {
            key: 'operations',
            title: (
              <>
                <span style={{ marginRight: 10 }}>操作</span>
                <SortTableTrigger>
                  <Icon type="down" />
                </SortTableTrigger>
              </>
            ),
            render() {
              return <Button type="primary">我啥也不干</Button>;
            }
          }
        ]}
        dataSource={[
          {
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5'
          }
        ]}
        scroll={{
          x: 'max-content'
        }}
      />
    </CacheTable>
  );
};

export default Demo2;
