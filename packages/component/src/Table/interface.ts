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

export interface CacheAdaptor {
  setCache: (id: string, cache: Cache) => boolean | Promise<boolean>;
  getCahce: (id: string) => Cache | Promise<Cache>;
}

export type DefaultData = (
  id: string
) =>
  | Promise<{ id: string; columns: Array<Column>; frozenNumber: number }>
  | { id: string; columns: Array<Column>; frozenNumber: number };
