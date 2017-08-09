(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ImgLazyload = factory());
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
 * lib
 */

var defaultOptions = {
  layer: false, // 是否弹层
  attr: 'data-lazy' // lazy属性
};

var ImgLazyload = function () {
  function ImgLazyload(wrapNode) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, ImgLazyload);

    if (!wrapNode) {
      throw new Error('wrapNode为必填项');
    }

    this.wrapNode = wrapNode;
    this.options = _extends({}, defaultOptions, options);
    this.loadTimer = null;
    this._init();
  }

  createClass(ImgLazyload, [{
    key: '_init',
    value: function _init() {
      var _this = this;

      var wh = window.innerHeight;
      var wrapNode = this.wrapNode;
      var options = this.options;
      var imgList = wrapNode.querySelectorAll('img[' + options.attr + ']');

      imgList = Array.prototype.slice.apply(imgList);
      if (!imgList.length) {
        return;
      }

      var ph = options.layer ? wrapNode.scrollTop : window.pageYOffset;
      // 过滤掉已经有src的img
      imgList = imgList.filter(function (img) {
        var isLazy = img.getAttribute(options.attr);
        if (isLazy) {
          img.setAttribute('top', img.getBoundingClientRect().top + ph);
        }
        return isLazy;
      });
      clearInterval(this.loadTimer);
      // 检测滚动条位置
      this.loadTimer = setInterval(function () {
        ph = options.layer ? wrapNode.scrollTop : window.pageYOffset;
        if (!imgList.length) {
          clearInterval(_this.loadTimer);
          return;
        }
        imgList = imgList.filter(function (img) {
          var top = img.getAttribute('top');

          if (top != null && ph + wh > top) {
            img.src = img.getAttribute(options.attr);
            img.removeAttribute(options.attr);
            return false;
          }
          return true;
        });
      }, 200);
    }
  }, {
    key: 'stop',
    value: function stop() {
      clearInterval(this.loadTimer);
    }
  }]);
  return ImgLazyload;
}();

return ImgLazyload;

})));
//# sourceMappingURL=img_lazyload.dev.js.map
