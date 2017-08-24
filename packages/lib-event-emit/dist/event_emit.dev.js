(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.EventEmit = factory());
}(this, (function () { 'use strict';

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

/**
 * lib
 */

var EventEmit = function () {
  function EventEmit() {
    classCallCheck(this, EventEmit);

    this.listeners = {};
  }

  /**
   * 自定义事件绑定
   * @param {String} name
   * @param {Function} fn
   * @param {Boolean} [one]
   */


  createClass(EventEmit, [{
    key: "on",
    value: function on(name, fn, one) {
      var ls = this.listeners[name];

      // 如果该eventName已经存在，则将该fn转换为数组
      if (!ls) {
        ls = this.listeners[name] = [];
      }
      ls.push(fn);
      if (one) {
        ls.once = true;
      }
    }

    /**
     * 是否有事件
     * @param {String} name
     */

  }, {
    key: "has",
    value: function has(name) {
      return this.listeners[name];
    }

    /**
     * 事件只执行一次
     * @param {String} name
     * @param {Function} fn
     */

  }, {
    key: "once",
    value: function once(name, fn) {
      this.on(name, fn, true);
    }

    /**
     * 触发事件
     * @param {String} name
     */

  }, {
    key: "emit",
    value: function emit(name) {
      var ls = this.listeners[name];

      if (!ls) {
        return;
      }

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      for (var i = 0, l = ls.length; i < l; i++) {
        ls[i].apply(this, args);
      }
      if (ls.once) {
        delete this.listeners[name];
      }
    }

    /**
     * 关闭指定的自定义事件
     * @param name
     */

  }, {
    key: "off",
    value: function off(name) {
      delete this.listeners[name];
    }

    /**
     * 关闭所有的自定义事件
     */

  }, {
    key: "offAll",
    value: function offAll() {
      this.listeners = {};
    }
  }]);
  return EventEmit;
}();

EventEmit.instance = new EventEmit();

return EventEmit;

})));
//# sourceMappingURL=event_emit.dev.js.map
