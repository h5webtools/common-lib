# API

```javascript
import ajax from '@jyb/lib-ajax'
```

## 调用

```javascript
ajax(options);
```

## 选项

```javascript
{
  // (默认： “GET”)：请求方法 (“GET”, “POST”, or other)
  type: 'GET',
  // (默认： 当前地址)：发送请求的地址
  url: '',
  // (默认：none)：发送到服务器的数据；如果是GET请求，它会自动被作为参数拼接到url上。非String对象序列化字符串。
  data: {},
  // (默认： “application/x-www-form-urlencoded”)： 发送信息至服务器时内容编码类型。 (这也可以通过设置 headers)。通过设置 false 跳过设置默认值。
  contentType: '',
  // (默认： none)：预期服务器返回的数据类型(“json”, “jsonp”, “xml”, “html”, or “text”)
  dataType: '',
  // Ajax请求中额外的HTTP信息头对象
  headers: {},
  // (默认：true): 默认设置下，所有请求均为异步。如果需发送同步请求，请将此设置为 false
  async: true,
  // 请求发出前调用，它接收xhr对象和settings作为参数对象。如果它返回 false ，请求将被取消。beforeSend(xhr, settings)
  beforeSend: empty,
  // 请求成功之后调用。传入返回后的数据，以及包含成功代码的字符串。success(data, status, xhr)
  success: empty,
  // 请求出错时调用。 (超时，解析错误，或者状态码不在HTTP 2xx)。error(xhr, errorType, error)
  error: empty,
  // 请求完成时调用，无论请求失败或成功。complete(xhr, status)
  complete: empty,
  // (默认：window): 这个对象用于设置Ajax相关回调函数的上下文(this指向)。
  context: null,
  // Transport
  xhr: function () {
    return new window.XMLHttpRequest()
  },
  // MIME types mapping
  accepts: {
    script: 'text/javascript, application/javascript',
    json:   jsonType,
    xml:    'application/xml, text/xml',
    html:   htmlType,
    text:   'text/plain'
  },
  // (默认：0): 以毫秒为单位的请求超时时间, 0 表示不超时。
  timeout: 0
}
```
