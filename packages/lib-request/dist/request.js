(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Request = factory());
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

var promise = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
		module.exports = factory();
	})(commonjsGlobal, function () {
		'use strict';

		var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
			return typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
		} : function (obj) {
			return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
		};

		/**
   * promise
   */

		/* eslint-disable */

		var PromisePolyfill = function PromisePolyfill(executor) {
			if (!(this instanceof PromisePolyfill)) throw new Error("Promise must be called with `new`");
			if (typeof executor !== "function") throw new TypeError("executor must be a function");

			var self = this,
			    resolvers = [],
			    rejectors = [],
			    resolveCurrent = handler(resolvers, true),
			    rejectCurrent = handler(rejectors, false);
			var instance = self._instance = { resolvers: resolvers, rejectors: rejectors };
			var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout;

			function handler(list, shouldAbsorb) {
				return function execute(value) {
					var then;
					try {
						if (shouldAbsorb && value != null && ((typeof value === "undefined" ? "undefined" : _typeof$$1(value)) === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
							if (value === self) throw new TypeError("Promise can't be resolved w/ itself");
							executeOnce(then.bind(value));
						} else {
							callAsync(function () {
								if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value);
								for (var i = 0; i < list.length; i++) {
									list[i](value);
								}resolvers.length = 0, rejectors.length = 0;
								instance.state = shouldAbsorb;
								instance.retry = function () {
									execute(value);
								};
							});
						}
					} catch (e) {
						rejectCurrent(e);
					}
				};
			}
			function executeOnce(then) {
				var runs = 0;
				function run(fn) {
					return function (value) {
						if (runs++ > 0) return;
						fn(value);
					};
				}
				var onerror = run(rejectCurrent);
				try {
					then(run(resolveCurrent), onerror);
				} catch (e) {
					onerror(e);
				}
			}

			executeOnce(executor);
		};
		PromisePolyfill.prototype.then = function (onFulfilled, onRejection) {
			var self = this,
			    instance = self._instance;
			function handle(callback, list, next, state) {
				list.push(function (value) {
					if (typeof callback !== "function") next(value);else try {
						resolveNext(callback(value));
					} catch (e) {
						if (rejectNext) rejectNext(e);
					}
				});
				if (typeof instance.retry === "function" && state === instance.state) instance.retry();
			}
			var resolveNext, rejectNext;
			var promise = new PromisePolyfill(function (resolve, reject) {
				resolveNext = resolve, rejectNext = reject;
			});
			handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false);
			return promise;
		};
		PromisePolyfill.prototype.catch = function (onRejection) {
			return this.then(null, onRejection);
		};
		PromisePolyfill.prototype.finally = function (callback) {
			return this.then(function (value) {
				return PromisePolyfill.resolve(callback()).then(function () {
					return value;
				});
			}, function (reason) {
				return PromisePolyfill.resolve(callback()).then(function () {
					return PromisePolyfill.reject(reason);
				});
			});
		};
		PromisePolyfill.resolve = function (value) {
			if (value instanceof PromisePolyfill) return value;
			return new PromisePolyfill(function (resolve) {
				resolve(value);
			});
		};
		PromisePolyfill.reject = function (value) {
			return new PromisePolyfill(function (resolve, reject) {
				reject(value);
			});
		};
		PromisePolyfill.all = function (list) {
			return new PromisePolyfill(function (resolve, reject) {
				var total = list.length,
				    count = 0,
				    values = [];
				if (list.length === 0) resolve([]);else for (var i = 0; i < list.length; i++) {
					(function (i) {
						function consume(value) {
							count++;
							values[i] = value;
							if (count === total) resolve(values);
						}
						if (list[i] != null && (_typeof$$1(list[i]) === "object" || typeof list[i] === "function") && typeof list[i].then === "function") {
							list[i].then(consume, reject);
						} else consume(list[i]);
					})(i);
				}
			});
		};
		PromisePolyfill.race = function (list) {
			return new PromisePolyfill(function (resolve, reject) {
				for (var i = 0; i < list.length; i++) {
					list[i].then(resolve, reject);
				}
			});
		};

		if (typeof window.Promise === "undefined") {
			window.Promise = PromisePolyfill;
		} else if (!window.Promise.prototype.finally) {
			window.Promise.prototype.finally = PromisePolyfill.prototype.finally;
		}

		var index = window.Promise;

		return index;
	});
});

function stringify(object) {
  if (Object.prototype.toString.call(object) !== '[object Object]') return '';

  var args = [];
  for (var key in object) {
    destructure(key, object[key]);
  }

  return args.join('&');

  function destructure(key, value) {
    if (Array.isArray(value)) {
      for (var i = 0; i < value.length; i++) {
        destructure(key + '[' + i + ']', value[i]);
      }
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      for (var _i in value) {
        destructure(key + '[' + _i + ']', value[_i]);
      }
    } else args.push(encodeURIComponent(key) + (value != null && value !== '' ? '=' + encodeURIComponent(value) : ''));
  }
}

function parse(string) {
  if (string === '' || string == null) return {};
  if (string.charAt(0) === '?') string = string.slice(1);

  var entries = string.split('&');
  var data = {};
  var counters = {};
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i].split('=');
    var key = decodeURIComponent(entry[0]);
    var value = entry.length === 2 ? decodeURIComponent(entry[1]) : '';

    if (value === 'true') value = true;else if (value === 'false') value = false;

    var levels = key.split(/\]\[?|\[/);
    var cursor = data;
    if (key.indexOf('[') > -1) levels.pop();
    for (var j = 0; j < levels.length; j++) {
      var level = levels[j];
      var nextLevel = levels[j + 1];
      /* eslint eqeqeq:off */
      var isNumber = nextLevel == '' || !isNaN(parseInt(nextLevel, 10));
      var isValue = j === levels.length - 1;
      if (level === '') {
        var k = levels.slice(0, j).join();
        if (counters[k] == null) counters[k] = 0;
        level = counters[k]++;
      }
      if (cursor[level] == null) {
        var val = isNumber ? [] : {};
        cursor[level] = isValue ? value : val;
      }
      cursor = cursor[level];
    }
  }
  return data;
}

