(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.TypeOf = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

/**
 * 类型判断
 */

var toStr = Object.prototype.toString;

var index = function (val) {
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
    default:
      {
        if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val && typeof val.length === 'number') {
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

        return typeof val === 'undefined' ? 'undefined' : _typeof(val);
      }
  }
};

return index;

})));
