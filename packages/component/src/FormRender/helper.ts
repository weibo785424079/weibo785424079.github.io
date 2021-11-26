function pickProps(source: Record<string, any>, props: string[]) {
  const target = {};
  props.forEach((propName) => {
    if (Object.prototype.hasOwnProperty.call(source, propName)) {
      target[propName] = source[propName];
    }
  });
  return target;
}

const FormPropsPickArray = [
  'hideRequiredMark',
  'labelAlign',
  'labelCol',
  'layout',
  'className',
  'style',
  'prefixCls',
  'colon',
  'wrapperCol',
  'onSubmit'
];

const FormItemPropsPickArray = [
  'className',
  // 'style',
  'id',
  'colon',
  'htmlFor',
  'label',
  'labelAlign',
  'labelCol',
  'wrapperCol',
  'help',
  'extra',
  'validateStatus',
  'hasFeedback'
  // 'required',
];

const getArray = (arr: any, defaultValue = []) => {
  if (Array.isArray(arr)) return arr;
  return defaultValue;
};

const isFunction = (val: any) => {
  if (typeof val === 'function') {
    return true;
  }
  return false;
};

const hasOwnProperty = (obj: Record<string, any>, key: string) => Object.prototype.hasOwnProperty.call(obj, key);

const defaultGetValueFromEvent = (valuePropName, ...args) => {
  const event = args[0];
  if (event && event.target && valuePropName in event.target) {
    return event.target[valuePropName];
  }
  return event;
};

export {
  pickProps,
  FormPropsPickArray,
  FormItemPropsPickArray,
  defaultGetValueFromEvent,
  getArray,
  isFunction,
  hasOwnProperty
};
