(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.NavBar = factory());
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

var detect = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
    module.exports = factory();
  })(commonjsGlobal, function () {
    'use strict';

    /**
     * 环境
     */

    var env = null;

    function detect() {
      var regain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var ua = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (!regain && env) return env;

      env = {};
      ua = ua || window.navigator.userAgent;

      var ualc = ua.toLowerCase();

      /* eslint-disable no-useless-escape */
      var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
      var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
      var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
      var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
      var jyb = ua.match(/jiayoubao[^\d]*(\d+\.\d+\.\d+)/);
      var inJybApp = /jiayoubao/.test(ualc); // 加油宝app
      var inWX = /micromessenger/.test(ualc); // 微信
      var inQQ = /qq\//.test(ualc); // QQ

      env.weixin = inWX;
      env.qq = inQQ;

      // jyb
      if (inJybApp) {
        env.jyb = true;
        env.version = jyb ? jyb[1] : null;
      }

      // android
      if (android) {
        env.android = true;
        env.version = android[2];
      }

      // ios
      if (iphone && !ipod) {
        env.ios = env.iphone = true;
        env.version = iphone[2].replace(/_/g, '.');
      }

      if (ipad) {
        env.ios = env.ipad = true;
        env.version = ipad[2].replace(/_/g, '.');
      }

      if (ipod) {
        env.ios = env.ipod = true;
        env.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
      }

      return env;
    }

    detect.env = detect();

    return detect;
  });
});

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

var currentEnv$1 = detect.env;

// 是否可以全屏
function canFullScreen() {
  // 加油宝客户端和version >= 6.1.5才支持全屏
  if (currentEnv$1.jyb && currentEnv$1.version) {
    return compareVersion(currentEnv$1.version, '6.1.5') !== -1;
  }
  return false;
}

// 简单对比客户端版本，大于：1，等于：0，小于：-1
function compareVersion(v1, v2) {
  v1 = Number(v1.replace(/\./g, ''));
  v2 = Number(v2.replace(/\./g, ''));
  if (v1 > v2) return 1;
  if (v1 === v2) return 0;
  if (v1 < v2) return -1;
}

function throttle(fn, wait) {
  var _this = this;

  var timeout = null;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        fn.apply(_this, args);
      }, wait);
    }
  };
}

function addCssText(cssText) {
  var styleEl = document.createElement('style');
  document.getElementsByTagName('head')[0].appendChild(styleEl);
  if (styleEl.styleSheet) {
    if (!styleEl.styleSheet.disabled) {
      styleEl.styleSheet.cssText = cssText;
    }
  } else {
    try {
      styleEl.innerHTML = cssText;
    } catch (e) {
      styleEl.innerText = cssText;
    }
  }
}

function wrapperElement() {
  var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';

  var element = document.createElement(el);
  element.innerHTML = html;
  return element.children[0];
}

function isIPhoneX() {
  if (!currentEnv$1.ios) return;
  // X XS, XS Max, XR
  var deviceInfo = [
  // iPhone X/iPhone XS
  {
    devicePixelRatio: 3,
    width: 375,
    height: 812
  },
  // iPhone XS Max
  {
    devicePixelRatio: 3,
    width: 414,
    height: 896
  },
  // iPhone XR
  {
    devicePixelRatio: 2,
    width: 414,
    height: 896
  }];
  var _window = window,
      devicePixelRatio = _window.devicePixelRatio,
      screen = _window.screen;
  var width = screen.width,
      height = screen.height;

  for (var i = 0, l = deviceInfo.length; i < l; i++) {
    var current = deviceInfo[i];
    if (current.devicePixelRatio === devicePixelRatio && current.width === width && current.height === height) {
      return true;
    }
  }
  return false;
}

function createPageUrl(url) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var queryStr = Object.keys(query).map(function (k) {
    return k + '=' + encodeURIComponent(query[k]);
  }).join('&');
  if (!queryStr) return url;
  return url + (url.indexOf('?') !== -1 ? '&' + queryStr : '?' + queryStr);
}

var util = Object.freeze({
	canFullScreen: canFullScreen,
	compareVersion: compareVersion,
	throttle: throttle,
	addCssText: addCssText,
	wrapperElement: wrapperElement,
	isIPhoneX: isIPhoneX,
	createPageUrl: createPageUrl
});

function anonymous(it
/*``*/) {
  var out = '<div class="' + it.wrapCls + '"> <div class="md-status-bar' + (it.isIPhoneX ? ' md-status-bar__iphonex' : '') + '"></div> <div class="md-navbar md-navbar-light"> <div class="md-navbar-left"> <a href="jtjr://close" class="md-navbar-left-icon"></a> </div> <div class="md-navbar-title">' + (it.title || '') + '</div> <div class="md-navbar-right"> ';if (it.link.title) {
    out += ' <a class="md-navbar-right-link" href="' + (it.url || 'javascript:;') + '">' + it.link.title + '</a> ';
  }out += ' </div> </div></div>';return out;
}

