(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Tracker = factory());
}(this, (function () { 'use strict';

/**
 * onerror
 */

function onError() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var cb = arguments[1];

  // 先存下旧的onerror事件处理函数
  var oldOnErrorHandler = window.onerror;

  /* eslint-disable space-before-function-paren */
  window.onerror = function (msg, url, line, col, err) {
    /* eslint-disable prefer-rest-params */
    var args = Array.prototype.slice.call(arguments);

    if (oldOnErrorHandler) {
      oldOnErrorHandler.apply(window, args);
    }

    if (msg !== 'Script error.' && !url) {
      return;
    }

    // 不一定所有浏览器都支持 col 参数
    col = col || window.event && window.event.errorCharacter || 0;
    var stack = '';
    if (!err.stack) {
      // 通过 callee 获取堆栈信息
      var ext = [];

      /* eslint-disable no-caller,no-restricted-properties */
      var f = arguments.callee.caller;
      var c = 3; // 拿3层信息
      while (f && --c > 0) {
        ext.push(f.toString());
        if (f === f.caller) {
          break;
        }
        f = f.caller;
      }
      stack = ext.join('');
    } else {
      stack = err.stack;
    }

    cb && cb({
      msg: msg,
      url: url,
      line: line,
      col: col,
      errStack: stack.toString()
    });

    return !options.debug;
  };
}

/**
 * 环境
 */

var ua = window.navigator.userAgent;

/* eslint-disable no-useless-escape */
var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
var inApp = /jiayoubao/.test(ua.toLowerCase());

var os = {};

// jyb app
os.jyb = inApp;

// android
if (android) {
  os.android = true;
  os.version = android[2];
}

// ios
if (iphone && !ipod) {
  os.ios = os.iphone = true;
  os.version = iphone[2].replace(/_/g, '.');
}

if (ipad) {
  os.ios = os.ipad = true;
  os.version = ipad[2].replace(/_/g, '.');
}

if (ipod) {
  os.ios = os.ipod = true;
  os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
}

/**
 * left pad
 */

/* eslint-disable */
var cache = ['', ' ', '  ', '   ', '    ', '     ', '      ', '       ', '        ', '         '];

function leftPad(str, len, ch) {
  str = str + '';
  len = len - str.length;
  if (len <= 0) {
    return str;
  }

  if (!ch && ch !== 0) {
    ch = ' ';
  }

  ch = ch + '';
  if (ch === ' ' && len < 10) {
    return cache[len] + str;
  }

  var pad = '';
  var isTrue = true;

  while (isTrue) {
    if (len & 1) {
      pad += ch;
    }

    len >>= 1;
    if (len) {
      ch += ch;
    } else {
      break;
    }
  }

  return pad + str;
}

/**
 * util
 */

var hasOwn = Object.prototype.hasOwnProperty;
var rhashcode = /\d\.\d{4}/;
var networkType = '';

// 立即获取网络类型
getNetworkType();

/**
 * location.pathname（用/分割后）的下标为1的字符串
 */
function getFirstPathName() {
  var link = window.location.href;
  var arrLink = link.slice(link.indexOf('://') + 3).split(/\/+/);

  return arrLink.length > 2 ? arrLink[1] : '';
}

/**
 * 获取平台信息
 */
function getPlatform() {
  var platformStr = '';

  if (os.android) {
    platformStr = 'android';
  } else if (os.ios) {
    platformStr = 'ios';
  }

  return platformStr;
}

/**
 * 获取ID
 * @param {String} prefix 前缀
 * @return {String}
 */
function makeHashCode(prefix) {
  prefix = prefix || 'g_tracker';
  return String(Math.random() + Math.random()).replace(rhashcode, prefix);
}

/**
 * 获取网络类型
 */
function getNetworkType() {
  if (os.jyb && typeof wv !== 'undefined') {
    /* global wv */
    wv.ready(function () {
      wv.getNetworkType({
        complete: function complete(res) {
          networkType = res.networkType;
        }
      });
    });
  } else if (navigator.connection) {
    // https://www.w3.org/TR/2011/WD-netinfo-api-20110607/
    networkType = navigator.connection.type || '';
  }

  return networkType || '';
}

/**
 * 是否错误类型
 * @param {Object} value
 * @return {Boolean}
 */
function isError(value) {
  switch (Object.prototype.toString.call(value)) {
    case '[object Error]':
      return true;
    case '[object Exception]':
      return true;
    case '[object DOMException]':
      return true;
    default:
      return value instanceof Error;
  }
}

/**
 * 获取时间
 */
function getTime() {
  var oDate = new Date();
  var year = oDate.getFullYear();
  var month = leftPad(oDate.getMonth() + 1, 2, '0');
  var date = leftPad(oDate.getDate(), 2, '0');
  var hours = leftPad(oDate.getHours(), 2, '0');
  var minutes = leftPad(oDate.getMinutes(), 2, '0');
  var second = leftPad(oDate.getSeconds(), 2, '0');

  return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second;
}

/**
 * proxy
 * @param {Object} to
 * @param {Object} from
 * @param {String} key
 */
function proxy(to, from, key) {
  if (hasOwn.call(to, key)) return;
  Object.defineProperty(to, key, {
    enumerable: true,
    configurable: true,
    get: function get() {
      return from[key];
    },
    set: function set(val) {
      from[key] = val;
    }
  });
}

var util = {
  getFirstPathName: getFirstPathName,
  getPlatform: getPlatform,
  getTime: getTime,
  makeHashCode: makeHashCode,
  networkType: networkType,
  isError: isError,
  proxy: proxy
};

/**
 * enum
 */

// 采集信息类型
var TRACKER_TYPE = {
  JS_ERROR: '1',
  API_ERROR: '2'
};

// 标识符
var IDENTIFIER = {
  BAD_JS: '1'
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

/**
 * 上报
 * @see http://wiki.jtjr.com/doku.php?id=%E6%95%B0%E6%8D%AE%E5%B9%B3%E5%8F%B0:%E4%BA%8B%E4%BB%B6%E4%B8%8A%E6%8A%A5%E8%A7%84%E8%8C%83
 */

var reportURL = {
  test: '//172.16.1.16:8890',
  prod: '//report.jyblife.com'
};

var AK = 'KVQiUTJf';
var CMD = '65010000';

/**
 * 上报
 * @param {Object} options 用户选项
 * @param {Object} trackParams 上报数据
 */
function report() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var trackParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // 公共参数
  var commonParams = {
    // 页面地址
    link: location.href,
    // 用户代理
    ua: navigator.userAgent,
    // 页面title
    title: document.title,
    // 窗口大小
    size: document.documentElement.clientWidth + '*' + document.documentElement.clientHeight,
    // 返回跳转或打开到当前页面的那个页面的URI
    referer: document.referer || '',
    // 时间戳
    timestamp: new Date().getTime(),
    // 网络类型
    network: util.networkType,
    // badjs标识符
    badjs: IDENTIFIER.BAD_JS,
    // pid
    pid: options.pid
  };

  var mergeParams = _extends(commonParams, trackParams);
  var url = reportURL[options.env] || '';
  // 真正上报内容
  var reportInfo = {
    ak: AK,
    body: JSON.stringify({
      cmd: CMD,
      data: [{
        sid: '', // 会话id（可选）
        op_type: 'click', // click，touch，share
        op_result: '', // （可选）
        op_time: util.getTime(), // 事件发生的时间（时间戳）
        op_object: '', // 操作对象，格式1000.1.1
        op_page: '', // h5为空（可选）
        op_params: _extends({
          platform: util.getPlatform(), // 平台
          in_app: os.jyb ? 1 : 0, // 1为加油宝app内，0为app外
          cust_id: '', // 客户id
          uniq_id: '', // 如果未登录设置此id,如果登录与custId一致
          source: '',
          act_id: '', // 活动ID
          group: '' // 用户群
        }, mergeParams)
      }]
    })
  };

  var params = [];
  for (var key in reportInfo) {
    params.push(key + '=' + encodeURIComponent(reportInfo[key]));
  }

  if (options.debug) {
    console.log(JSON.stringify(mergeParams, null, 2));
  } else {
    ping(url + '?' + params.join('&'));
  }
}

/**
 * 发送上报
 * @param {String} url
 */
function ping(url) {
  var uuid = util.makeHashCode();
  var img = new Image();

  // 防止回收内存导致数据上报丢失
  if (!window[uuid]) {
    window[uuid] = img;
    img.onload = img.onerror = function () {
      window[uuid] = null;
      delete window[uuid];
    };
  }

  img.src = url;
}

/**
 * 错误信息自动采集
 */

var ErrorTracker = function () {
  function ErrorTracker() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, ErrorTracker);

    this.$options = options;
    this.params = _extends({ t_type: TRACKER_TYPE.JS_ERROR }, params);
    this._init();
  }

  /**
   * 初始化
   */


  createClass(ErrorTracker, [{
    key: '_init',
    value: function _init() {
      var _this = this;

      // window.onerror
      if (this.$options.collectWindowErrors) {
        onError(this.$options, function (params) {
          _this._send(params);
        });
      }
    }

    /**
     * 发送日志
     * @param {Object} params
     */

  }, {
    key: '_send',
    value: function _send() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      report(this.$options, paramsAdaptor(_extends({}, this.params, params)));
    }

    /**
     * 捕获错误
     * @param {Object} ex 错误对象
     * @param {Object} params 自定义上报信息，会覆盖之前有的
     */

  }, {
    key: 'captureError',
    value: function captureError(ex, params) {
      if (!util.isError(ex)) return;

      // TODO: 如果堆栈过长是否应该先解析堆栈内容（msg, url, line, col, errStack）
      this._send(_extends({
        msg: (ex.name || '') + ': ' + (ex.message || ''),
        errStack: (ex.stack || '').toString()
      }, params));
    }
  }]);
  return ErrorTracker;
}();

