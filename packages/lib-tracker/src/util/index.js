/**
 * util
 */

import leftPad from './left_pad';
import env from './env';

const hasOwn = Object.prototype.hasOwnProperty;
const rhashcode = /\d\.\d{4}/;
let networkType = '';

// 立即获取网络类型
getNetworkType();

/**
 * location.pathname（用/分割后）的下标为1的字符串
 */
function getFirstPathName() {
  const link = window.location.href;
  const arrLink = link.slice(link.indexOf('://') + 3).split(/\/+/);

  return arrLink.length > 2 ? arrLink[1] : '';
}

/**
 * 获取平台信息
 */
function getPlatform() {
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
function makeHashCode(prefix) {
  prefix = prefix || 'g_tracker';
  return String(Math.random() + Math.random()).replace(rhashcode, prefix);
}

/**
 * 获取网络类型
 */
function getNetworkType() {
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
function isError(value) {
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
function getTime() {
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
function proxy(to, from, key) {
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

export default {
  getFirstPathName,
  getPlatform,
  getTime,
  makeHashCode,
  networkType,
  isError,
  proxy
};
