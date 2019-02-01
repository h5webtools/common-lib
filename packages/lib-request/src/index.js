
import Promise from '@jyb/lib-promise';
import queryString from './querystring';

const FILE_PROTOCOL_REGEX = new RegExp('^file://', 'i');

/* eslint max-len:off */

class Request {
  constructor() {
    this.callbackCount = 0;
    this.qs = queryString;
    this.oncompletion = () => {};
  }
  setCompletionCallback(callback) {
    this.oncompletion = callback;
  }
  /**
   * request([url,] options)
   * @param {String} [url] 发送请求的URL
   * @param {String} [options.method] 要使用的HTTP方法，可以为GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS，默认为GET
   * @param {String} options.url 发送请求的URL
   * @param {Any} [options.data] 发送的数据
   * @param {Boolean} [options.async] 请求是否是异步的，默认为true
   * @param {String} [options.user] HTTP授权的用户名，默认为undefined
   * @param {String} [options.password] HTTP授权的密码，默认为undefined
   * @param {Boolean} [options.withCredentials] 是否将cookie发送到第三方域，默认为false
   * @param {Number} [options.timeout] 请求在自动终止之前的毫秒数，默认为undefined
   * @param {String} [options.responseType] 预期的响应类型，默认为undefined
   * @param {Function} [options.config] xhr = Function(xhr)
   * @param {Object} [options.headers] 在发送请求之前附加到请求的标头
   * @param {Function} [options.type] 要应用于响应中每个对象的构造函数，any = Function(any)
   * @param {Function} [options.serialize] 一种应用于数据的序列化方法。默认为JSON.stringify，或者如果options.data是FormData的实例，则默认为identity函数（即function（value）{return value}）
   * @param {Function} [options.deserialize] 要应用于xhr.responseText的反序列化方法。默认为JSON.parse，为空响应返回null。如果定义了extract，则将跳过反序列化
   * @param {Function} [options.extract] any = Function(xhr, options)
   * @param {Boolean} [options.useBody] 当设置为true时，强制在GET请求中使用HTTP正文部分，或者在设置为false时对其他HTTP方法使用查询字符串。 GET请求默认为false，其他方法默认为true
   * @param {Boolean} [options.background]
   */
  ajax(args, extra) {
    const finalize = finalizer(this.oncompletion);
    args = normalize(args, extra);

    const promise = new Promise(((resolve, reject) => {
      if (args.method == null) args.method = 'GET';
      args.method = args.method.toUpperCase();
      let useBody = true;
      if (args.method === 'GET' || args.method === 'TRACE') {
        useBody = false;
      } else if (typeof args.useBody === 'boolean') {
        useBody = args.useBody;
      }
      if (typeof args.serialize !== 'function') {
        args.serialize = (typeof FormData !== 'undefined' && args.data instanceof FormData) ?
          function (value) { return value; } :
          JSON.stringify;
      }
      if (typeof args.deserialize !== 'function') args.deserialize = deserialize;
      if (typeof args.extract !== 'function') args.extract = extract;

      if (useBody) {
        args.data = args.serialize(args.data);
      } else {
        args.url = assemble(args.url, args.data);
      }

      let xhr = new window.XMLHttpRequest();
      let aborted = false;
      const _abort = xhr.abort;

      xhr.abort = function abort() {
        aborted = true;
        _abort.call(xhr);
      };

      xhr.open(
        args.method,
        args.url,
        typeof args.async === 'boolean' ? args.async : true,
        typeof args.user === 'string' ? args.user : undefined,
        typeof args.password === 'string' ? args.password : undefined
      );

      if (args.serialize === JSON.stringify && useBody &&
        !(args.headers && {}.hasOwnProperty.call(args.headers, 'Content-Type'))) {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      }
      if (args.deserialize === deserialize && !(args.headers && {}.hasOwnProperty.call(args.headers, 'Accept'))) {
        xhr.setRequestHeader('Accept', 'application/json, text/*');
      }
      if (args.withCredentials) xhr.withCredentials = args.withCredentials;

      if (args.timeout) xhr.timeout = args.timeout;

      for (const key in args.headers) {
        if ({}.hasOwnProperty.call(args.headers, key)) {
          xhr.setRequestHeader(key, args.headers[key]);
        }
      }

      if (typeof args.config === 'function') xhr = args.config(xhr, args) || xhr;

      xhr.onreadystatechange = () => {
        // Don't throw errors on xhr.abort().
        if (aborted) return;
        if (xhr.readyState === 4) {
          try {
            const response = (args.extract !== extract) ? args.extract(xhr, args) : args.deserialize(args.extract(xhr, args));
            if (args.extract !== extract || (xhr.status >= 200 && xhr.status < 300) ||
              xhr.status === 304 || FILE_PROTOCOL_REGEX.test(args.url)) {
              const res = cast(args.type, response);
              resolve(res);
            } else {
              const error = new Error(xhr.responseText);
              error.code = xhr.status;
              error.response = response;
              reject(error);
            }
          } catch (e) {
            reject(e);
          }
        }
      };

      if (useBody && (args.data != null)) xhr.send(args.data);
      else xhr.send();
    }));
    return args.background === true ? promise : finalize(promise);
  }
  /**
   * jsonp([url,] options)
   * @param {String} [url] 发送请求的URL
   * @param {String} options.url 发送请求的URL
   * @param {Any} [options.data] 发送的数据
   * @param {Function} [options.type] 要应用于响应中每个对象的构造函数，any = Function(any)
   * @param {String} [options.callbackName] 回调调用的函数的名称，默认随机
   * @param {String} [options.callbackKey] 回调名称的查询字符串参数名称，默认为callback
   * @param {Boolean} [options.background]
   */
  jsonp(args, extra) {
    const finalize = finalizer(this.oncompletion);
    args = normalize(args, extra);

    const promise = new Promise(((resolve, reject) => {
      const callbackName = args.callbackName || `_boxes_${Math.round(Math.random() * 1e16)}_${this.callbackCount++}`;
      const script = window.document.createElement('script');
      window[callbackName] = function (data) {
        script.parentNode.removeChild(script);
        resolve(cast(args.type, data));
        delete window[callbackName];
      };
      script.onerror = function () {
        script.parentNode.removeChild(script);
        reject(new Error('JSONP request failed'));
        delete window[callbackName];
      };
      if (args.data == null) args.data = {};
      args.data[args.callbackKey || 'callback'] = callbackName;
      script.src = assemble(args.url, args.data);
      window.document.documentElement.appendChild(script);
    }));
    return args.background === true ? promise : finalize(promise);
  }
}

