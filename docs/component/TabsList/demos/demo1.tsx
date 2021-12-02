import React, { useState } from 'react';
import { TabsList } from '@tms/site-component';

export default () => {
  const [tab, settab] = useState('project');
  const tabMeta = [
    {
      key: 'project',
      tab: '项目信息',
      render() {
        return '项目信息';
      }
    },
    {
      key: 'apply',
      tab: '申请/报告表',
      render() {
        return '申请/报告表';
      }
    },
    {
      key: 'report',
      tab: '送审材料',
      render() {
        return '送审材料';
      }
    },
    {
      key: 'test',
      tab: '测试children',
      children: <div>测试</div>
    }
  ];
  return (
    <>
      <TabsList activeKey={tab} onChange={settab} meta={tabMeta} />
    </>
  );
};
