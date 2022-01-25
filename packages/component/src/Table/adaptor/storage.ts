import { get, set } from '@tms/storage';
import type { Cache, CacheAdaptor, DefaultData } from '../interface';

class StorageAdaptor implements CacheAdaptor {
  prefix: string = 'site-cache-table-';

  id: string;

  getDefaultData: DefaultData;

  constructor(id: string, getDefaultData: DefaultData) {
    this.id = id;
    this.getDefaultData = getDefaultData;
  }

  async getCahce(id: string) {
    return (get(this.prefix + id) || (await Promise.resolve(this.getDefaultData(id)))) as Cache;
  }

  setCache(id: string, cache: Cache) {
    try {
      set(this.prefix + id, cache);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default StorageAdaptor;
