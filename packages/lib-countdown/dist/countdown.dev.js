(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.CountDown = factory());
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







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * 倒计时
 */

var defaultOptions = {
  time: 0, // 时间
  duration: 1000, // 间隔
  processCallback: function processCallback() /* time */{},
  // 倒计时回调
  endCallback: function endCallback() {} // 结束回调

};

var CountDown = function () {
  function CountDown() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, CountDown);

    this.options = _extends({}, defaultOptions, options);
    this.timer = null;
    this._init();
  }

  createClass(CountDown, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      var options = this.options;
      var duration = options.duration,
          processCallback = options.processCallback,
          endCallback = options.endCallback;
      var time = options.time;


      this.timer = setInterval(function () {
        processCallback && processCallback(time);
        time--;
        if (time === -1) {
          clearInterval(_this.timer);
          _this.timer = null;
          endCallback && endCallback();
        }
      }, duration);
    }
  }]);
  return CountDown;
}();

return CountDown;

})));
//# sourceMappingURL=countdown.dev.js.map
