import React from 'react';
import Table from './Table';
import CacheTableContainer, { CacheCleaner } from './CacheContainer';
import './index.css';

export { SortTableTrigger } from './SortModal';
export { useTableContext, useModalContext } from './context';

interface Props {
  id: string;
  minWidth?: number;
  children: React.ReactElement;
}

function CacheTable({ id, minWidth, children }: Props) {
  if (!id) {
    throw new Error('id 为必传字段!!!');
  }
  return (
    <CacheTableContainer id={id} minWidth={minWidth}>
      {children}
    </CacheTableContainer>
  );
}

CacheTable.defaultProps = {
  minWidth: undefined
};

export { Table, CacheTable, CacheCleaner };

export default CacheTable;
