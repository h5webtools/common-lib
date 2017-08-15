(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.share = factory());
}(this, (function () { 'use strict';

/**
 * 工具函数
 */

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

/**
 * 检查是否函数数组
 * @param {Function[]} fns
 * @return {Boolean}
 */


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
  return toStr.call(obj) === '[object Object]';
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
 * 队列
 */

var Queue = function () {
  function Queue() {
    classCallCheck(this, Queue);

    this._queue = [];
  }

  /**
   * 入列
   */


  createClass(Queue, [{
    key: "enqueue",
    value: function enqueue(data) {
      this._queue.push(data);
    }

    /**
     * 出列
     */

  }, {
    key: "dequeue",
    value: function dequeue() {
      return this._queue.shift();
    }

    /**
     * 长度
     */

  }, {
    key: "size",
    value: function size() {
      return this._queue.length;
    }

    /**
     * 清空
     */

  }, {
    key: "clear",
    value: function clear() {
      this._queue.length = 0;
    }
  }]);
  return Queue;
}();

/**
 * 状态
 */

var STATUS = {
  NORMAL: 0, // 默认
  INIT: 1 // 初始化
};

/**
 * 微信授权分享
 * @see https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */

var defaultInitOptions = {
  debug: false, // 开启debug模式，页面会alert出错误信息
  reqUrl: '//jyb.jyblife.com/activejyb/wxShareSign',
  scriptUrl: '//res.wx.qq.com/open/js/jweixin-1.0.0.js'
};

var defaultShareOptions = {
  title: '', // 分享标题
  desc: '', // 分享描述
  link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  imgUrl: '', // 分享图标
  success: function success() {},
  // 用户确认分享后执行的回调函数
  cancel: function cancel() {} // 用户取消分享后执行的回调函数

};

/* global wx */

var WXShare = function () {
  function WXShare(ua) {
    classCallCheck(this, WXShare);

    this.ua = ua;
    this.status = STATUS.NORMAL;
    this.name = 'weixin';
    this.queue = new Queue();
  }

  /**
   * 测试是否微信客户端
   * @return {Boolean}
   */


  createClass(WXShare, [{
    key: 'test',
    value: function test() {
      return (/micromessenger/.test(this.ua)
      );
    }

    /**
     * 初始化
     * @param {Object} options
     * @param {Boolean} options.debug 开启debug模式，页面会alert出错误信息
     * @param {String} options.reqUrl 请求地址
     * @param {String} options.scriptUrl 微信jssdk地址
     */

  }, {
    key: 'init',
    value: function init() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.status === STATUS.INIT) return;
      var opts = _extends({}, defaultInitOptions, options);
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
          _this._auth(json, opts);
        });

        if (isLoaded) {
          _this._auth(json, opts);
        }
      });
    }

    /**
     * 分享
     * @param {Object} options
     */

  }, {
    key: 'share',
    value: function share() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var opts = _extends({}, defaultShareOptions, options);

      // 没有初始化，入列
      if (this.status === STATUS.NORMAL) {
        this.queue.enqueue(function () {
          weixinShare(opts);
        });
        return;
      }

      weixinShare(opts);
    }

    /**
     * 验证
     * @param {Object} json
     * @param {Object} opts
     */

  }, {
    key: '_auth',
    value: function _auth(json, opts) {
      var _this2 = this;

      weixinAuth(json, opts, function () {
        var curr = null;

        /* eslint-disable no-cond-assign */
        while (curr = _this2.queue.dequeue()) {
          isFunction(curr) && curr();
        }
        _this2.status = STATUS.INIT;
      });
    }
  }]);
  return WXShare;
}();

function weixinAuth(authData, options, cb) {
  wx.config({
    debug: options.debug,
    appId: authData.appId,
    timestamp: authData.timestamp,
    nonceStr: authData.nonceStr,
    signature: authData.signature,
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideAllNonBaseMenuItem']
  });
  cb && cb();
}

/**
 * 微信分享
 * @param {Object} shareData
 */
function weixinShare(shareData) {
  wx.ready(function () {
    wx.onMenuShareTimeline({
      title: shareData.title,
      link: shareData.link,
      imgUrl: shareData.imgUrl,
      success: shareData.success,
      cancel: shareData.cancel
    });
    wx.onMenuShareAppMessage({
      title: shareData.title,
      desc: shareData.desc,
      link: shareData.link,
      imgUrl: shareData.imgUrl,
      success: shareData.success,
      cancel: shareData.cancel
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
 * @see https://open.mobile.qq.com/api/mqq/index#api:setShareInfo
 * @see https://open.mobile.qq.com/api/common/index#api:setOnShareHandler
 */

var defaultInitOptions$1 = {
  scriptUrl: '//pub.idqqimg.com/qqmobile/qqapi.js?_bid=152'
};

var defaultShareOptions$1 = {
  title: '', // 分享标题
  desc: '', // 分享描述
  link: '', // 分享链接
  imgUrl: '', // 分享图标
  callback: function callback() {} // 回调

};

/* global mqq */

var QQShare = function () {
  function QQShare(ua) {
    classCallCheck(this, QQShare);

    this.ua = ua;
    this.status = STATUS.NORMAL;
    this.name = 'qq';
    this.queue = new Queue();
  }

  /**
   * 测试是否QQ客户端
   * @return {Boolean}
   */


  createClass(QQShare, [{
    key: 'test',
    value: function test() {
      return (/qq\//.test(this.ua)
      );
    }

    /**
     * 初始化
     * @param {Object} options
     * @param {String} options.scriptUrl QQ jssdk地址
     */

  }, {
    key: 'init',
    value: function init() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.status === STATUS.INIT) return;
      var opts = _extends({}, defaultInitOptions$1, options);
      var isLoaded = loadQQScript(opts.scriptUrl, function () {
        var curr = null;

        /* eslint-disable no-cond-assign */
        while (curr = _this.queue.dequeue()) {
          isFunction(curr) && curr();
        }
        _this.status = STATUS.INIT;
      });

      if (isLoaded) {
        this.status = STATUS.INIT;
      }
    }

    /**
     * 分享
     * @param {Object} options
     */

  }, {
    key: 'share',
    value: function share() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var opts = _extends({}, defaultShareOptions$1, options);

      if (this.status === STATUS.NORMAL) {
        this.queue.enqueue(function () {
          qqShare(opts, _this2.ua);
        });
        return;
      }

      qqShare(opts, this.ua);
    }
  }]);
  return QQShare;
}();

function qqShare(options, ua) {
  if (/android/.test(ua)) {
    mqq.data.setShareInfo({
      title: options.title,
      desc: options.desc,
      share_url: options.link,
      image_url: options.imgUrl,
      callback: options.callback
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
      }, options.callback);
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
  weixin: WXShare,
  qq: QQShare
};

/**
 * 分享模块，目前支持微信授权分享，QQ分享
 */

var ua = window.navigator.userAgent.toLowerCase();

var share = {
  _helper: {},
  init: function init() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    for (var k in helper) {
      if (hasOwn.call(helper, k)) {
        var curr = new helper[k](ua);
        var name = curr.name;

        if (name && curr.test(ua) && !this._helper[name]) {
          this._helper[name] = curr;
          curr.init(options[name]);
        }
      }
    }
  },
  config: function config() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var curr = this._helper[name];

    if (curr) {
      curr.share(options);
    }
  }
};

return share;

})));
