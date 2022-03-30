import React, { useState } from 'react';
import { useUnMount } from '@tms/site-hook';
import Table from './Table';
import CacheTableContainer, { CacheCleaner } from './CacheContainer';
import type { DefaultData } from './interface';
import StorageAdaptor from './adaptor/storage';
import DBAdaptor from './adaptor/indexedDB';
import './index.css';

export { SortTableTrigger } from './SortModal';
export { useTableContext, useModalContext } from './context';

const defaultGetDefaultData: DefaultData = (id) => ({
  id,
  columns: [],
  frozenNumber: -1
});

interface Props {
  id: string;
  children: React.ReactElement;
  minWidth?: number;
  db?: boolean;
  accountId?: string;
  getDefaultData?: DefaultData;
}

function CacheTable({ accountId, id, minWidth, children, db, getDefaultData }: Props) {
  if (!id) {
    throw new Error('id 为必传字段!!!');
  }
  const [adaptor] = useState(() => {
    return db && accountId ? new DBAdaptor(accountId, getDefaultData!) : new StorageAdaptor(id, getDefaultData!);
  });

  useUnMount(() => {
    try {
      if (adaptor && adaptor instanceof DBAdaptor) {
        adaptor.close();
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <CacheTableContainer id={id} minWidth={minWidth} adaptor={adaptor!} getDefaultData={getDefaultData!}>
      {children}
    </CacheTableContainer>
  );
}

CacheTable.defaultProps = {
  minWidth: undefined,
  db: false,
  accountId: '',
  getDefaultData: defaultGetDefaultData
};

export { Table, CacheTable, CacheCleaner };

export default CacheTable;
