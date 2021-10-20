import React, { ReactElement, useMemo, useRef } from 'react';
import { get, set } from '@tms/storage';
import { useDebounceFn, usePersistFn, useUpdate } from '@tms/site-hook';
import Context, { useTableContext } from './context';

export type Column = {
  key: string;
  show: 0 | 1;
  order: number;
  width?: number;
};

export type Cache = {
  id: string;
  frozenNumber: number;
  columns: Array<Column>;
};
const prefix = 'site-cache-table-';

const getDefaultData = (id: string) => ({
  id,
  columns: [],
  frozenNumber: -1
});

export const getCahce = (id: string) => {
  return get(prefix + id) as Cache | undefined;
};

export const create = (id: string): Cache => {
  const defaultData = getDefaultData(id);
  set(prefix + id, defaultData);
  return defaultData;
};

export const setCahce = (data: { id: string } & Partial<Cache>) => {
  const current = getCahce(data.id) || create(data.id);
  return set(prefix + data.id, { ...current, ...data });
};

interface Props {
  children: ReactElement;
  minWidth?: number;
  id: string;
}

const CacheTableContainer = ({ children, id, minWidth }: Props) => {
  const cacheRef = useRef<Cache>();
  const refreshRef = useRef(true);
  const state = useMemo(() => {
    refreshRef.current = true;
    return getCahce(id) || create(id);
  }, [id]);

  if (refreshRef.current) {
    cacheRef.current = state;
    refreshRef.current = false;
  }
  const cache = cacheRef.current!;
  const update = useUpdate();

  const setCacheState = usePersistFn((data) => {
    const res = typeof data === 'function' ? data(cache) : data;
    const curr = { ...cache, id, ...res };
    cacheRef.current = curr;
    update();
  });

  const { orderMap, hideColumns, cacheWidth } = useMemo(() => {
    const $hideColumns = new Set<string>();
    const $orderMap = new Map();
    const $cacheWidth = new Map();
    const { columns: cacheColumns, ...other } = cache;

    cacheColumns.forEach((col) => {
      if (col.show === 0) {
        $hideColumns.add(col.key);
      }
      if (col.key) {
        $orderMap.set(col.key, col.order ?? NaN);
        $cacheWidth.set(col.key, col.width);
      }
    });

    return {
      ...other,
      orderMap: $orderMap,
      hideColumns: $hideColumns,
      cacheWidth: $cacheWidth
    };
  }, [cache]);

  useDebounceFn(() => {
    setCahce(cache);
  }, cache);

  const value = useMemo(() => {
    const currSetCache = (data: { id: string } & Partial<Cache>) => {
      setCacheState((c) => ({ ...c, ...data }));
    };
    const cleanCache = () => {
      const defaultData = getDefaultData(id);
      setCacheState(defaultData);
    };
    return {
      ...cache,
      setCacheState: currSetCache,
      orderMap,
      hideColumns,
      cacheWidth,
      cleanCache,
      minWidth
    };
  }, [id, cache, setCacheState, orderMap, hideColumns, cacheWidth, minWidth]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const CacheCleaner = ({ children }: { children: React.ReactElement }) => {
  const { cleanCache } = useTableContext();
  return React.cloneElement(children, { onClick: () => cleanCache() });
};

CacheTableContainer.defaultProps = {
  minWidth: undefined
};

export default CacheTableContainer;
