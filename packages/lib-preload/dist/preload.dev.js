(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Preload = factory());
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
 * preload
 */

function noop() {}

var Preload = function () {
  function Preload() {
    var lists = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var cb = arguments[1];
    classCallCheck(this, Preload);

    if (!Array.isArray(lists)) {
      throw new Error('lists必须为数组类型');
    }

    this.lists = lists;
    this.len = lists.length;
    this.cursor = 0;
    this.cb = cb || noop;
  }

  createClass(Preload, [{
    key: 'start',
    value: function start() {
      var _this = this;

      this.lists.forEach(function (item) {
        _this.loadImg(item);
      });
    }
  }, {
    key: 'reload',
    value: function reload() {
      this.cursor = 0;
      this.start();
    }
  }, {
    key: 'loadImg',
    value: function loadImg(img) {
      var oImg = new Image();

      oImg.src = img;
      oImg.onload = this.onLoad.bind(this);
      oImg.onerror = this.onLoad.bind(this);
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.cursor++;
      if (this.cursor === this.len) {
        this.cb();
      }
    }
  }]);
  return Preload;
}();

return Preload;

})));
//# sourceMappingURL=preload.dev.js.map
