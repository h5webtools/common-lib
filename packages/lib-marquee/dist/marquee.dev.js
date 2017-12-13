(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Marquee = factory());
}(this, (function () { 'use strict';

/**
 * util
 */



// 绑定事件方法
function bind(element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + type, handler);
  } else {
    element["on" + type] = handler;
  }
}

// 修正超出边界的滚动
function fixTarget(dir, target, max) {
  // left or up, 当元素offset=最大滚动值时将offset变为0
  if (dir < 0 && Math.abs(target) >= max) {
    return 0;
  }

  // right or down，当元素offset=0时将offset变为最大滚动值
  if (dir > 0 && target >= 0) {
    return -max;
  }
  return target;
}

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
 * 跑马灯
 */

var defaultOptions = {
  step: 0, // 每次滚动的步长(px)
  stepInterval: 400, // 滚动效果执行时间(ms)
  interval: 3000, // 每次滚动间隔时间(ms)
  dir: 'left', // 滚动方向，up、down、left、right
  autoPlay: true, // 是否自动滚动
  hoverPause: true // 是否在鼠标滑过时暂停滚动
};

var Marquee = function () {
  function Marquee(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, Marquee);

    // 要滚动的元素
    this.elem = el;
    // 选项
    this.options = _extends({}, defaultOptions, options);
    // 保存暂停状态
    this.pausing = false;
    // 滚动计时器
    this.timerStep = null;
    // 滚动间隔计时器
    this.timer = null;
    this.init();
  }

  createClass(Marquee, [{
    key: 'init',
    value: function init() {
      // 如果元素不存在则直接返回
      if (!this.elem) return false;
      // 复制滚动元素内容并填充
      this.elem.innerHTML += this.elem.innerHTML;
      this.loadStyle();
      this.options.hoverPause && this.bindEvents();
      this.options.autoPlay && this.startScroll();
    }

    // 初始化滚动元素的样式

  }, {
    key: 'loadStyle',
    value: function loadStyle() {
      var childrens = this.elem.children;
      var dir = this.options.dir;

      // 如果是左右滚动就给滚动元素加上宽度
      if (dir === 'left' || dir === 'right') {
        this.elem.style.width = childrens[0].offsetWidth * childrens.length + 'px';
      }

      // 如果是向右滚动，初始时将滚动元素的left设置为负的自身宽度的一半
      if (dir === 'right' && this.elem.offsetLeft === 0) {
        this.elem.style.left = -this.elem.offsetWidth / 2 + 'px';
      }

      // 如果是向左滚动，初始时将滚动元素的left设置为0
      if (dir === 'left' && this.elem.offsetLeft === -this.elem.offsetWidth / 2) {
        this.elem.style.left = 0;
      }

      // 如果是向下滚动，初始时将滚动元素的top设置为负的自向高度的一半
      if (dir === 'down' && this.elem.offsetTop === 0) {
        this.elem.style.top = -this.elem.offsetHeight / 2 + 'px';
      }

      // 如果是向上滚动，初始时将滚动元素的top设置为0
      if (dir === 'up' && this.elem.offsetTop === -this.elem.offsetHeight / 2) {
        this.elem.style.top = 0;
      }
    }

    // 绑定控制元素的事件

  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      // 鼠标移入父级元素时暂停
      bind(this.elem.parentNode, 'mouseover', function () {
        _this.stop();
        _this.pausing = true;
      });

      // 鼠标移出父级元素时重新开始滚动
      bind(this.elem.parentNode, 'mouseout', function () {
        _this.pausing = false;
        _this.options.autoPlay && _this.startScroll();
      });
    }

    // 停止滚动

  }, {
    key: 'stop',
    value: function stop() {
      clearInterval(this.timer);
    }

    // 执行滚动效果

  }, {
    key: 'doScroll',
    value: function doScroll() {
      var _this2 = this;

      var style = '';
      var offset = '';
      var target = 0;
      var step = 0;
      var elemSize = 0;

      if (this.options.dir === 'left' || this.options.dir === 'right') {
        // element.style[ 'left' | 'top' ]
        style = 'left';
        offset = 'offsetLeft';
        elemSize = this.elem.offsetWidth / 2;
      } else {
        // element[ offset[Left|Top] ];
        style = 'top';
        offset = 'offsetTop';
        elemSize = this.elem.offsetHeight / 2;
      }

      step = this.options.dir === 'left' || this.options.dir === 'up' ? -this.options.step : this.options.step;
      if (this.options.stepInterval === 0) {
        // 滚动效果执行时间为0时，进入无缝滚动模式
        if (elemSize - Math.abs(this.elem[offset]) < Math.abs(step)) {
          step = step / Math.abs(step) * (elemSize - Math.abs(this.elem[offset]));
        }
        target = this.elem[offset] + step;
        target = fixTarget(step, this.elem[offset] + step, elemSize);
        this.elem.style[style] = target + 'px';
      } else {
        if (this.timerStep != null) return;
        // 先停止掉this.timer，在滚动执行完过后再开启
        this.stop();
        // 将step按stepInterval分割
        var seed = 30 / this.options.stepInterval * step;
        seed = seed < 0 ? Math.ceil(seed) : Math.floor(seed);
        this.timerStep = setInterval(function () {
          seed = seed > 0 ? Math.min(seed, step) : Math.max(seed, step);
          target = fixTarget(seed, _this2.elem[offset] + seed, elemSize);
          _this2.elem.style[style] = target + 'px';
          step -= seed;
          if (step === 0) {
            clearInterval(_this2.timerStep);
            _this2.timerStep = null;
            if (_this2.options.autoPlay && !_this2.pausing) {
              _this2.startScroll();
            }
          }
        }, 30);
      }
    }

    // 改变方向

  }, {
    key: 'changeDir',
    value: function changeDir(dir) {
      this.options.dir = dir;
      this.loadStyle();
      this.doScroll();
    }

    // 开始滚动

  }, {
    key: 'startScroll',
    value: function startScroll() {
      var _this3 = this;

      this.timer = setInterval(function () {
        _this3.doScroll();
      }, this.options.interval);
    }
  }]);
  return Marquee;
}();

return Marquee;

})));
//# sourceMappingURL=marquee.dev.js.map
