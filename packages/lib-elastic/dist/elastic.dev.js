(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Elastic = factory());
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

function noop() {}

var defaultOptions = {
  minDistance: 100, // 最小滑动距离
  releaseBack: true, // 手放开后是否回弹
  direct: 'up', // 默认的手指滑动方向
  stopDocMove: true, // 手指滑动时是否禁止屏幕滑动
  initValue: 0, // 滑动元素初始所在的位置
  condition: function condition() {
    return true;
  },
  // 事件触发条件，在touchstart的时候会调用该方法进行判断，返回true则进行下一项
  onRelease: noop, // 手指放开后的回调函数
  onRecovery: noop // 恢复原状时的回调函数
};

var Elastic = function () {
  function Elastic(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, Elastic);

    if (!element) {
      throw new Error('element为必填项');
    }

    this.element = element;
    this.options = _extends({}, defaultOptions, options);
    this.init();
  }

  createClass(Elastic, [{
    key: 'init',
    value: function init() {
      this.position = {};
      // 先释放事件
      this._releaseEvent();
      this._bindEvent();
    }
  }, {
    key: '_bindEvent',
    value: function _bindEvent() {
      this.element.addEventListener('touchstart', this._tstart.bind(this), false);
    }
  }, {
    key: '_tstart',
    value: function _tstart(e) {
      var options = this.options;

      // 不满足条件
      if (!options.condition()) {
        return;
      }

      var evt = e.changedTouches[0];
      this.ignoreTouch = false;
      this.position.sx = evt.pageX;
      this.position.sy = evt.pageY;

      this.element.addEventListener('touchmove', this._tmove.bind(this), false);
      this.element.addEventListener('touchend', this._tend.bind(this), false);
      if (options.stopDocMove) {
        document.addEventListener('touchmove', stopDocMove, false);
      }
    }
  }, {
    key: '_tmove',
    value: function _tmove(e) {
      var options = this.options;
      var evt = e.changedTouches[0];

      this.position.mx = evt.pageX;
      this.position.my = evt.pageY;

      var diffX = this.position.mx - this.position.sx;
      var diffY = this.position.my - this.position.sy;

      this.ignoreTouch = false;
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          this.direct = 'right';
        } else if (diffX < 0) {
          this.direct = 'left';
        }
      } else if (Math.abs(diffX) < Math.abs(diffY)) {
        if (diffY > 0) {
          this.direct = 'down';
        } else if (diffY < 0) {
          this.direct = 'up';
        }
      } else {
        this.ignoreTouch = true;
      }
      this.diffY = this.position.my - this.position.sy;
      if (this.direct === options.direct) {
        this.fingerFollow();
      } else if (options.stopDocMove) {
        document.removeEventListener('touchmove', stopDocMove, false);
      }
    }
  }, {
    key: '_tend',
    value: function _tend(e) {
      var options = this.options;
      var evt = e.changedTouches[0];

      this.position.ey = evt.pageY;
      // 移动距离过小
      if (Math.abs(this.position.ey - this.position.sy) < options.minDistance) {
        this._releaseEvent();
        this.recoverStatus();
        return;
      }
      // 手指放开后回弹回去
      if (options.releaseBack) {
        this.recoverStatus();
      }
      this._releaseEvent();
      if (this.direct === options.direct) {
        options.onRelease.call(this);
      }

      this.element.style.webkitTransform = '';
      this.element.style.webkitTransitionDuration = '';
    }
  }, {
    key: '_releaseEvent',
    value: function _releaseEvent() {
      this.element.removeEventListener('touchmove', this._tmove.bind(this), false);
      this.element.removeEventListener('touchend', this._tend.bind(this), false);
      document.removeEventListener('touchmove', stopDocMove, false);
    }
  }, {
    key: 'destroyEvent',
    value: function destroyEvent() {
      this.element.removeEventListener('touchstart', this._tstart.bind(this), false);
      this._releaseEvent();
    }
  }, {
    key: 'fingerFollow',
    value: function fingerFollow() {
      // 移动容器元素实现动画
      this.element.style.webkitTransform = 'translate3d(0, ' + (this.options.initValue + this.diffY) + 'px, 0)';
      this.element.style.webkitTransitionDuration = '0ms';
    }
  }, {
    key: 'recoverStatus',
    value: function recoverStatus() {
      var options = this.options;
      var element = this.element;

      element.addEventListener('webkitTransitionEnd', transitionEndHandler, false);

      // 移动容器元素实现动画
      element.style.webkitTransform = 'translate3d(0, 0, 0)';
      element.style.webkitTransitionDuration = '300ms';

      function transitionEndHandler(e) {
        e.stopPropagation();
        options.onRecovery();
        element.removeEventListener('webkitTransitionEnd', transitionEndHandler, false);
      }
    }
  }]);
  return Elastic;
}();

function stopDocMove(e) {
  e.preventDefault();
}

return Elastic;

})));
//# sourceMappingURL=elastic.dev.js.map
