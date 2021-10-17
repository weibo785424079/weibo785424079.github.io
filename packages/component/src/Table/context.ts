import { createContext, useContext } from 'react';
import type { Cache } from './Cache';

const Context = createContext<{
  id: string;
  columns: Cache['columns'];
  setCacheState: any;
  orderMap: Map<string, number>;
  hideColumns: Set<String>;
  cacheWidth: Map<string, number>;
  frozenNumber: number;
  clearCache: () => void;
}>({
  id: '',
  setCacheState: () => {},
  orderMap: new Map(),
  hideColumns: new Set(),
  cacheWidth: new Map(),
  columns: [],
  frozenNumber: -1,
  clearCache: () => undefined
});

export const useTableContext = () => useContext(Context);

export const ModalContext = createContext({
  show: () => {}
});

export const useModalContext = () => useContext(ModalContext);

export default Context;
