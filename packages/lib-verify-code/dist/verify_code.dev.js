(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VerifyCode = factory());
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

/**
 * 工具库
 */

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

var util = {
  ajaxPost: ajaxPost
};

/**
 * types
 */

// 接口环境
var urlEnv = {
  proxy: '/proxy/base/index',
  test: 'https://swebsit.jyblife.com/base/index',
  prod: 'https://sweb.jyblife.com/base/index'
};

/**
 * 类型
 */
var types = {
  sms: { // 短信验证码
    data: {
      cmd: '42010101'
    }
  },
  img: { // 图形验证码
    data: {
      cmd: '42010102'
    }
  },
  voice: { // 语音验证码
    data: {
      cmd: '42010106'
    }
  }
};

/**
 * 获取类型
 * @param {String} env 当前接口环境，test/prod
 * @param {String} name 类型名称
 * @return {Object}
 */
function getTypes(env, name) {
  if (!urlEnv[env]) {
    throw new Error(env + '\u73AF\u5883\u4E0D\u5B58\u5728\uFF0C\u53D6\u503C\u5FC5\u987B\u4E3A\uFF1A' + Object.keys(urlEnv).join(','));
  }

  if (!types[name]) {
    throw new Error(name + '\u7C7B\u578B\u4E0D\u5B58\u5728\uFF0C\u53D6\u503C\u5FC5\u987B\u4E3A\uFF1A' + Object.keys(types).join(','));
  }

  return {
    url: urlEnv[env],
    data: types[name].data
  };
}

/**
 * 验证码
 */

var defaultOptions = {
  ajax: {}, // ajax配置
  onBefore: function onBefore() {
    return true;
  },
  // 发送请求前，如果return false将不执行
  onSuccess: function onSuccess() {},
  // 请求成功，参数为响应的数据
  onError: function onError() {} // 请求失败，参数为错误信息

};

var VerifyCode = function () {
  /**
   * 获取验证码
   * @param {String} type 类型，取值可以有sms,img,voice
   * @param {Object} [options] 选项
   * @param {String} [env] 接口环境，默认prod
   */
  function VerifyCode() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var env = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'prod';
    classCallCheck(this, VerifyCode);

    var ajaxOptions = getTypes(env, type);

    this.type = type;
    this.options = extend(true, defaultOptions, { ajax: ajaxOptions }, options);
    this._ajaxLock = false;
    this._init();
  }

  createClass(VerifyCode, [{
    key: '_init',
    value: function _init() {
      var _this = this;

      var _options = this.options,
          ajax = _options.ajax,
          onBefore = _options.onBefore,
          onSuccess = _options.onSuccess,
          onError = _options.onError;


      if (this._ajaxLock || !onBefore()) {
        return false;
      }

      this._ajaxLock = true;
      util.ajaxPost(ajax, function (json) {
        _this._ajaxLock = false;
        onSuccess(json);
      }, function (e) {
        _this._ajaxLock = false;
        onError(e);
      });
      return true;
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this._init();
    }
  }]);
  return VerifyCode;
}();

return VerifyCode;

})));
//# sourceMappingURL=verify_code.dev.js.map