/* eslint max-len:0 */
var cssText = "\n  .md-navbar-wrap {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    z-index: 99;\n    transition: all .3s ease-in;\n  }\n\n  .md-navbar-wrap .md-navbar {\n    display: flex;\n    align-items: center;\n    height: .88rem;\n  }\n\n  .md-navbar-wrap .md-status-bar {\n    width: 100%;\n    height: 20px;\n  }\n\n  .md-navbar-wrap .md-status-bar__iphonex {\n    height: 44px;\n  }\n\n  .md-navbar-wrap .md-navbar-light {\n\n  }\n\n  .md-navbar-wrap .md-navbar-left {\n    flex: 1;\n    display: flex;\n    align-items: center;\n    margin-left: .3rem;\n  }\n\n  .md-navbar-wrap .md-navbar-left-icon {\n    display: inline-block;\n    width: .18rem;\n    height: .3rem;\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAeCAYAAAAhDE4sAAAAAXNSR0IArs4c6QAAAINJREFUSA1jYCAT/P//nwmEYdoZYQxSaKgB86F6EhkZGf+Roh+sFuqShUAaBkBsuMuIMhCkAYiRDYEZ1k2UASBFeAx5CJRTJMqgUUMwg2k0TAZzmADdRlpmw/QMqghVohtm5KhhxJc9o2EGTC1gMHjDjPjqCE9sguo5poGrstFcBi89AKU14Oo0Ck4xAAAAAElFTkSuQmCC);\n    background-size: 100%;\n    background-repeat: no-repeat;\n  }\n\n  .md-navbar-wrap .md-navbar-title {\n    flex: 2;\n    justify-content: center;\n    font-family: PingFangSC-Semibold;\n    font-size: .36rem;\n    color: #fff;\n    text-align: center;\n  }\n\n  .md-navbar-wrap .md-navbar-right {\n    flex: 1;\n    display: flex;\n    justify-content: flex-end;\n    margin-right: .3rem;\n  }\n\n  .md-navbar-wrap .md-navbar-right-link {\n    font-size: .3rem;\n    color: #fff;\n    line-height: .34rem;\n    text-decoration: none;\n  }\n";

/**
 * 通用插件
 */

var commonPlugin = {
  defaultOptions: {
    addCssText: function addCssText() /* ctx */{},

    navbarBgCls: 'navbar-bg-color'
  },
  plugin: function plugin(options) {
    var navbarBgCls = options.navbarBgCls,
        addCssText = options.addCssText;


    this.on('rendered', function (ctx) {
      if (typeof addCssText === 'function') addCssText(ctx);
    });

    this.on('scrollTop', function (ctx) {
      ctx.$el.classList.remove(navbarBgCls);
    });
    this.on('scroll', function (ctx) {
      if (!ctx.$el.classList.contains(navbarBgCls)) {
        ctx.$el.classList.add(navbarBgCls);
      }
    });
    this.render();
  }
};

/**
 * 页面导航组件
 */

var currentEnv = detect.env;
var defaultOptions = {
  el: document.body,
  title: '',
  wrapCls: 'md-navbar-wrap',
  link: {
    title: '',
    url: '',
    query: {}
  }
};

var NavBar = function (_EventEmit) {
  inherits(NavBar, _EventEmit);

  function NavBar(options) {
    classCallCheck(this, NavBar);

    var _this = possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this));

    _this.$options = extend(true, {}, defaultOptions, options);
    _this.$parentEl = _this.$options.el;
    if (typeof _this.$parentEl === 'string') {
      _this.$parentEl = document.querySelector(_this.$parentEl);
    }

    _this.$el = null;
    _this.util = util;
    _this.rect = {};
    _this.rendered = false;
    _this.plugins = {};
    if (_this.canFullScreen()) addCssText(cssText);
    // 注册通用插件
    _this.registerWidget('common', commonPlugin);
    return _this;
  }

  createClass(NavBar, [{
    key: 'canFullScreen',
    value: function canFullScreen$$1() {
      return this.util.canFullScreen();
    }
  }, {
    key: 'registerWidget',
    value: function registerWidget(k, plugin) {
      if ({}.hasOwnProperty.call(this.plugins, k)) throw new Error(k + '\u5DF2\u6CE8\u518C');
      this.plugins[k] = plugin;
    }
  }, {
    key: 'bindEvent',
    value: function bindEvent() {
      var handler = throttle(this.scrollHandler.bind(this), 60);
      window.addEventListener('scroll', handler);
      if (currentEnv.ios) window.addEventListener('touchmove', this.scrollHandler.bind(this));
    }
  }, {
    key: 'scrollHandler',
    value: function scrollHandler() {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop === 0) {
        this.emit('scrollTop', this);
      } else {
        this.emit('scroll', this);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.rendered || !this.canFullScreen()) return false;
      if (currentEnv.jyb && this.$options.link.url) {
        this.$options.link.url = createPageUrl('jtjr://web?url=' + encodeURIComponent(this.$options.link.url) + '&fullscreen=true', this.$options.link.query);
      }

      var el = wrapperElement(anonymous(extend(true, {
        isIPhoneX: isIPhoneX()
      }, this.$options)));
      this.$parentEl.appendChild(el);

      this.$el = el;
      this.rect = el.getBoundingClientRect();
      this.rendered = true;
      // 绑定事件
      this.bindEvent();
      this.emit('rendered', this);
    }
  }, {
    key: 'callPlugin',
    value: function callPlugin(name, options) {
      var pluginLogic = this.plugins[name];
      if (!pluginLogic) return;
      pluginLogic.plugin.call(this, extend(true, {}, pluginLogic.defaultOptions, options));
    }
  }], [{
    key: 'create',
    value: function create(options) {
      return new NavBar(options);
    }
  }]);
  return NavBar;
}(event_emit);

return NavBar;

})));
//# sourceMappingURL=navbar.dev.js.map
