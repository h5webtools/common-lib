/**
 * 工具库
 */

/**
 * 获取querystring
 * @param {String} name
 * @param {String} [url] url为空则表从当前页面的url中取
 * @return {String|Null}
 */
export function getQuery(name, url) {
  const u = url || window.location.search.replace('&amp;', '&');
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = u.substr(u.indexOf('?') + 1).match(reg);

  return r != null ? r[2] : '';
}

/**
 * 获取cookie
 * @param {String} name
 * @return {String|Null}
 */
export function getCookie(name) {
  const reg = new RegExp(`(^| )${name}(?:=([^;]*))?(;|$)`);
  const val = document.cookie.match(reg);

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
export function delCookie(name, path, domain, secure) {
  const value = getCookie(name);

  if (value != null) {
    const exp = new Date();
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
export function setCookie(name, value, expires = null, path = '/', domain = null, secure = false) {
  const exp = new Date();

  if (expires) {
    exp.setTime(exp.getTime() + (expires * 24 * 3600 * 1000));
  }

  document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
}

/**
 * 是否支持Storage
 * @return {Boolean}
 */
export function supportStorage() {
  // safari隐私模式，无法写缓存，会进入catch
  try {
    const ls = sessionStorage;
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
export function getFormatPrice(price) {
  return String(price).replace(/(\d{1,3})(?=(\d{3})+(\.\d*)?$)/g, '$1,');
}

/**
 * 日期格式化
 * @param {String} str 格式为yyyymm或者yyyymmdd
 * @return {String}
 */
export function formatDate(str) {
  /* eslint-disable arrow-body-style */
  return str.replace(/(\d{4})(\d{2})(\d{2})?/g, ($1, $2, $3, $4) => {
    return !$4 ? `${$2}-${$3}` : `${$2}-${$3}-${$4}`;
  });
}

/**
 * 金额转换为元
 * @param {Number} num 金额，单位：分
 * @param {Boolean} [format] 是否保留两位小数
 * @return {Number}
 */
export function getYuan(num, format) {
  return format ? (num / 100).toFixed(2) : num / 100;
}
