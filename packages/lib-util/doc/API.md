# API

```javascript
import * as util from '@jyb/lib-util'
```

## 函数

### getQuery(name, url)

获取querystring

```jsdoc
/**
 * 获取querystring
 * @param {String} name
 * @param {String} [url] url为空则表从当前页面的url中取
 * @return {String|Null}
 */
```

```javascript
util.getQuery('tel');
```

### getCookie(name)

获取cookie

```jsdoc
/**
 * 获取cookie
 * @param {String} name
 * @return {String|Null}
 */
```

```javascript
util.getCookie('userid');
```

### delCookie(name, path, domain, secure)

删除cookie

```jsdoc
/**
 * 删除cookie
 * @param {String} name
 * @param {String} [path]
 * @param {String} [domain]
 * @param {Boolean} [secure]
 * @return {Undefined}
 */
```

```javascript
util.delCookie('userid');
```

### setCookie(name, value, expires = null, path = '/', domain = null, secure = false)

写入cookie

```jsdoc
/**
 * 写入cookie
 * @param {String} name
 * @param {String} value
 * @param {Number} [expires]
 * @param {Stirng} [path]
 * @param {String} [domain]
 * @param {Boolean} [secure]
 * @return {Undefined}
 */
```

```javascript
util.setCookie('userid', '123456');
```

### supportStorage()

是否支持Storage

```jsdoc
/**
 * 是否支持Storage
 * @return {Boolean}
 */
```

```javascript
util.supportStorage();
```

### getFormatPrice(price)

价格格式化

```jsdoc
/**
 * 价格格式化
 * @param {Number|String} price
 * @return {String}
 */
```

```javascript
util.getFormatPrice(123456); // 123,456
```

### formatDate(str)

日期格式化

```jsdoc
/**
 * 日期格式化
 * @param {String} str 格式为yyyymm或者yyyymmdd
 * @return {String}
 */
```

```javascript
util.formatDate('20170809'); // 2017-08-09
util.formatDate('201708'); // 2017-08
```

### getYuan(num, format)

金额转换为元

```jsdoc
/**
 * 金额转换为元
 * @param {Number} num 金额，单位：分
 * @param {Boolean} [format] 是否保留两位小数
 * @return {Number}
 */
```

```javascript
util.getYuan('1000'); // 10
util.getYuan('1000', true); // 10.00
```

