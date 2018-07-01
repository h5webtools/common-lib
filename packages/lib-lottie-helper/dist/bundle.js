(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.LottieHelper = factory());
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

var LottieHelper = function () {
  function LottieHelper(options) {
    classCallCheck(this, LottieHelper);

    this.options = options || {};
    this.init();
  }

  createClass(LottieHelper, [{
    key: 'init',
    value: function init() {
      var _options = this.options,
          data = _options.data,
          assetsMap = _options.assetsMap;

      data.assets.forEach(function (i) {
        i.u = '';
        i.p = assetsMap[i.id];
      });
    }
  }, {
    key: 'getAnimData',
    value: function getAnimData() {
      return this.options.data;
    }
  }]);
  return LottieHelper;
}();

return LottieHelper;

})));
