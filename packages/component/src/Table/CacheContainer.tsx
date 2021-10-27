import React, { ReactElement, useEffect, useMemo, useRef } from 'react';
import { get, set } from '@tms/storage';
import { useDebounceFn, usePersistFn, useUpdate } from '@tms/site-hook';
import EventEmitter3 from 'eventemitter3';
import Context, { useTableContext } from './context';

const event = new EventEmitter3();

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
  const passiveRefreshing = useRef(false);
  const inited = useRef(false);

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

  const refresh = usePersistFn((flag = true) => {
    passiveRefreshing.current = flag;
    cacheRef.current = getCahce(id) || create(id);
    update();
  });

  useDebounceFn(() => {
    try {
      // 被动更新不需要重新设置storage
      if (!passiveRefreshing.current) {
        setCahce(cache);
      }
      // 被动更新以及初始化不需要发布同步更新命令
      if (!passiveRefreshing.current && inited.current) {
        event.emit(id, refresh);
      }
    } catch (error) {
      console.log(error);
    } finally {
      inited.current = true;
      passiveRefreshing.current = false;
    }
  }, cache);

  useEffect(() => {
    event.on(id, (fn) => {
      if (fn !== refresh) {
        refresh();
      }
    });
    return () => {
      event.off(id, refresh);
    };
  }, [id]);

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
