(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.SmsCode = factory());
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

var dxCaptcha = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
    module.exports = factory();
  })(commonjsGlobal, function () {
    'use strict';

    var commonjsGlobal$$1 = typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule$$1(fn, module) {
      return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
    };

    var classCallCheck$$1 = function classCallCheck$$1(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    var createClass$$1 = function () {
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

    var inherits$$1 = function inherits$$1(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
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

    var possibleConstructorReturn$$1 = function possibleConstructorReturn$$1(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
    };

    var extend = createCommonjsModule$$1(function (module, exports) {
      !function (o, t) {
        module.exports = t();
      }(commonjsGlobal$$1, function () {
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
            i = "function" == typeof Symbol && "symbol" == _typeof$$1(Symbol.iterator) ? function (o) {
          return typeof o === 'undefined' ? 'undefined' : _typeof$$1(o);
        } : function (o) {
          return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o === 'undefined' ? 'undefined' : _typeof$$1(o);
        };return r;
      });
    });

    var event_emit = createCommonjsModule$$1(function (module, exports) {
      (function (global, factory) {
        module.exports = factory();
      })(commonjsGlobal$$1, function () {
        'use strict';

        var classCallCheck$$1 = function classCallCheck$$1(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        };

        var createClass$$1 = function () {
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
            classCallCheck$$1(this, EventEmit);

            this.listeners = {};
          }

          /**
           * 自定义事件绑定
           * @param {String} name
           * @param {Function} fn
           * @param {Boolean} [one]
           */

          createClass$$1(EventEmit, [{
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
      inherits$$1(Captcha, _EventEmit);

      function Captcha(el) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        classCallCheck$$1(this, Captcha);

        var _this = possibleConstructorReturn$$1(this, (Captcha.__proto__ || Object.getPrototypeOf(Captcha)).call(this));

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

      createClass$$1(Captcha, [{
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
  });
});

var tips = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
    module.exports = factory();
  })(commonjsGlobal, function () {
    'use strict';

    var createElement = function () {
      var container = document.createElement('div');
      return function (html) {
        container.innerHTML = html;
        return container.children[0];
      };
    }();

    var isAndroid = function isAndroid() {
      return (/android/i.test(window.navigator ? window.navigator.userAgent : '')
      );
    };

    function anonymous(it
    /**/) {
      var out = '<div id="bubble"> <div class="mod-spinner"> <div class="spinner-wrap"><span class="' + it.icon + '"></span><p class="text" id="bubble-text">' + it.text + '</p> </div> </div></div>';return out;
    }

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

    var Tips = function () {
      function Tips() {
        classCallCheck(this, Tips);

        this.tipsHtml = null;
        this.ptr = null;
        this.config = {
          msg: '',
          isLoading: false,
          autoHide: true,
          hideTime: 1200
        };

        this.iconConf = {
          loading: isAndroid() ? 'rotate-svg' : 'rotate-icon',
          none: ''
        };
      }

      /**
       * @param {object} option
       */

      createClass(Tips, [{
        key: 'showTips',
        value: function showTips(option) {
          var _this = this;

          if (this.tipsHtml) {
            return;
          }

          var conf = _extends({}, this.config, option);
          var html = anonymous({ text: conf.msg, icon: conf.isLoading ? this.iconConf.loading : '' });
          this.tipsHtml = createElement(html);
          document.body.insertBefore(this.tipsHtml, null);

          if (conf.autoHide) {
            setTimeout(function () {
              _this.closeTips();
            }, conf.hideTime);
          }

          this.lock = true;
        }

        /**
         * @param {string} message
         */

      }, {
        key: 'showLoading',
        value: function showLoading(message) {
          this.showTips({
            msg: message || '努力加载中...',
            isLoading: true,
            autoHide: false
          });
        }

        /**
         * @param {string} message
         */

      }, {
        key: 'showError',
        value: function showError(message) {
          var _this2 = this;

          clearInterval(this.ptr);
          this.ptr = setInterval(function () {
            if (!_this2.tipsHtml) {
              _this2.showTips({
                msg: message
              });

              clearInterval(_this2.ptr);
              _this2.ptr = null;
            }
          }, 200);
        }
      }, {
        key: 'closeTips',
        value: function closeTips() {
          if (!this.tipsHtml) {
            return this;
          }

          this.tipsHtml.parentNode.removeChild(this.tipsHtml);
          this.tipsHtml = null;
          this.lock = false;
          return this;
        }
      }]);
      return Tips;
    }();

    var index = new Tips();

    return index;
  });
});

var countdown = createCommonjsModule(function (module, exports) {
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
  });
});

function normalizeElement(el) {
  if (typeof el === 'string') return document.querySelector(el);
  return el;
}

function ajaxPost(opt, success, error) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    var ptr = setTimeout(function () {
      if (xhr.readyState !== 4) {
        error && error(405);
        xhr.abort();
      }
    }, opt.timeout || 50000);

    if (xhr.readyState === 4) {
      clearTimeout(ptr);
      if (xhr.status === 200) {
        var result = null;
        try {
          result = JSON.parse(xhr.responseText);
          success.call(xhr, result);
        } catch (e) {
          error && error(e);
        }
      } else {
        error && error.apply(xhr, [xhr.status, xhr.responseText]);
      }
    }
  };
  xhr.open('POST', opt.url);
  xhr.withCredentials = false;
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(JSON.stringify(opt.data));
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

/**
 * 短信验证码
 */

/* eslint max-len: "off" */
var DX_CAPTCHA_ID = '__dx-captcha';
var defaultOptions = {
  el: '#' + DX_CAPTCHA_ID,
  disabled: false,
  cssText: '.dx_captcha_clickword_msg{font-size: 0;}.dx_captcha_clickword_msg .dx-msg-info,.dx_captcha_clickword_msg .dx-msg-error{font-size: 12px !important;}',
  reqHost: window.interface_env || '',
  captchaOptions: {
    appId: 'f57049edfd9daf906079dd8442fabd92'
  }
};

var BASE_INDEX_URL = '/base/index';
var BASE_CODE_URL = '/base/code';
var SMS_CODE_CMD = '42010101';
var SMS_CODE_BY_VERFIY_CMD = '42010121';

var SmsCode = function () {
  function SmsCode() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, SmsCode);

    this.options = _extends({}, defaultOptions, options);
    this.captchaOptions = _extends({}, defaultOptions.captchaOptions, this.options.captchaOptions);

    this.$dxCaptcha = document.querySelector(this.options.el);
    this.dxCaptcha = null;
    this.init();
  }

  createClass(SmsCode, [{
    key: 'initCssText',
    value: function initCssText() {
      // 修改验证码部分默认样式
      addCssText(this.options.cssText);
    }
  }, {
    key: 'initCaptchaElement',
    value: function initCaptchaElement() {
      if (!this.$dxCaptcha) {
        this.$dxCaptcha = document.createElement('div');
        this.$dxCaptcha.setAttribute('id', DX_CAPTCHA_ID);
        document.body.appendChild(this.$dxCaptcha);
      }
    }
  }, {
    key: 'init',
    value: function init() {
      // 初始化滑动验证码
      if (!this.options.disabled) {
        this.initCssText();
        this.initCaptchaElement();
        this.dxCaptcha = new dxCaptcha(this.options.el, {
          captchaOptions: this.captchaOptions
        });
      }
    }
  }, {
    key: 'getCode',
    value: function getCode(node, mobile) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var getCodeDefaultOptions = {
        scene: 1,
        mobileReg: /^1[23456789]\d{9}$/,
        disabledCls: 'btn-disabled',
        countDownTime: 60,
        countDownProcessCallback: function countDownProcessCallback(el, time) {
          el.innerText = time + 's';
        },
        countDownEndCallback: function countDownEndCallback(el) {
          el.innerText = '获取验证码';
        }
      };

      node = normalizeElement(node);
      options = _extends({}, getCodeDefaultOptions, options);

      if (!options.mobileReg.test(mobile)) {
        tips.showError('请输入正确的手机号码');
        return false;
      }
      if (node.classList.contains(options.disabledCls)) {
        return false;
      }

      if (this.dxCaptcha) {
        this.dxCaptcha.show(function (token) {
          _this._getSmsCode(BASE_CODE_URL, {
            cmd: SMS_CODE_BY_VERFIY_CMD,
            scene: options.scene,
            tel: mobile,
            verify_token: token
          }, node, options);
        });
      } else {
        this._getSmsCode(BASE_INDEX_URL, {
          cmd: SMS_CODE_CMD,
          tel: mobile
        }, node, options);
      }
    }
  }, {
    key: '_getSmsCode',
    value: function _getSmsCode(url, params, node, options) {
      var countDownProcessCallback = options.countDownProcessCallback;
      var countDownEndCallback = options.countDownEndCallback;
      node.classList.add(options.disabledCls);
      ajaxPost({
        url: '' + this.options.reqHost + url + '?_ts=' + Date.now(),
        data: params
      }, function (json) {
        /* eslint eqeqeq: "off" */
        if (json.code == 0) {
          tips.showError('发送成功');
          /* eslint no-new: "off" */
          new countdown({
            time: options.countDownTime,
            processCallback: function processCallback(time) {
              if (typeof countDownProcessCallback === 'function') {
                countDownProcessCallback(node, time);
              }
            },
            endCallback: function endCallback() {
              node.classList.remove(options.disabledCls);
              if (typeof countDownProcessCallback === 'function') {
                countDownEndCallback(node);
              }
            }
          });
        } else {
          tips.showError(json.msg);
          node.classList.remove(options.disabledCls);
        }
      }, function () {
        tips.showError('网络错误');
        node.classList.remove(options.disabledCls);
      });
    }
  }]);
  return SmsCode;
}();

return SmsCode;

})));
//# sourceMappingURL=sms-code.dev.js.map
