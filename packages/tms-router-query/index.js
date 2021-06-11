// action 副作用函数的帮助函数，纯函数
import querystring from 'querystring';

/**
 * 判断是否为对象类型（不完全准确）
 * @param {*} obj
 */
function isObj(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * 将对象转换成url查询参数, 需要手动拼接?
 * @param {*} param
 * ```js
 * // 使用示例
 * import { queryStringify } from 'libs/utils/tms-router-query';
 * const params = { foo: '123', bar: 'abc'};
 * queryStringify(params); // foo=123&bar=abc
 * ```
 */
export function queryStringify(param) {
  if (isObj(param)) {
    return Object.keys(param).reduce((acc, current) => {
      const val = encodeURIComponent(param[current]);
      return acc ? `${acc}&${current}=${val}` : `${current}=${val}`;
    }, '');
  }
  return '';
}

/**
 *  根据 keyname 获取 url 中的 val
 * @param name
 * @returns {string}
 * ```js
 * import { getQueryString } from 'libs/utils/tms-router-query';
 * // location.href: 'localhost://8011/index.html?foo=123';
 * getQueryString('foo') // '123' 拿到的皆为字符串类型，有需求的话自己转换类型
 * ```
 */
export function getQueryString(name) {
  const obj = queryStringToQueryObj(window.location.search) || {};
  return obj[name] || '';
}

export const queryStringToQueryObj = (search) => {
  const queryUri = search.slice(1);
  return querystring.parse(queryUri);
};

/**
 * 从 url上 移除特定的键值对
 * @param {*} search
 * window.loaction.search    example: ?user=321321&access_token=5fc610ab-43eb-4682-a0b9-d27943b171b6
 * @param {*} removeKey 要移除的 query key          example: access_token
 * @return { string }                              example: ?user=321321
 */
export const removeQueryFromSearch = (search, removeKey) => {
  const queryObj = queryStringToQueryObj(search);
  const newQueryObj = [];
  Object.keys(queryObj)
    .filter((key) => key !== removeKey)
    .forEach((key) => {
      newQueryObj[key] = queryObj[key];
    });
  // newQueryObj 合成 newQueryUri 带?号
  return Object.keys(newQueryObj).length > 0
    ? `?${querystring.stringify(newQueryObj)}`
    : `${querystring.stringify(newQueryObj)}`;
};

export default {
  queryStringify,
  getQueryString,
  removeQueryFromSearch,
};
