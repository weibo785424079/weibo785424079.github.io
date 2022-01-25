import { createContext, useContext } from 'react';
import type { Cache } from './interface';

const Context = createContext<{
  id: string;
  minWidth?: number;
  columns: Cache['columns'];
  setCacheState: any;
  orderMap: Map<string, number>;
  hideColumns: Set<String>;
  cacheWidth: Map<string, number>;
  frozenNumber: number;
  cleanCache: () => void;
}>({
  id: '',
  setCacheState: () => {},
  orderMap: new Map(),
  hideColumns: new Set(),
  cacheWidth: new Map(),
  columns: [],
  frozenNumber: -1,
  cleanCache: () => undefined
});

export const useTableContext = () => useContext(Context);

export const ModalContext = createContext({
  show: () => {}
});

export const useModalContext = () => useContext(ModalContext);

export default Context;
