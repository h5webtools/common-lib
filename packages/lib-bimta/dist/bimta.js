(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Bimta = factory());
}(this, (function () { 'use strict';

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

/* eslint-disable */
var rhashcode = /\d\.\d{4}/;
var UUID_KEY = '__DSTAT_UUID__';


var toStr = Object.prototype.toString;
var hasOwn = Object.prototype.hasOwnProperty;

function getCustId() {
  return getQuery('userid') || getCookie('userid') || '';
}

function getQuery(name) {
  // 参数：变量名，url为空则表从当前页面的url中取
  var u = arguments[1] || window.location.search.replace('&amp;', '&'),
      reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
      r = u.substr(u.indexOf('\?') + 1).match(reg);

  return r != null ? r[2] : '';
}

function getCookie(name) {
  // 读取COOKIE
  var reg = new RegExp('(^| )' + name + '(?:=([^;]*))?(;|$)');
  var val = document.cookie.match(reg);

  return val ? val[2] ? unescape(val[2]) : '' : null;
}

function getUUID() {
  try {
    var uuid = window.localStorage.getItem(UUID_KEY);

    if (!uuid) {
      uuid = makeHashCode();
      window.localStorage.setItem(UUID_KEY, uuid);
    }
    return uuid;
  } catch (e) {
    return makeHashCode();
  }
}

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

function makeHashCode(prefix) {
  prefix = prefix || 'bimta';
  return String(Math.random() + Math.random()).replace(rhashcode, prefix);
}

function assign(from, to) {
  var ignore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var obj = {};

  for (var m in to) {
    if (hasOwn.call(to, m) && !~ignore.indexOf(m)) {
      obj[m] = to[m];
    }
  }

  for (var n in from) {
    if (hasOwn.call(from, n) && obj[n] === void 0) {
      obj[n] = from[n];
    }
  }

  return obj;
}

function each(obj, cb) {
  if (isArray(obj)) {
    obj.forEach(function (o, i) {
      cb && cb(o, i);
    });
  } else if (isObject(obj)) {
    for (var k in obj) {
      if (hasOwn.call(obj, k)) {
        cb && cb(obj[k], k);
      }
    }
  }
}

function isString(str) {
  return toStr.call(str) === '[object String]';
}

function isArray(arr) {
  return Array.isArray(arr);
}

function isObject(obj) {
  return toStr.call(obj) === '[object Object]';
}

/**
 * 日志
 */

/**
 * 信息
 * @param {String} msg
 */
function info(msg) {
  console.log("INFO: " + msg);
}

/**
 * 警告
 * @param {String} msg
 */
function warn(msg) {
  console.log("WARN: " + msg);
}

/**
 * 错误
 * @param {String} msg
 */

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









































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * BI统计
 */

var uuid = getUUID();

// 上报地址
var reportURL = {
  test: '//172.16.1.16:8890',
  prod: '//report.jyblife.com'
};

// 默认配置
var defaultOptions$1 = {
  ak: 'KVQiUTJf',
  cmd: '65010000'
};

// 平台
var platformStr = '';

if (os.android) {
  platformStr = 'android';
} else if (os.ios) {
  platformStr = 'ios';
}

var BI = function () {
  function BI(debug) {
    var env = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'test';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, BI);

    this.platform = 'bi';
    this.debug = debug;
    this.env = env;
    this.options = assign(defaultOptions$1, options);
  }

  createClass(BI, [{
    key: 'init',
    value: function init() {
      return this;
    }
  }, {
    key: 'pageview',
    value: function pageview(ids, params) {
      this._track('pageview', ids, params);
    }
  }, {
    key: 'event',
    value: function event(ids, params) {
      this._track('event', ids, params);
    }
  }, {
    key: '_track',
    value: function _track(method, ids, params) {
      if (!ids) {
        return;
      }

      // set params
      params = params || {};

      var custId = getCustId();
      /* eslint-disable camelcase */
      var oImg = new Image();
      var url = reportURL[this.env] || '';
      var oParam = {
        ak: this.options.ak,
        body: JSON.stringify({
          cmd: this.options.cmd,
          data: [{
            sid: '', // 会话id（可选）
            op_type: params.op_type || 'click', // click，touch，share
            op_result: '', // （可选）
            op_time: getTime(), // 事件发生的时间（时间戳）
            op_object: ids, // 操作对象，格式1000.1.1
            op_page: '', // h5为空（可选）
            op_params: assign({
              platform: platformStr, // 平台
              in_app: os.jyb ? 1 : 0, // 1为加油宝app内，0为app外
              cust_id: custId, // 客户id
              uniq_id: custId || uuid, // 如果未登录设置此id,如果登录与custId一致
              source: getQuery('channel') || getQuery('from') || '', // baidu
              act_id: '', // 活动ID
              group: '' // 用户群
            }, params, ['op_type'])
          }]
        })
      };
      var aParam = [];

      for (var k in oParam) {
        aParam.push(encodeURIComponent(k) + '=' + encodeURIComponent(oParam[k]));
      }

      oImg.src = url + '?' + aParam.join('&');

      if (this.debug) {
        info('[' + method + '] platform: ' + this.platform + ', ids: ' + ids + ', query: ' + JSON.stringify(oParam));
      }
    }
  }]);
  return BI;
}();

/**
 * MTA统计
 * http://mta.qq.com
 */

var defaultOptions$2 = {
  test: {
    src: '//pingjs.qq.com/h5/stats.js?v2.0.4',
    name: 'MTAH5',
    sid: '500499846',
    cid: '500499847'
  },
  prod: {
    src: '//pingjs.qq.com/h5/stats.js?v2.0.4',
    name: 'MTAH5',
    sid: '500478186',
    cid: '500478188'
  }
};

var MTA = function () {
  function MTA(debug) {
    var env = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'test';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, MTA);

    this.platform = 'mta';
    this.debug = debug;
    this.env = env;
    this.options = assign(defaultOptions$2[env] || {}, options);
    this._trackCache = [];
  }

  createClass(MTA, [{
    key: 'init',
    value: function init() {
      var _this = this;

      // global
      window._mtac = { performanceMonitor: 1 };
      var mta = document.createElement('script');
      var s = document.getElementsByTagName('script')[0];

      for (var k in this.options) {
        if (hasOwn.call(this.options, k)) {
          mta.setAttribute(k, this.options[k]);
        }
      }

      mta.onload = function () {
        var track = null;

        /* eslint-disable no-cond-assign */
        while (track = _this._trackCache.shift()) {
          track();
        }
      };

      if (s) {
        s.parentNode.insertBefore(mta, s);
      } else {
        document.getElementsByTagName('head')[0].appendChild(mta);
      }

      return this;
    }
  }, {
    key: 'pageview',
    value: function pageview(ids, params) {
      this._track('pageview', ids, params);
    }
  }, {
    key: 'event',
    value: function event(ids, params) {
      this._track('event', ids, params);
    }
  }, {
    key: '_track',
    value: function _track(method, ids) {
      var arrIds = [];
      var para = {};

      if (!ids) {
        return;
      }

      arrIds = ids.split('.');
      if (arrIds.length < 3) {
        return;
      }
      para[arrIds[1]] = arrIds[2];

      if (window.MtaH5) {
        window.MtaH5.clickStat(arrIds[0], para);
      } else {
        this._trackCache.push(function () {
          window.MtaH5.clickStat(arrIds[0], para);
        });
      }
      if (this.debug) {
        info('[' + method + '] platform: ' + this.platform + ', ids: ' + ids);
      }
    }
  }]);
  return MTA;
}();

/**
 * platform
 */

var platform = {
  bi: BI,
  mta: MTA
};

/**
 * 自定义数据属性处理
 */

/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-escape */
var DATA_REGEX = /data\-(\w*)\-(\w*)/;

// 定义自定义属性
var customAttr = {
  ea: 'data-stat-ea',
  eb: 'data-stat-eb',
  ec: 'data-stat-ec',
  visit: 'data-stat-visit',
  para: 'data-stat-para'
};

// 默认配置
var defaultOptions$3 = {
  debug: false // 是否调试
};

var DataAttribute = function () {
  /**
   * 数据属性
   * @param {Object} options
   * @param {Boolean} options.debug 是否调试
   */
  function DataAttribute(options) {
    classCallCheck(this, DataAttribute);

    this.options = assign(defaultOptions$3, options || {});
    this.attrs = customAttr;
    this.alias = {};

    this.init();
  }

  /**
   * 初始化
   */


  createClass(DataAttribute, [{
    key: 'init',
    value: function init() {
      var debug = this.options.debug;

      // 生成alias

      for (var k in customAttr) {
        var curr = customAttr[k];

        if (DATA_REGEX.test(curr)) {
          this.alias[k] = customAttr[k].replace(DATA_REGEX, function (m, $1, $2) {
            return $1 + $2.charAt(0).toUpperCase() + $2.slice(1);
          });
        } else if (debug) {
          warn(k + ', ' + curr + ' \u683C\u5F0F\u6709\u8BEF');
        }
      }
    }

    /**
     * 获取数据属性的值，返回对象
     * @param {Object} obj 用来保存数据属性的值
     * @param {Array} attrs 用于数据属性顺序
     * @param {Object} dataset 获取到的数据集合
     * @return {Object}
     */

  }, {
    key: 'getDataSetObj',
    value: function getDataSetObj() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var dataset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      attrs.forEach(function (attr) {
        if (typeof dataset[attr] !== 'undefined') {
          obj[attr] = dataset[attr];
        }
      });

      return obj;
    }

    /**
     * 处理数据属性的值，返回数组
     * @param {Object} obj 数据属性的值
     * @param {Array} attrs 用于数据属性顺序
     * @return {Array}
     */

  }, {
    key: 'getDataSetArr',
    value: function getDataSetArr() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      return attrs.map(function (attr) {
        return obj[attr];
      });
    }

    /**
     * 检查数据属性的值
     * @param {Object} obj 数据属性的值
     * @param {Array} attrs 用于数据属性顺序
     * @return {Boolean}
     */

  }, {
    key: 'checkDataSetValue',
    value: function checkDataSetValue() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var isOk = true;

      for (var i = 0, l = attrs.length; i < l; i++) {
        if (typeof obj[attrs[i]] === 'undefined') {
          isOk = false;
          break;
        }
      }

      return isOk;
    }
  }]);
  return DataAttribute;
}();

