const LStorage = window.localStorage;
const SStorage = window.sessionStorage;
const { JSON } = window;

export enum StorageType {
  localStorage = "localStorage",
  sessionStorage = "sessionStorage",
}

/**
 * 存储 keyValue
 * 示例：
 *   const name = 'lilei'
 *   set('name', name);
 * @param key string
 * @param obj any
 * @param storageType 枚举值，设置储存介质类型, 默认获取 localStorage
 */
export const set = <T>(
  key: string,
  obj: T,
  storageType: StorageType = StorageType.localStorage
): void => {
  if (storageType === StorageType.localStorage) {
    LStorage.setItem(key, JSON.stringify(obj));
  } else {
    SStorage.setItem(key, JSON.stringify(obj));
  }
};

/**
 * 根据 key 获取相应 value
 * 示例：
 *   const name = get<string>('name');
 *   console.log('name?.length', name?.length);
 * @param {string} key
 * @param {StorageType} storageType  枚举值，设置储存介质类型, 默认获取 localStorage
 */
export const get = <T>(
  key: string,
  storageType: StorageType = StorageType.localStorage
): T | null | string => {
  if (storageType === StorageType.localStorage) {
    let jsonStr = LStorage.getItem(key);
    try {
      jsonStr = JSON.parse(jsonStr || "null");
    } catch (err) {
      console.error("localStorage JSON.parse出错, 原数据:", jsonStr);
    }
    return jsonStr;
  }

  let jsonStr = SStorage.getItem(key);
  try {
    jsonStr = JSON.parse(jsonStr || "null");
  } catch (err) {
    console.error("sessionStorage JSON.parse出错, 原数据:", jsonStr);
  }
  return jsonStr;
};

/**
 * 移除对应key value
 * 示例：remove('name');
 * @param {string} key
 * @param {StorageType} storageType  枚举值，设置储存介质类型, 默认获取 localStorage
 */
export const remove = (
  key: string,
  storageType: StorageType = StorageType.localStorage
): void => {
  if (storageType === StorageType.localStorage) {
    LStorage.removeItem(key);
  } else {
    SStorage.removeItem(key);
  }
};

/**
 * 清空所有 key value
 * 示例：clear();
 * @param {StorageType} storageType  枚举值，设置储存介质类型, 默认获取 localStorage
 */
export const clear = (storageType = StorageType.localStorage): void => {
  if (storageType === StorageType.localStorage) {
    LStorage.clear();
  } else {
    SStorage.clear();
  }
};

type SessionTpe = {
  set<T>(key: string, value: any): void;
  get<T>(key: string): T | null | string;
  remove(key: string): void;
  clear(): void;
};

// 提供便捷方法
export const session: SessionTpe = {
  set: <T>(key: string, obj: any) =>
    set<T>(key, obj, StorageType.sessionStorage),
  get: <T>(key: string) => get<T>(key, StorageType.sessionStorage),
  remove: (key) => remove(key, StorageType.sessionStorage),
  clear: () => clear(StorageType.sessionStorage),
};
