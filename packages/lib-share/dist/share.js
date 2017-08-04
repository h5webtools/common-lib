(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Share = factory());
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
 * 工具函数
 */

var hasOwn = Object.prototype.hasOwnProperty;

/**
 * 检查是否函数数组
 * @param {Function[]} fns
 * @return {Boolean}
 */
function checkFunctionArray(fns) {
  return fns.every(function (fn) {
    return isFunction(fn);
  });
}

/**
 * 是否是函数
 * @param {Function} fn
 * @return {Boolean}
 */
function isFunction(fn) {
  return typeof fn === 'function';
}

/**
 * 是否是对象
 * @param {Object} obj
 * @return {Boolean}
 */
function isObject(obj) {
  return hasOwn.call(obj) === '[object Object]';
}

/**
 * 加载脚本
 * @param {String} url 加载URL
 * @param {Function} fnSuccess 加载成功执行
 * @param {Function} fnFailed 加载失败执行
 */
function loadScript(url, fnSuccess, fnFailed) {
  var oScript = document.createElement('script');

  if (isFunction(fnSuccess)) {
    oScript.onload = fnSuccess;
  }

  if (isFunction(fnFailed)) {
    oScript.onerror = fnFailed;
  }

  oScript.src = url;
  document.querySelector('head').appendChild(oScript);
}

/**
 * ajax get
 * @param {Object} options
 * @param {Function} fnSuccess
 * @param {Function} fnError
 */
function ajaxGet(options, fnSuccess, fnError) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      try {
        fnSuccess(JSON.parse(xhr.responseText));
      } catch (e) {
        fnError(e);
      }
    } else {
      fnError(xhr.status, xhr.responseText);
    }
  };
  xhr.open('GET', options.url + (options.url.indexOf('?') > 0 ? '&' : '?') + processData(options.data));
  xhr.send(null);

  function processData(data) {
    if (isObject(data)) {
      var result = [];
      for (var i in data) {
        result.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
      }
      return result.join('&');
    }

    return data;
  }
}

/**
 * 微信授权分享
 */

var defaultOptions$1 = {
  reqUrl: '//jyb.jyblife.com/activejyb/wxShareSign',
  scriptUrl: '//res.wx.qq.com/open/js/jweixin-1.0.0.js'
};

/* global wx */
var weixinHelper = {
  name: 'weixin',
  /**
   * 测试是否执行init
   * @param {String} ua
   * @return {Boolean}
   */
  test: function test(ua) {
    return (/micromessenger/.test(ua)
    );
  },

  /**
   * 初始化
   * @param {Object} options
   * @param {String} options.title 标题
   * @param {String} options.desc 描述
   * @param {String} options.link 链接
   * @param {String} options.imgUrl 图片地址
   * @param {String} options.reqUrl 请求地址
   * @param {String} options.scriptUrl 微信jssdk地址
   */
  init: function init(options) {
    var opts = _extends({}, defaultOptions$1, options);
    var scriptUrl = opts.scriptUrl;

    loadWeixinScript(scriptUrl);
    ajaxGet({
      url: opts.reqUrl,
      data: {
        url: location.href,
        t: +new Date()
      }
    }, function (json) {
      var isLoaded = loadWeixinScript(scriptUrl, function () {
        weixinAuth(json, opts);
      });

      if (isLoaded) {
        weixinAuth(json, opts);
      }
    });
  }
};

/**
 * 微信验证
 * @param {Object} authData
 * @param {Object} shareData
 */
function weixinAuth(authData, shareData) {
  wx.config({
    debug: false,
    appId: authData.appId,
    timestamp: authData.timestamp,
    nonceStr: authData.nonceStr,
    signature: authData.signature,
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideAllNonBaseMenuItem']
  });
  wx.ready(function () {
    wx.onMenuShareTimeline({
      title: shareData.title,
      link: shareData.link,
      imgUrl: shareData.imgUrl
    });
    wx.onMenuShareAppMessage({
      title: shareData.title,
      desc: shareData.desc,
      link: shareData.link,
      imgUrl: shareData.imgUrl
    });
  });
}

/**
 * 加载微信脚本
 * @param {String} url
 * @param {Function} fnSuccess
 * @param {Function} fnFailed
 */
function loadWeixinScript(url, fnSuccess, fnFailed) {
  if (typeof window.wx === 'undefined') {
    loadScript(url, fnSuccess, fnFailed);
    return false;
  }

  return true;
}

/**
 * qq分享
 */

var defaultOptions$2 = {
  scriptUrl: '//pub.idqqimg.com/qqmobile/qqapi.js?_bid=152'
};

/* global mqq */
var qqHelper = {
  name: 'qq',
  /**
   * 测试是否执行init
   * @param {String} ua
   * @return {Boolean}
   */
  test: function test(ua) {
    return (/qq\//.test(ua)
    );
  },

  /**
   * 初始化
   * @param {Object} options
   * @param {String} options.title 标题
   * @param {String} options.desc 描述
   * @param {String} options.link 链接
   * @param {String} options.imgUrl 图片地址
   * @param {String} options.scriptUrl QQ jssdk地址
   */
  init: function init(options, ua) {
    var opts = _extends({}, defaultOptions$2, options);
    var isLoaded = loadQQScript(opts.scriptUrl, function () {
      qqShare(opts, ua);
    });

    if (isLoaded) {
      qqShare(opts, ua);
    }
  }
};

/**
 * QQ分享
 * @param {Object} options
 * @param {String} ua
 */
function qqShare(options, ua) {
  if (/android/.test(ua)) {
    mqq.data.setShareInfo({
      title: options.title,
      desc: options.desc,
      share_url: options.link,
      image_url: options.imgUrl
    });
  } else {
    mqq.ui.setOnShareHandler(function (type) {
      mqq.ui.shareMessage({
        title: options.title,
        desc: options.desc,
        share_type: type,
        share_url: options.link,
        image_url: options.imgUrl,
        back: true
      });
    });
  }
}

/**
 * 加载QQ脚本
 * @param {String} url
 * @param {Function} fnSuccess
 * @param {Function} fnFailed
 */
function loadQQScript(url, fnSuccess, fnFailed) {
  if (typeof window.mqq === 'undefined') {
    loadScript(url, fnSuccess, fnFailed);
    return false;
  }

  return true;
}

/**
 * helper
 */

var helper = {
  weixin: weixinHelper,
  qq: qqHelper
};

/**
 * 分享模块，目前支持微信授权分享，QQ分享
 */

var ua = window.navigator.userAgent.toLowerCase();
var defaultOptions = {
  common: {
    title: '',
    desc: '',
    link: '',
    imgUrl: ''
  }
};

/**
 * 分享
 * @param {Object} options
 */
function share() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var opts = extend(true, {}, defaultOptions, options);

  for (var k in helper) {
    if (hasOwn.call(helper, k)) {
      var curr = helper[k];
      var name = curr.name;

      if (checkFunctionArray([curr.test, curr.init]) && name && curr.test(ua)) {
        curr.init(extend({}, opts.common, opts[name] || {}), ua);
      }
    }
  }
}

return share;

})));
