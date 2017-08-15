/**
 * 工具函数
 */

export const hasOwn = Object.prototype.hasOwnProperty;
export const toStr = Object.prototype.toString;

/**
 * 检查是否函数数组
 * @param {Function[]} fns
 * @return {Boolean}
 */
export function checkFunctionArray(fns) {
  return fns.every(fn => isFunction(fn));
}

/**
 * 是否是函数
 * @param {Function} fn
 * @return {Boolean}
 */
export function isFunction(fn) {
  return typeof fn === 'function';
}

/**
 * 是否是对象
 * @param {Object} obj
 * @return {Boolean}
 */
export function isObject(obj) {
  return toStr.call(obj) === '[object Object]';
}

/**
 * 加载脚本
 * @param {String} url 加载URL
 * @param {Function} fnSuccess 加载成功执行
 * @param {Function} fnFailed 加载失败执行
 */
export function loadScript(url, fnSuccess, fnFailed) {
  const oScript = document.createElement('script');

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
export function ajaxGet(options, fnSuccess, fnError) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
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
      const result = [];
      for (const i in data) {
        result.push(`${encodeURIComponent(i)}=${encodeURIComponent(data[i])}`);
      }
      return result.join('&');
    }

    return data;
  }
}
