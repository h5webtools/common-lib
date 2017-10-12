/**
 * util
 */

import leftPad from './left_pad';
import env from './env';

const hasOwn = Object.prototype.hasOwnProperty;
const toStr = Object.prototype.toString;
const rhashcode = /\d\.\d{4}/;
const UUID_KEY = '__TRACKER_UUID__';
let networkType = '';

// 立即获取网络类型
getNetworkType();

/**
 * 是否对象类型
 * @param {Object} obj
 */
export function isObject(obj) {
  return toStr.call(obj) === '[object Object]';
}

/**
 * 获取用户ID
 */
export function getCustId() {
  return getQuery('userid') || getCookie('userid') || '';
}

/**
 * 从querystring获取
 * @param {String} name
 */
export function getQuery(name) {
  // 参数：变量名，url为空则表从当前页面的url中取
  /* eslint-disable prefer-rest-params,prefer-template,no-useless-escape */
  const u = arguments[1] || window.location.search.replace('&amp;', '&');
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const r = u.substr(u.indexOf('\?') + 1).match(reg);

  return r != null ? r[2] : '';
}

/**
 * 从cookie获取信息
 * @param {*} name
 */
export function getCookie(name) {
  // 读取COOKIE
  const reg = new RegExp('(^| )' + name + '(?:=([^;]*))?(;|$)');
  const val = document.cookie.match(reg);

  /* eslint-disable no-nested-ternary */
  return val ? (val[2] ? unescape(val[2]) : '') : null;
}

/**
 * 生成uuid，并存储
 */
export function getUUID() {
  try {
    let uuid = window.localStorage.getItem(UUID_KEY);

    if (!uuid) {
      uuid = makeHashCode();
      window.localStorage.setItem(UUID_KEY, uuid);
    }
    return uuid;
  } catch (e) {
    return makeHashCode();
  }
}

/**
 * location.pathname（用/分割后）的下标为1的字符串
 */
export function getFirstPathName() {
  const link = window.location.href;
  const arrLink = link.slice(link.indexOf('://') + 3).split(/\/+/);

  return arrLink.length > 2 ? arrLink[1] : '';
}

/**
 * 获取平台信息
 */
export function getPlatform() {
  let platformStr = '';

  if (env.android) {
    platformStr = 'android';
  } else if (env.ios) {
    platformStr = 'ios';
  }

  return platformStr;
}

/**
 * 获取ID
 * @param {String} prefix 前缀
 * @return {String}
 */
export function makeHashCode(prefix) {
  prefix = prefix || 'g_tracker';
  return String(Math.random() + Math.random()).replace(rhashcode, prefix);
}

/**
 * 获取网络类型
 */
export function getNetworkType() {
  if (networkType) {
    return networkType;
  }

  if (env.jyb && typeof wv !== 'undefined') {
    /* global wv */
    wv.ready(() => {
      wv.getNetworkType({
        complete(res) {
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
export function isError(value) {
  switch (Object.prototype.toString.call(value)) {
    case '[object Error]': return true;
    case '[object Exception]': return true;
    case '[object DOMException]': return true;
    default: return value instanceof Error;
  }
}

/**
 * 获取时间
 */
export function getTime() {
  const oDate = new Date();
  const year = oDate.getFullYear();
  const month = leftPad(oDate.getMonth() + 1, 2, '0');
  const date = leftPad(oDate.getDate(), 2, '0');
  const hours = leftPad(oDate.getHours(), 2, '0');
  const minutes = leftPad(oDate.getMinutes(), 2, '0');
  const second = leftPad(oDate.getSeconds(), 2, '0');

  return `${year}-${month}-${date} ${hours}:${minutes}:${second}`;
}

/**
 * proxy
 * @param {Object} to
 * @param {Object} from
 * @param {String} key
 */
export function proxy(to, from, key) {
  if (hasOwn.call(to, key)) return;
  Object.defineProperty(to, key, {
    enumerable: true,
    configurable: true,
    get() {
      return from[key];
    },
    set(val) {
      from[key] = val;
    }
  });
}

