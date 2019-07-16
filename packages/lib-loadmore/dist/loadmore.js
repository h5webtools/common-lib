(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.LoadMore = factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var event_emit = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
    module.exports = factory();
  })(commonjsGlobal, function () {
    'use strict';

    var classCallCheck = function classCallCheck(instance, Constructor) {
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
  });
});

var util = {
  throttle: function throttle(fn) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;

    var delayFlag = true;
    var firstInvoke = true;
    return function _throttle(e) {
      if (delayFlag) {
        delayFlag = false;
        setTimeout(function () {
          delayFlag = true;
          fn(e);
        }, delay);
        if (firstInvoke) {
          fn(e);
          firstInvoke = false;
        }
      }
    };
  },


  // get nearest scroll element
  getScrollEventTarget: function getScrollEventTarget(element) {
    var rootParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

    var node = element;
    // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
    while (node && node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === 1 && node !== rootParent) {
      var _getComputedStyle = this.getComputedStyle(node),
          overflowY = _getComputedStyle.overflowY;

      if (overflowY === 'scroll' || overflowY === 'auto') {
        return node;
      }
      node = node.parentNode;
    }
    return rootParent;
  },
  getScrollTop: function getScrollTop(element) {
    return 'scrollTop' in element ? element.scrollTop : element.pageYOffset;
  },
  setScrollTop: function setScrollTop(element, value) {
    'scrollTop' in element ? element.scrollTop = value : element.scrollTo(element.scrollX, value);
  },


  // get distance from element top to page top
  getElementTop: function getElementTop(element) {
    return (element === window ? 0 : element.getBoundingClientRect().top) + this.getScrollTop(window);
  },
  getVisibleHeight: function getVisibleHeight(element) {
    return element === window ? element.innerHeight : element.getBoundingClientRect().height;
  },


  getComputedStyle: document.defaultView.getComputedStyle.bind(document.defaultView)
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



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * loadmore
 */

var defaultOptions = {
  showElement: true, // 是否显示loading
  loadingText: '加载中...', // 加载中文案
  loadedText: '- 已加载全部数据 -', // 加载结束文案
  offset: 60 // 偏移
};

/**
  const loadMore = LoadMore.create(el);
  // 属性
  loadMore.disabled = true; // false
  loadMore.end = true; // 结束
  // 事件
  loadMore.on('scroll:bottom', () => {});
  loadMore.on('scroll:top', () => {});
  loadMore.on('scroll:end', () => {});
 */

var LoadMore = function (_EventEmit) {
  inherits(LoadMore, _EventEmit);

  function LoadMore(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, LoadMore);

    var _this = possibleConstructorReturn(this, (LoadMore.__proto__ || Object.getPrototypeOf(LoadMore)).call(this));

    _this.el = el;
    _this.__binded = false;
    _this.__disabled = false; // 禁止触发
    _this.__end = false; // 结束
    _this.options = _extends({}, defaultOptions, options);
    _this.$loadingText = null;
    return _this;
  }

  createClass(LoadMore, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      if (this.options.showElement) {
        this.injectElement();
        this.on('scroll:end', function () {
          _this2.$loadingText.innerText = _this2.options.loadedText;
        });
      }
      this.bindEvent();
    }
  }, {
    key: 'injectElement',
    value: function injectElement() {
      var $loading = document.createElement('div');
      $loading.classList.add('md-loading');
      var $loadingText = document.createElement('div');
      $loadingText.classList.add('md-loading__text');

      var $loadingTextSpan = document.createElement('span');
      $loadingTextSpan.innerText = this.options.loadingText;

      $loadingText.appendChild($loadingTextSpan);
      $loading.appendChild($loadingText);

      this.$loadingText = $loadingText;
      this.el.appendChild($loading);
    }
  }, {
    key: 'bindEvent',
    value: function bindEvent() {
      if (this.__binded) return;
      this.__binded = true;

      this.scrollEventListener = this.handleScrollEvent.bind(this);
      this.scrollEventTarget = util.getScrollEventTarget(this.el);

      Object.defineProperty(this, 'disabled', {
        enumerable: true,
        configurable: false,
        get: function get$$1() {
          return this.__disabled;
        },
        set: function set$$1(value) {
          this.__disabled = value;
          this.scrollEventListener();
        }
      });

      Object.defineProperty(this, 'end', {
        enumerable: true,
        configurable: false,
        get: function get$$1() {
          return this.__end;
        },
        set: function set$$1(value) {
          this.__end = value;
          if (value) {
            this.emit('scroll:end');
            this.destroy();
          }
        }
      });

      this.throttleScrollEventListener = util.throttle(this.scrollEventListener);
      this.scrollEventTarget.addEventListener('scroll', this.throttleScrollEventListener, false);
      this.scrollEventListener();
    }
  }, {
    key: 'handleScrollEvent',
    value: function handleScrollEvent() {
      // 已被禁止的滚动处理
      if (this.disabled || this.end) return;
      var element = this.el;
      var scrollEventTarget = this.scrollEventTarget;


      var targetScrollTop = util.getScrollTop(scrollEventTarget);
      var targetVisibleHeight = util.getVisibleHeight(scrollEventTarget);
      // 滚动元素可视区域下边沿到滚动元素元素最顶上 距离
      var targetBottom = targetScrollTop + targetVisibleHeight;

      // 如果元素没有高度，直接返回
      if (!targetVisibleHeight) return;

      // 是否滚动到底部
      var scrollToBottom = false;
      if (element === scrollEventTarget) {
        scrollToBottom = scrollEventTarget.scrollHeight - targetBottom < this.options.offset;
      } else {
        var elementBottom = util.getElementTop(element) - util.getElementTop(scrollEventTarget) + util.getVisibleHeight(element);
        scrollToBottom = elementBottom - targetVisibleHeight < this.options.offset;
      }
      if (scrollToBottom) {
        this.emit('scroll:bottom', { target: scrollEventTarget, top: targetScrollTop });
      }

      // 是否滚动到顶部
      var scrollToTop = false;
      if (element === scrollEventTarget) {
        scrollToTop = targetScrollTop < this.options.offset;
      } else {
        var elementTop = util.getElementTop(element) - util.getElementTop(scrollEventTarget);
        scrollToTop = elementTop + this.options.offset > 0;
      }
      if (scrollToTop) {
        this.emit('scroll:top', { target: scrollEventTarget, top: targetScrollTop });
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.scrollEventTarget.removeEventListener('scroll', this.throttleScrollEventListener, false);
    }
  }], [{
    key: 'create',
    value: function create(el, options) {
      return new LoadMore(el, options);
    }
  }]);
  return LoadMore;
}(event_emit);

return LoadMore;

})));
