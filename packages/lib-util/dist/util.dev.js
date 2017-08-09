(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Util = global.Util || {})));
}(this, (function (exports) { 'use strict';

/**
 * 工具库
 */

/**
 * 获取querystring
 * @param {String} name
 * @param {String} [url] url为空则表从当前页面的url中取
 * @return {String|Null}
 */
function getQuery(name, url) {
  var u = url || window.location.search.replace('&amp;', '&');
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = u.substr(u.indexOf('?') + 1).match(reg);

  return r != null ? r[2] : '';
}

/**
 * 获取cookie
 * @param {String} name
 * @return {String|Null}
 */
function getCookie(name) {
  var reg = new RegExp('(^| )' + name + '(?:=([^;]*))?(;|$)');
  var val = document.cookie.match(reg);

  if (val) {
    return val[2] ? unescape(val[2]) : '';
  }
  return null;
}

/**
 * 删除cookie
 * @param {String} name
 * @param {String} [path]
 * @param {String} [domain]
 * @param {Boolean} [secure]
 */
function delCookie(name, path, domain, secure) {
  var value = getCookie(name);

  if (value != null) {
    var exp = new Date();
    exp.setMinutes(exp.getMinutes() - 1000);
    path = path || '/';
    /* eslint-disable prefer-template,max-len */
    document.cookie = name + '=;expires=' + exp.toGMTString() + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
  }
}

/**
 * 写入cookie
 * @param {String} name
 * @param {String} value
 * @param {Number} [expires]
 * @param {Stirng} [path]
 * @param {String} [domain]
 * @param {Boolean} [secure]
 */
function setCookie(name, value) {
  var expires = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';
  var domain = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var secure = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

  var exp = new Date();

  if (expires) {
    exp.setTime(exp.getTime() + expires * 24 * 3600 * 1000);
  }

  document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
}

/**
 * 是否支持Storage
 * @return {Boolean}
 */
function supportStorage() {
  // safari隐私模式，无法写缓存，会进入catch
  try {
    var ls = sessionStorage;
    ls.setItem('testSafariPrivate', true);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 价格格式化
 * @param {Number|String} price
 * @return {String}
 */
function getFormatPrice(price) {
  return String(price).replace(/(\d{1,3})(?=(\d{3})+(\.\d*)?$)/g, '$1,');
}

/**
 * 日期格式化
 * @param {String} str 格式为yyyymm或者yyyymmdd
 * @return {String}
 */
function formatDate(str) {
  /* eslint-disable arrow-body-style */
  return str.replace(/(\d{4})(\d{2})(\d{2})?/g, function ($1, $2, $3, $4) {
    return !$4 ? $2 + '-' + $3 : $2 + '-' + $3 + '-' + $4;
  });
}

/**
 * 金额转换为元
 * @param {Number} num 金额，单位：分
 * @param {Boolean} [format] 是否保留两位小数
 * @return {Number}
 */
function getYuan(num, format) {
  return format ? (num / 100).toFixed(2) : num / 100;
}

exports.getQuery = getQuery;
exports.getCookie = getCookie;
exports.delCookie = delCookie;
exports.setCookie = setCookie;
exports.supportStorage = supportStorage;
exports.getFormatPrice = getFormatPrice;
exports.formatDate = formatDate;
exports.getYuan = getYuan;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=util.dev.js.map
