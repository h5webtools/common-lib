(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Turntable = factory());
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
  startBtn: null, // 开始按钮
  rollElement: null, // 转动元素
  rewardData: {}, // 奖品数据，key-value { '1': '90' }
  maxCircles: 8, // 最大转动圈数
  minCircles: 5, // 最小转动圈数
  duration: 3, // 间隔
  resultCreator: function resultCreator() {},
  // 启动转动
  end: function end() {} // 转动结束

};

var Turntable = function () {
  function Turntable() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Turntable);

    this.options = _extends({}, defaultOptions, options);
    this.status = false;
    this._init();
  }

  createClass(Turntable, [{
    key: '_init',
    value: function _init() {
      var _this = this;

      var _options = this.options,
          startBtn = _options.startBtn,
          rollElement = _options.rollElement,
          resultCreator = _options.resultCreator,
          end = _options.end;


      startBtn.addEventListener('click', function () {
        if (_this.status) return;
        resultCreator(function (result) {
          _this.roll(result);
        });
      }, false);

      rollElement.addEventListener('webkitTransitionEnd', function () {
        var priceDeg = _this.priceDeg;

        rollElement.style.cssText = '\n        transform: rotateZ(' + priceDeg + 'deg);\n        -webkit-transform: rotateZ(' + priceDeg + 'deg)\n      ';
        _this.status = false;
        end(_this.result);
      }, false);
    }
  }, {
    key: '_randCircles',
    value: function _randCircles() {
      var _options2 = this.options,
          maxCircles = _options2.maxCircles,
          minCircles = _options2.minCircles;

      return Math.floor(Math.random() * (maxCircles - minCircles + 1) + minCircles);
    }
  }, {
    key: 'roll',
    value: function roll(result) {
      if (typeof result === 'undefined') {
        throw new Error('请传入奖品key');
      }

      var _options3 = this.options,
          rewardData = _options3.rewardData,
          duration = _options3.duration,
          rollElement = _options3.rollElement;

      var priceDeg = this.priceDeg = Number(rewardData[result].deg);
      var targetDeg = this._randCircles() * 360 + priceDeg;

      this.result = rewardData[result];
      this.status = true;
      rollElement.style.cssText = '\n      transition: all ' + duration + 's ease;\n      -webkit-transition: all ' + duration + 's ease;\n      transform: rotateZ(' + targetDeg + 'deg);\n      -webkit-transform: rotateZ(' + targetDeg + 'deg)\n    ';
    }
  }]);
  return Turntable;
}();

return Turntable;

})));
//# sourceMappingURL=turntable.dev.js.map