/**
 * 参数
 */

function createCommonParams() {
  return {};
}

/**
 * BI/MTA 业务数据上报
 */

/* eslint-disable class-methods-use-this */
var CHECK_REGEX = /^\s*\{(.*)\}\s*$/;
var PARSE_REGEX = /[\s"']*([^:,"'{}]+)[\s"']*:[\s"']*([^:,"'{}]+)[\s"']*,?/g;

// 默认配置
var defaultOptions = {
  configMap: {}, // 配置表
  platform: ['bi', 'mta'], // ['bi', 'mta'], {bi: {}, mta: {}}
  createCommonParams: createCommonParams, // 生成公共参数函数
  env: 'test', // 上报环境，test/prod
  debug: false // 是否为调试模式
};

var Bimta = function () {
  /**
   * 数据统计
   * @param {Object} options
   */
  function Bimta(options) {
    classCallCheck(this, Bimta);

    this.platform = {};
    this.options = assign(defaultOptions, options || {});
    this.dataAttribute = new DataAttribute({
      debug: this.options.debug
    });
  }

  /**
   * 启动
   * @return {Object}
   */


  createClass(Bimta, [{
    key: 'start',
    value: function start() {
      try {
        this._init();
        this._initPageviewReport();
        this._initEventReport();
      } catch (e) {
        this._log(e);
      }
      return this;
    }

    /**
     * 转换参数
     * @param {Object} options
     * @return {String|Object}
     */

  }, {
    key: 'parseOption',
    value: function parseOption(options) {
      if (CHECK_REGEX.test(options)) {
        var opts = {};
        var opt = '';

        /* eslint-disable no-cond-assign */
        while (opt = PARSE_REGEX.exec(options)) {
          opts[opt[1]] = opt[2];
        }
        return opts;
      }

      return {};
    }

    /**
     * 记录访问日志
     * @param {String|Object} eventID '10000.1.1'/{ea: 'bargain', eb: 'home'}
     * @param {Object} params
     */

  }, {
    key: 'pageview',
    value: function pageview(eventID, params) {
      if (isObject(eventID)) {
        eventID.ec = 'pv';
      }

      this._call('pageview', eventID, params);
    }

    /**
     * 记录事件日志
     * @param {String|Object} eventID
     * @param {Object} params
     */

  }, {
    key: 'event',
    value: function event(eventID, params) {
      this._call('event', eventID, params);
    }

    /**
     * 获取公参
     */

  }, {
    key: 'getCommonParams',
    value: function getCommonParams() {
      return this.options.createCommonParams(createCommonParams());
    }

    /**
     * 初始化
     */

  }, {
    key: '_init',
    value: function _init() {
      var _this = this;

      var _options = this.options,
          env = _options.env,
          debug = _options.debug;


      this._log('\u5F53\u524D\u57CB\u70B9\u73AF\u5883\u4E3A\uFF1A' + env);
      each(this.options.platform, function (p, i) {
        var Platform = null;
        var options = {};
        var platformName = '';

        if (isString(p)) {
          platformName = p;
          Platform = platform[p];
        } else {
          platformName = i;
          options = p;
          Platform = platform[i];
        }

        _this.platform[platformName] = new Platform(debug, env, options);
        _this.platform[platformName].init();
      });
    }

    /**
     * 初始化pv上报
     */

  }, {
    key: '_initPageviewReport',
    value: function _initPageviewReport() {
      var _this2 = this;

      var dataAttribute = this.dataAttribute;
      var els = document.querySelectorAll('[' + dataAttribute.attrs.visit + ']');
      var alias = dataAttribute.alias;

      if (els.length > 0) {
        window.setTimeout(function () {
          _this2._dataAttrReport('pageview', els[0], [alias.ea, alias.eb, alias.visit, alias.para]);
        }, 0);
      }
    }

    /**
     * 初始化event上报
     */

  }, {
    key: '_initEventReport',
    value: function _initEventReport() {
      var _this3 = this;

      document.body.addEventListener('click', function (e) {
        window.setTimeout(function () {
          var el = e.target;
          var dataAttribute = _this3.dataAttribute;
          var alias = dataAttribute.alias;

          _this3._dataAttrReport('event', el, [alias.ea, alias.eb, alias.ec, alias.para]);
        }, 0);
      }, true);
    }

    /**
     * 数据属性自动上报
     * @param {String} method 方法，pageview/event
     * @param {Object} el 元素
     * @param {Array} attrs
     */

  }, {
    key: '_dataAttrReport',
    value: function _dataAttrReport(method, el, attrs) {
      var dataSetObj = {};
      var dataSetArr = [];
      var parseOpts = {};
      var isOk = true;
      var ids = '';
      var dataAttribute = this.dataAttribute;
      var alias = dataAttribute.alias;

      while (el && el !== document.documentElement) {
        dataAttribute.getDataSetObj(dataSetObj, attrs, el.dataset);

        // 如果第一个层级有值，跳出循环
        if (dataSetObj[alias.ea]) {
          break;
        }

        el = el.parentNode;
      }

      // 检查ea,eb,ec是否有值
      isOk = dataAttribute.checkDataSetValue(dataSetObj, attrs.slice(0, 3));
      if (isOk) {
        dataSetArr = dataAttribute.getDataSetArr(dataSetObj, attrs);
        parseOpts = this.parseOption(dataSetArr.pop());
        ids = this._getIdsStr.apply(this, toConsumableArray(dataSetArr));
        this._call(method, ids, parseOpts);
      }
    }

    /**
     * 获取事件ID数组
     * @return {Array}
     */

  }, {
    key: '_getIds',
    value: function _getIds() {
      var configMap = this.options.configMap;
      var current = configMap;
      var cid = [];

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      for (var i = 0, l = args.length; i < l; i++) {
        current = current[args[i]];

        if (typeof current !== 'undefined') {
          current.id && cid.push(current.id);
        }
      }

      return cid;
    }

    /**
     * 获取事件ID字符串
     * @return {String}
     */

  }, {
    key: '_getIdsStr',
    value: function _getIdsStr() {
      return this._getIds.apply(this, arguments).join('.');
    }

    /**
     * 输出日志
     * @param {String} msg
     */

  }, {
    key: '_log',
    value: function _log(msg) {
      var debug = this.options.debug;

      if (debug) {
        info(msg);
      }
    }

    /**
     * 检查事件ID格式
     * @param {String|Object} eventID
     * @return {Boolean}
     */

  }, {
    key: '_checkEventID',
    value: function _checkEventID(eventID) {
      if (isString(eventID)) {
        var arrEventIds = eventID.split('.');

        if (arrEventIds.length === 3) {
          return true;
        }
      } else if (isObject(eventID)) {
        if (hasOwn.call(eventID, 'ea') && hasOwn.call(eventID, 'eb') && hasOwn.call(eventID, 'ec')) {
          return true;
        }
      }

      return false;
    }

    /**
     * 方法调用
     * @param {String} method 调用方法，pageview/event
     * @param {String|Object} eventID
     * @param {Object} params
     * @return {Boolean}
     */

  }, {
    key: '_call',
    value: function _call(method, eventID, params) {
      params = params || {};

      // 检查事件ID格式是否正确
      if (!this._checkEventID(eventID)) {
        return this._log('事件ID格式错误，应该为30000.1.1或者{ea: "home", eb: "search", ec: "btn"}');
      }

      var commonParams = this.getCommonParams();
      var mergeParams = {};
      var ids = '';

      if (isString(eventID)) {
        ids = eventID;
      } else if (isObject(eventID)) {
        ids = this._getIdsStr(eventID.ea, eventID.eb, eventID.ec);
      }

      if (!ids) {
        return false;
      }

      mergeParams = assign(commonParams, params);
      each(this.platform, function (p) {
        p[method](ids, mergeParams);
      });

      return true;
    }
  }]);
  return Bimta;
}();

return Bimta;

})));
