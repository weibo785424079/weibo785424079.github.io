import { WrappedFormUtils } from 'antd/es/form/Form';

// 时间组件
export function getFormat(format: string) {
  let dateFormat;
  switch (format) {
    case 'date':
      dateFormat = 'YYYY-MM-DD';
      break;
    case 'time':
      dateFormat = 'HH:mm:ss';
      break;
    case 'dateTime':
      dateFormat = 'YYYY-MM-DD HH:mm:ss';
      break;
    case 'week':
      dateFormat = 'YYYY-w';
      break;
    case 'year':
      dateFormat = 'YYYY';
      break;
    case 'month':
      dateFormat = 'YYYY-MM';
      break;
    default:
      // dateTime
      if (typeof format === 'string') {
        dateFormat = format;
      } else {
        dateFormat = 'YYYY-MM-DD';
      }
  }
  return dateFormat;
}

export function isUrl(str) {
  const protocolRE = /^(?:\w+:)?\/\/(\S+)$/;
  if (typeof str !== 'string') return false;
  return protocolRE.test(str);
}

// 解析字符串函数
export const parseStringFunction = (funstr) => {
  if (typeof funstr === 'string' && funstr.indexOf('function(') === 0) {
    try {
      // eslint-disable-next-line no-new-func
      return Function(`return ${funstr}`)();
    } catch (error) {
      console.log(error);
      return () => {};
    }
  }
  return funstr;
};

// 解析字符串表达式
// element.visible
export const parseStringExpress = (expression, form: WrappedFormUtils) => {
  // 表达式是字符串，且包含this
  if (typeof expression === 'string' && expression.indexOf('this') > -1) {
    let thisObject = {};
    try {
      thisObject = form.getFieldsValue();
      // eslint-disable-next-line no-new-func
      const wrapFunction = new Function(`return ${expression}`);
      return wrapFunction.call(thisObject);
    } catch (error) {
      console.error(error, 'expression:', expression, 'this:', thisObject);
      return null;
    }
  } else {
    return expression;
  }
};
