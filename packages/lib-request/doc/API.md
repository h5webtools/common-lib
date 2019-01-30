# API

```javascript
import Request from '@jyb/lib-request';
```

## 初始化

### new Request();

```javascript
const request = new Request();
```

## 实例方法

### ajax([url,] options)

```javascript
/**
  * ajax([url,] options)
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
```

```javascript
request.ajax(...);
```

### jsonp([url,] options)

```javascript
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
```

```javascript
request.jsonp(...);
```


