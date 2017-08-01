/**
 * util
 */

const hasOwn = Object.prototype.hasOwnProperty;
const toStr = Object.prototype.toString;

export function isArray(arr) {
  return Array.isArray(arr);
}

export function isPlainObject(obj) {
  if (!obj || toStr.call(obj) !== '[object Object]') {
    return false;
  }

  const hasOwnConstructor = hasOwn.call(obj, 'constructor');
  const hasIsPrototypeOf = obj.constructor &&
    obj.constructor.prototype &&
    hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');

  // Not own constructor property must be Object
  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }

  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.
  let key;
  for (key in obj) { /**/ }

  return typeof key === 'undefined' || hasOwn.call(obj, key);
}
