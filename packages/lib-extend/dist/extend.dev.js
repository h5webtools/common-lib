(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Extend = factory());
}(this, (function () { 'use strict';

/**
 * util
 */

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

function isArray(arr) {
  return Array.isArray(arr);
}

function isPlainObject(obj) {
  if (!obj || toStr.call(obj) !== '[object Object]') {
    return false;
  }

  var hasOwnConstructor = hasOwn.call(obj, 'constructor');
  var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');

  // Not own constructor property must be Object
  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }

  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.
  var key = void 0;
  for (key in obj) {/**/}

  return typeof key === 'undefined' || hasOwn.call(obj, key);
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

/**
 * extend
 * @see https://github.com/justmoon/node-extend
 */

/**
 * Extend one object with one or more others, returning the modified object.
 * extend ( [deep], target, object1, [objectN] )
 * @param {Boolean} deep If set, the merge becomes recursive (i.e. deep copy).
 * @param {Object} target The object to extend.
 * @param {Object} object1 The object that will be merged into the first.
 * @param {Object} objectN More objects to merge into the first.
 */
function extend() {
  /* eslint-disable prefer-rest-params */
  var options = void 0;
  var name = void 0;
  var src = void 0;
  var copy = void 0;
  var copyIsArray = void 0;
  var clone = void 0;
  var target = arguments[0];
  var i = 1;
  var deep = false;
  var length = arguments.length;

  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {};
    // skip the boolean and the target
    i = 2;
  }
  if (target == null || (typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' && typeof target !== 'function') {
    target = {};
  }

  for (; i < length; ++i) {
    options = arguments[i];
    // Only deal with non-null/undefined values
    if (options != null) {
      // Extend the base object
      for (name in options) {
        src = target[name];
        copy = options[name];

        // Prevent never-ending loop
        if (target !== copy) {
          /* eslint-disable no-cond-assign */
          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && isArray(src) ? src : [];
            } else {
              clone = src && isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            target[name] = extend(deep, clone, copy);

            // Don't bring in undefined values
          } else if (typeof copy !== 'undefined') {
            target[name] = copy;
          }
        }
      }
    }
  }

  // Return the modified object
  return target;
}

return extend;

})));
//# sourceMappingURL=extend.dev.js.map