/**
 * 参数适配
 */


function paramsAdaptor(params) {
  // msg, line, col => c1
  // errStack => c2
  // url => c3
  var ps = ['msg', 'line', 'col', 'url', 'errStack'];

  // 保证有值
  ps.forEach(function (p) {
    if (!params[p]) {
      params[p] = '';
    }
  });

  params.c1 = [params.msg, params.line, params.col].join(',');
  params.c2 = params.url;
  params.c3 = params.errStack;

  // 删除参数
  ps.forEach(function (p) {
    return delete params[p];
  });
  return params;
}

/**
 * 前端数据采集
 */

var defaultOptions = {
  pid: util.getFirstPathName(),
  debug: false,
  collectWindowErrors: true,
  env: 'prod' // test/prod
};

// 数据采集

var Tracker = function () {
  function Tracker() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Tracker);

    this.$options = _extends({}, defaultOptions, options);
    this.trackParams = {};
    this.initError();
  }

  /**
   * 设置配置
   * @param {Object} trackParams
   */


  createClass(Tracker, [{
    key: 'setParams',
    value: function setParams() {
      var trackParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _extends(this.trackParams, trackParams);
    }

    /**
     * 通用采集数据API
     * @param {Object} trackParams
     */

  }, {
    key: 'log',
    value: function log(trackParams) {
      report(this.$options, _extends({}, this.trackParams, trackParams));
    }

    /**
     * 上报接口异常API
     * @param {Object} trackParams
     */

  }, {
    key: 'captureApi',
    value: function captureApi(trackParams) {
      this.log(_extends({ t_type: TRACKER_TYPE.API_ERROR }, trackParams));
    }

    /**
     * 错误采集初始化
     */

  }, {
    key: 'initError',
    value: function initError() {
      // error
      var errorTracker = new ErrorTracker(this.$options, this.trackParams);
      this.error = errorTracker;
      this.Error = ErrorTracker;
      this.captureError = errorTracker.captureError.bind(errorTracker);
    }
  }]);
  return Tracker;
}();

var tracker = new Tracker((window.g_config || {}).tracker);

// properties
tracker.Ctor = Tracker;

return tracker;

})));
//# sourceMappingURL=tracker.dev.js.map
