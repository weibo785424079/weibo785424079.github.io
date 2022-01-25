import React, { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDebounceFn, usePersistFn } from '@tms/site-hook';
import EventEmitter3 from 'eventemitter3';
import Context, { useTableContext } from './context';
import type { Cache, CacheAdaptor, DefaultData } from './interface';

const event = new EventEmitter3();

interface Props {
  children: ReactElement;
  minWidth?: number;
  id: string;
  adaptor: CacheAdaptor;
  getDefaultData: DefaultData;
}

const CacheTableContainer = ({ children, id, minWidth, adaptor, getDefaultData }: Props) => {
  const passiveRefreshing = useRef(false);
  const inited = useRef(false);
  const [state, setState] = useState<Cache>();

  const init = useCallback(async () => {
    try {
      const cache = await Promise.resolve(adaptor.getCahce(id));
      inited.current = true;
      setState(cache);
    } catch (error) {
      console.log(error);
    }
  }, [id, adaptor]);

  useEffect(() => {
    init();
  }, [id, adaptor, init]);

  const refresh = usePersistFn((flag = true) => {
    passiveRefreshing.current = flag;
    init();
  });

  useDebounceFn(async () => {
    try {
      // 被动更新不需要重新设置storage
      if (!passiveRefreshing.current && state) {
        await adaptor.setCache(id, state);
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
  }, state);

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
    const res = typeof data === 'function' ? data(state) : data;
    const curr = { ...state, id, ...res };
    setState(curr);
  });

  const { orderMap, hideColumns, cacheWidth } = useMemo(() => {
    if (!state) return {} as any;
    const $hideColumns = new Set<string>();
    const $orderMap = new Map();
    const $cacheWidth = new Map();
    const { columns: cacheColumns, ...other } = state;

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
  }, [state]);

  const value = useMemo(() => {
    const currSetCache = (data: { id: string } & Partial<Cache>) => {
      setCacheState((c) => ({ ...c, ...data }));
    };
    const cleanCache = async () => setCacheState(await Promise.resolve(getDefaultData(id)));

    return {
      ...(state || {}),
      setCacheState: currSetCache,
      orderMap,
      hideColumns,
      cacheWidth,
      cleanCache,
      minWidth
    };
  }, [id, state, setCacheState, orderMap, hideColumns, cacheWidth, minWidth]);

  if (!inited.current) return null;
  return <Context.Provider value={value as any}>{children}</Context.Provider>;
};

export const CacheCleaner = ({ children }: { children: React.ReactElement }) => {
  const { cleanCache } = useTableContext();
  return React.cloneElement(children, { onClick: () => cleanCache() });
};

CacheTableContainer.defaultProps = {
  minWidth: undefined
};

export default CacheTableContainer;
