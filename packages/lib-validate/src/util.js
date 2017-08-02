/**
 * 工具库
 */

const toStr = Object.prototype.toString;
const hasOwn = Object.prototype.hasOwnProperty;

/**
 * each
 * @param {Object|Array} obj
 * @param {Function} cb
 */
export function each(obj, cb) {
  if (!isFunction(cb)) {
    throw new Error('cb must be a function.');
  }

  if (Array.isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      const res = cb(i, obj[i]);
      if (res === false) break;
    }
  } else if (isObject(obj)) {
    for (const k in obj) {
      if (hasOwn.call(obj, k)) {
        const res = cb(k, obj[k]);
        if (res === false) break;
      }
    }
  }
}

/**
 * 是否是对象
 * @param {Object} obj
 * @return {Boolean}
 */
export function isObject(obj) {
  return toStr.call(obj) === '[object Object]';
}

/**
 * 是否是函数
 * @param {Function} fn
 * @return {Boolean}
 */
export function isFunction(fn) {
  return typeof fn === 'function';
}

/**
 * 是否是字符串
 * @param {String} str
 * @return {Boolean}
 */
export function isString(str) {
  return toStr.call(str) === '[object String]';
}

/**
 * css
 * @param {Object} el
 * @param {Object} obj
 */
export function css(el, obj) {
  for (const k in obj) {
    if (hasOwn.call(obj, k)) {
      el.style[k] = obj[k];
    }
  }
}

/**
 * 获取元素
 * @param {String|HTMLElement} node
 * @return {HTMLElement}
 */
export function getElement(node) {
  if (typeof node === 'string') {
    return document.querySelector(node);
  }
  return node;
}
