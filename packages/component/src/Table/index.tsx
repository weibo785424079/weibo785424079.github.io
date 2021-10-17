import React from 'react';
import Table from './Table';
import CacheTableContainer from './Cache';
import './index.css';

export { SortTableTrigger } from './SortAndHide';
export { useTableContext, useModalContext } from './context';

interface Props {
  id: string;
  children: React.ReactElement;
}

function CacheTable({ id, children }: Props) {
  if (!id) {
    throw new Error('id 为必传字段!!!');
  }
  return <CacheTableContainer id={id}>{children}</CacheTableContainer>;
}

export { Table, CacheTable };

export default CacheTable;
