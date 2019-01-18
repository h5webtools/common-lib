(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.DxCaptcha = factory());
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

var defaultOptions = {
  isAuto: false,
  scriptUrl: 'https://cdn.dingxiang-inc.com/ctu-group/captcha-ui/index.js',
  captchaOptions: {}
};

var Captcha = function (_EventEmit) {
  inherits(Captcha, _EventEmit);

  function Captcha(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, Captcha);

    var _this = possibleConstructorReturn(this, (Captcha.__proto__ || Object.getPrototypeOf(Captcha)).call(this));

    _this.$el = document.querySelector(el);
    _this.options = extend({}, defaultOptions, options);
    _this.captchaOptions = _this.options.captchaOptions || {};
    _this.dxCaptcha = null;

    loadScript(_this.options.scriptUrl, function () {
      _this.init();
    }, function (e) {
      console.log('Error: ' + e.toString());
    });
    return _this;
  }

  createClass(Captcha, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      // 初始化验证码
      if (window._dx && typeof window._dx.Captcha === 'function') {
        if (!this.options.isAuto) Captcha.clear();

        this.dxCaptcha = window._dx.Captcha(this.$el, extend(true, {
          style: 'popup',
          customLanguage: {
            pass_by_server: '验证成功'
          }
        }, this.captchaOptions));

        this.dxCaptcha.on('verifySuccess', function (token) {
          _this2.successCallback(token);
        });

        if (this.options.isAuto) {
          this.dxCaptcha.on('passByServer', function (token) {
            setTimeout(function () {
              _this2.successCallback(token);
            }, 1000);
          });
        }
      }
    }
  }, {
    key: 'successCallback',
    value: function successCallback(token) {
      if (this.has('success')) {
        this.hide();
        this.emit('success', token);
        if (!this.options.isAuto) {
          Captcha.clear();
          this.reload();
        }
      }
    }
  }, {
    key: 'reload',
    value: function reload() {
      if (this.dxCaptcha) {
        this.dxCaptcha.reload();
      }
    }
  }, {
    key: 'show',
    value: function show(fn) {
      if (this.dxCaptcha) {
        if (typeof fn === 'function') {
          this.off('success');
          this.on('success', fn);
        }
        this.dxCaptcha.show();
      }
    }
  }, {
    key: 'hide',
    value: function hide() {
      if (this.dxCaptcha) {
        this.dxCaptcha.hide();
      }
    }
  }], [{
    key: 'clear',
    value: function clear() {
      if (window._dx && typeof window._dx.Captcha._clearVID === 'function') {
        // 这个貌似是私有方法，看demo里面用了
        window._dx.Captcha._clearVID();
      }
    }
  }]);
  return Captcha;
}(event_emit);

function loadScript(url, fnSuccess, fnFailed) {
  var oScript = document.createElement('script');
  if (typeof fnSuccess === 'function') {
    oScript.onload = fnSuccess;
  }
  if (typeof fnFailed === 'function') {
    oScript.onerror = fnFailed;
  }
  oScript.src = url;
  document.querySelector('head').appendChild(oScript);
}

return Captcha;

})));
//# sourceMappingURL=dx-captcha.dev.js.map