export default Request;

function assemble(url, data) {
  const querystring = queryString.stringify(data);
  if (querystring !== '') {
    const prefix = url.indexOf('?') < 0 ? '?' : '&';
    url += prefix + querystring;
  }
  return url;
}

function deserialize(data) {
  try {
    return data !== '' ? JSON.parse(data) : null;
  } catch (e) {
    throw new Error(`Invalid JSON: ${data}`);
  }
}

function extract(xhr) {
  return xhr.responseText;
}

function cast(Type, data) {
  if (typeof Type === 'function') {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        data[i] = new Type(data[i]);
      }
    } else {
      return new Type(data);
    }
  }
  return data;
}

function finalizer(oncompletion) {
  let count = 0;
  function complete() {
    if (--count === 0 && typeof oncompletion === 'function') {
      oncompletion();
    }
  }

  return function finalize(promise) {
    const then = promise.then;
    promise.then = function () {
      count++;
      /* eslint prefer-rest-params:off */
      const next = then.apply(promise, arguments);
      next.then(complete, (e) => {
        complete();
        if (count === 0) throw e;
      });
      return finalize(next);
    };
    return promise;
  };
}

function normalize(args, extra) {
  if (typeof args === 'string') {
    const url = args;
    args = extra || {};
    if (args.url == null) args.url = url;
  }
  return args;
}