var queryString = {
  stringify: stringify,
  parse: parse
};

var FILE_PROTOCOL_REGEX = new RegExp('^file://', 'i');

/* eslint max-len:off */

var Request = function () {
  function Request() {
    classCallCheck(this, Request);

    this.callbackCount = 0;
    this.qs = queryString;
    this.oncompletion = function () {};
  }

  createClass(Request, [{
    key: 'setCompletionCallback',
    value: function setCompletionCallback(callback) {
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

  }, {
    key: 'ajax',
    value: function ajax(args, extra) {
      var finalize = finalizer(this.oncompletion);
      args = normalize(args, extra);

      var promise$$1 = new promise(function (resolve, reject) {
        if (args.method == null) args.method = 'GET';
        args.method = args.method.toUpperCase();
        var useBody = true;
        if (args.method === 'GET' || args.method === 'TRACE') {
          useBody = false;
        } else if (typeof args.useBody === 'boolean') {
          useBody = args.useBody;
        }
        if (typeof args.serialize !== 'function') {
          args.serialize = typeof FormData !== 'undefined' && args.data instanceof FormData ? function (value) {
            return value;
          } : JSON.stringify;
        }
        if (typeof args.deserialize !== 'function') args.deserialize = deserialize;
        if (typeof args.extract !== 'function') args.extract = extract;

        if (useBody) {
          args.data = args.serialize(args.data);
        } else {
          args.url = assemble(args.url, args.data);
        }

        var xhr = new window.XMLHttpRequest();
        var aborted = false;
        var _abort = xhr.abort;

        xhr.abort = function abort() {
          aborted = true;
          _abort.call(xhr);
        };

        xhr.open(args.method, args.url, typeof args.async === 'boolean' ? args.async : true, typeof args.user === 'string' ? args.user : undefined, typeof args.password === 'string' ? args.password : undefined);

        if (args.serialize === JSON.stringify && useBody && !(args.headers && {}.hasOwnProperty.call(args.headers, 'Content-Type'))) {
          xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        }
        if (args.deserialize === deserialize && !(args.headers && {}.hasOwnProperty.call(args.headers, 'Accept'))) {
          xhr.setRequestHeader('Accept', 'application/json, text/*');
        }
        if (args.withCredentials) xhr.withCredentials = args.withCredentials;

        if (args.timeout) xhr.timeout = args.timeout;

        for (var key in args.headers) {
          if ({}.hasOwnProperty.call(args.headers, key)) {
            xhr.setRequestHeader(key, args.headers[key]);
          }
        }

        if (typeof args.config === 'function') xhr = args.config(xhr, args) || xhr;

        xhr.onreadystatechange = function () {
          // Don't throw errors on xhr.abort().
          if (aborted) return;
          if (xhr.readyState === 4) {
            try {
              var response = args.extract !== extract ? args.extract(xhr, args) : args.deserialize(args.extract(xhr, args));
              if (args.extract !== extract || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 || FILE_PROTOCOL_REGEX.test(args.url)) {
                var res = cast(args.type, response);
                resolve(res);
              } else {
                var error = new Error(xhr.responseText);
                error.code = xhr.status;
                error.response = response;
                reject(error);
              }
            } catch (e) {
              reject(e);
            }
          }
        };

        if (useBody && args.data != null) xhr.send(args.data);else xhr.send();
      });
      return args.background === true ? promise$$1 : finalize(promise$$1);
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

  }, {
    key: 'jsonp',
    value: function jsonp(args, extra) {
      var _this = this;

      var finalize = finalizer(this.oncompletion);
      args = normalize(args, extra);

      var promise$$1 = new promise(function (resolve, reject) {
        var callbackName = args.callbackName || '_boxes_' + Math.round(Math.random() * 1e16) + '_' + _this.callbackCount++;
        var script = window.document.createElement('script');
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
      });
      return args.background === true ? promise$$1 : finalize(promise$$1);
    }
  }]);
  return Request;
}();

function assemble(url, data) {
  var querystring = queryString.stringify(data);
  if (querystring !== '') {
    var prefix = url.indexOf('?') < 0 ? '?' : '&';
    url += prefix + querystring;
  }
  return url;
}

function deserialize(data) {
  try {
    return data !== '' ? JSON.parse(data) : null;
  } catch (e) {
    throw new Error('Invalid JSON: ' + data);
  }
}

function extract(xhr) {
  return xhr.responseText;
}

function cast(Type, data) {
  if (typeof Type === 'function') {
    if (Array.isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        data[i] = new Type(data[i]);
      }
    } else {
      return new Type(data);
    }
  }
  return data;
}

function finalizer(oncompletion) {
  var count = 0;
  function complete() {
    if (--count === 0 && typeof oncompletion === 'function') {
      oncompletion();
    }
  }

  return function finalize(promise$$1) {
    var then = promise$$1.then;
    promise$$1.then = function () {
      count++;
      /* eslint prefer-rest-params:off */
      var next = then.apply(promise$$1, arguments);
      next.then(complete, function (e) {
        complete();
        if (count === 0) throw e;
      });
      return finalize(next);
    };
    return promise$$1;
  };
}

function normalize(args, extra) {
  if (typeof args === 'string') {
    var url = args;
    args = extra || {};
    if (args.url == null) args.url = url;
  }
  return args;
}

return Request;

})));
