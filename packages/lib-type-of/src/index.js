/**
 * 类型判断
 */

const toStr = Object.prototype.toString;

export default function (val) {
  switch (toStr.call(val)) {
    case '[object Function]':
      return 'function';
    case '[object Date]':
      return 'date';
    case '[object RegExp]':
      return 'regexp';
    case '[object Arguments]':
      return 'arguments';
    case '[object Array]':
      return 'array';
    case '[object String]':
      return 'string';
    default: {
      if (typeof val === 'object' && val && typeof val.length === 'number') {
        try {
          if (typeof val.callee === 'function') return 'arguments';
        } catch (ex) {
          if (ex instanceof TypeError) {
            return 'arguments';
          }
        }
      }

      if (val === null) return 'null';
      if (val === undefined) return 'undefined';
      if (val && val.nodeType === 1) return 'element';
      if (val === Object(val)) return 'object';

      return typeof val;
    }
  }
}
