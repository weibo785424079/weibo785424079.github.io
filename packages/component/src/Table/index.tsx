import React from 'react';
import { TableProps } from 'antd/es/table';
import Table from './Table';
import CacheComponent from './Cache';
import './index.css';

interface Props<U> extends TableProps<U> {
  id: string;
}

function CacheTable<U = any>({ id, ...rest }: Props<U>) {
  return (
    <CacheComponent id={id}>
      <Table {...rest} />
    </CacheComponent>
  );
}

export default CacheTable;
