import Dexie, { Table } from 'dexie';
import type { CacheAdaptor, Cache, DefaultData } from '../interface';

interface TableColumn {
  id: string;
  data: Cache;
}

class DBAdaptor extends Dexie implements CacheAdaptor {
  caches!: Table<TableColumn>;

  getDefaultData: DefaultData;

  constructor(id: string, getDefaultData: any) {
    super(id);
    this.getDefaultData = getDefaultData;
    this.version(1).stores({
      caches: 'id,data'
    });
  }

  getCahce(id: string) {
    return new Promise<Cache>((resolve) => {
      this.caches
        .where('id')
        .equals(id)
        .toArray(async (tables) => {
          if (!tables.length) {
            const data = await Promise.resolve(this.getDefaultData(id));
            this.caches
              .add({
                id: String(id),
                data
              })
              .then(() => {
                resolve(data);
              });
          } else {
            resolve(tables[0].data);
          }
        });
    });
  }

  setCache(id: string, cache: Cache) {
    return this.caches
      .update(id, {
        id,
        data: cache
      })
      .then((res) => {
        return res === 1;
      });
  }
}

export default DBAdaptor;
