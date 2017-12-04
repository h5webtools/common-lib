(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Validate = factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var extend = createCommonjsModule(function (module, exports) {
  !function (o, t) {
    module.exports = t();
  }(commonjsGlobal, function () {
    "use strict";
    function o(o) {
      return Array.isArray(o);
    }function t(o) {
      if (!o || "[object Object]" !== e.call(o)) return !1;var t = n.call(o, "constructor"),
          r = o.constructor && o.constructor.prototype && n.call(o.constructor.prototype, "isPrototypeOf");if (o.constructor && !t && !r) return !1;var i = void 0;for (i in o) {}return void 0 === i || n.call(o, i);
    }function r() {
      var n = void 0,
          e = void 0,
          c = void 0,
          f = void 0,
          u = void 0,
          y = void 0,
          p = arguments[0],
          l = 1,
          d = !1,
          s = arguments.length;for ("boolean" == typeof p && (d = p, p = arguments[1] || {}, l = 2), (null == p || "object" !== (void 0 === p ? "undefined" : i(p)) && "function" != typeof p) && (p = {}); l < s; ++l) {
        if (null != (n = arguments[l])) for (e in n) {
          c = p[e], p !== (f = n[e]) && (d && f && (t(f) || (u = o(f))) ? (u ? (u = !1, y = c && o(c) ? c : []) : y = c && t(c) ? c : {}, p[e] = r(d, y, f)) : void 0 !== f && (p[e] = f));
        }
      }return p;
    }var n = Object.prototype.hasOwnProperty,
        e = Object.prototype.toString,
        i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (o) {
      return typeof o === 'undefined' ? 'undefined' : _typeof(o);
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o === 'undefined' ? 'undefined' : _typeof(o);
    };return r;
  });
});

/**
 * 工具库
 */

var toStr = Object.prototype.toString;
var hasOwn = Object.prototype.hasOwnProperty;

/**
 * each
 * @param {Object|Array} obj
 * @param {Function} cb
 */
function each(obj, cb) {
  if (!isFunction(cb)) {
    throw new Error('cb must be a function.');
  }

  if (Array.isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      var res = cb(i, obj[i]);
      if (res === false) break;
    }
  } else if (isObject(obj)) {
    for (var k in obj) {
      if (hasOwn.call(obj, k)) {
        var _res = cb(k, obj[k]);
        if (_res === false) break;
      }
    }
  }
}

/**
 * 是否是对象
 * @param {Object} obj
 * @return {Boolean}
 */
function isObject(obj) {
  return toStr.call(obj) === '[object Object]';
}

/**
 * 是否是函数
 * @param {Function} fn
 * @return {Boolean}
 */
function isFunction(fn) {
  return typeof fn === 'function';
}

/**
 * 是否是字符串
 * @param {String} str
 * @return {Boolean}
 */
function isString(str) {
  return toStr.call(str) === '[object String]';
}

/**
 * 是否是数字
 * @param {Number} num
 * @return {Boolean}
 */
function isNumber(num) {
  return toStr.call(num) === '[object Number]';
}

/**
 * css
 * @param {Object} el
 * @param {Object} obj
 */


/**
 * 获取元素
 * @param {String|HTMLElement} node
 * @return {HTMLElement}
 */
function getElement(node) {
  if (typeof node === 'string') {
    return document.querySelector(node);
  }
  return node;
}

/**
 * 校验器
 */

var validators = [{
  /**
   * required validator
   * @param {Object} el
   * @param {Any} value
   * @param {Object} options
   * @param {String} options.errMsg
   * @param {String} options.itemName
   */
  name: 'required',
  callback: function callback(el, value, options) {
    var tagName = el.tagName;
    var validResult = [];

    if (value === '') {
      validResult.push(options.errMsg || '\u60A8\u8F93\u5165\u7684' + options.itemName + '\u4E0D\u80FD\u4E3A\u7A7A');
    } else if (tagName === 'SELECT' && !options.reg.test(value)) {
      validResult.push(options.errMsg || '\u8BF7\u9009\u62E9' + options.itemName);
    }

    return validResult;
  }
}, {
  /**
   * format validator
   * @param {Object} el
   * @param {Any} value
   * @param {Object} options
   * @param {Regex} options.reg
   * @param {String} options.itemName
   * @param {String} options.errMsg
   */
  name: 'format',
  callback: function callback(el, value, options) {
    var validResult = [];

    if (!options.reg.test(value)) {
      validResult.push(options.errMsg || '\u60A8\u8F93\u5165\u7684' + options.itemName + '\u683C\u5F0F\u6709\u8BEF');
    }

    return validResult;
  }
}, {
  /**
   * length validator
   * @param {Object} el
   * @param {Any} value
   * @param {Object} options
   * @param {Boolean} options.dByte
   * @param {Number} options.maxLen
   * @param {Number} options.minLen
   * @param {String} options.errMsg
   * @param {String} options.itemName
   */
  name: 'length',
  callback: function callback(el, value, options) {
    var validResult = [];
    var valLen = value.length;

    if (options.dByte) {
      valLen = value.replace(/[\u0391-\uFFE5]/g, '__').length;
    }

    if (options.maxLen && valLen > options.maxLen) {
      validResult.push(options.errMsg || '\u60A8\u8F93\u5165\u7684' + options.itemName + '\u8D85\u8FC7' + options.maxLen + '\u4E2A\u5B57\u7B26');
    } else if (options.minLen && valLen < options.minLen) {
      validResult.push(options.errMsg || '\u60A8\u8F93\u5165\u7684' + options.itemName + '\u4E0D\u8DB3' + options.minLen + '\u4E2A\u5B57\u7B26');
    }

    return validResult;
  }
}, {
  /**
   * range validator
   * @param {Object} el
   * @param {Any} value
   * @param {Object} options
   * @param {Number} options.minVal
   * @param {Number} options.maxVal
   * @param {String} options.errMsg
   */
  name: 'range',
  callback: function callback(el, value, options) {
    var validResult = [];

    if (options.minVal && value < options.minVal || options.maxVal && value > options.maxVal) {
      validResult.push(options.errMsg || '\u8BF7\u8F93\u5165' + options.minVal + '-' + options.maxVal + '\u7684\u6570\u5B57');
    }

    return validResult;
  }
}, {
  /**
   * compare validator
   * @param {Object} el
   * @param {Any} value
   * @param {Object} options
   * @param {Object|String} options.compareWith
   * @param {String} options.itemName
   * @param {String} options.errMsg
   */
  name: 'compare',
  callback: function callback(el, value, options) {
    var validResult = [];

    if (options.compareWith) {
      var targetNode = this.cacheNodes[options.compareWith] || getElement(options.compareWith);

      if (targetNode.value.trim() !== value) {
        validResult.push(options.errMsg || '\u4E24\u6B21\u8F93\u5165\u7684' + options.itemName + '\u4E0D\u4E00\u81F4');
      }
    }

    return validResult;
  }
}];

/**
 * 表单校验
 */

/**
 * const validObj = new Validate([{
 *  node: '',
 *  validators: [{
 *    name: 'required',
 *    disabled: true,
 *    options: {
 *      itemName: '',
 *      emptyMsg: ''
 *    }
 *  }],
 *  callback(el, validResult) {}
 * }]);
 * validObj.addValidator('required', (el, value, options) => {});
 * validObj.validate();
 */

var Validate = function () {
  function Validate() {
    var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    classCallCheck(this, Validate);

    if (!Array.isArray(rules)) {
      throw new Error('rules格式有误');
    }
    this.rules = extend(true, [], rules);
    this.validators = {};
    this.cacheNodes = {};
    this._init();
  }

  /**
   * 初始化
   */


  createClass(Validate, [{
    key: '_init',
    value: function _init() {
      var _this = this;

      validators.forEach(function (validator) {
        _this.addValidator(validator.name, validator.callback);
      });
    }

    /**
     * 添加校验器
     * @param {String} name 名称
     * @param {Function} validator 函数
     */

  }, {
    key: 'addValidator',
    value: function addValidator(name, validator) {
      if (this.validators[name]) {
        throw new Error('\u540D\u79F0\u4E3A' + name + '\u7684\u6821\u9A8C\u5668\u5DF2\u7ECF\u5B58\u5728');
      }
      this.validators[name] = validator;
    }

    /**
     * 获取元素
     * @param {String|HTMLElement} node
     * @return {HTMLElement}
     */

  }, {
    key: 'getRealNode',
    value: function getRealNode(node) {
      if (isString(node)) {
        if (this.cacheNodes[node]) {
          node = this.cacheNodes[node];
        } else {
          this.cacheNodes[node] = getElement(node);
          node = this.cacheNodes[node];
        }
      } else {
        node = getElement(node);
      }
      return node;
    }

    /**
     * 设置规则状态
     * @param {String|Number} node 字符串或者rule数组下标
     * @param {Boolean} 是否禁用，默认为false
     */

  }, {
    key: 'setRuleStatus',
    value: function setRuleStatus(node) {
      var isDisable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var rules = this.rules;

      if (isString(node)) {
        rules.forEach(function (rule) {
          if (rule.node === node) {
            // 规则设置为禁用
            rule.disabled = isDisable;
          }
        });
      } else if (isNumber(node)) {
        if (isObject(rules[node])) {
          // 规则设置为禁用
          rules[node].disabled = isDisable;
        }
      } else {
        throw new Error('找不到规则');
      }
    }

    /**
     * 校验
     */

  }, {
    key: 'validate',
    value: function validate() {
      var _this2 = this;

      var results = [];

      this.rules.forEach(function (rule) {
        if (rule.disabled) return;
        var node = _this2.getRealNode(rule.node);
        var validators$$1 = rule.validators || [];
        var val = node.value.trim();
        var validResult = [];

        each(validators$$1, function (i, obj) {
          var name = obj.name,
              options = obj.options;

          var validator = _this2.validators[name];

          if (validator) {
            validResult = validResult.concat(validator.call(_this2, node, val, options || {}) || []);
            return validResult.length === 0;
          }
          return true;
        });

        results = results.concat(validResult);
        rule.callback && rule.callback(node, validResult, val);
      });

      return results;
    }
  }]);
  return Validate;
}();

return Validate;

})));
