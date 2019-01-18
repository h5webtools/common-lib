# API

```javascript
import DxCaptcha from '@jyb/lib-dx-captcha'
```

## 初始化

### new DxCaptcha(el, options);

```jsdoc
@param {HTMLElement} el 元素
@param {Object} options 选项
```

## 选项options

### isAuto
- Type: `Boolean`
- Default: false

是否自动reload验证码

### scriptUrl
- Type: `String`
- Default: 'https://cdn.dingxiang-inc.com/ctu-group/captcha-ui/index.js'

验证码资源链接

### captchaOptions
- Type: `Object`
- Default: {}

验证码配置项，[文档](https://cdn.dingxiang-inc.com/public-service/docs/captcha/dev/front-end/params.html)

## 实例属性

### dxCaptcha

```javascript
// 方法：https://cdn.dingxiang-inc.com/public-service/docs/captcha/dev/front-end/type-basic/method.html
// 事件：https://cdn.dingxiang-inc.com/public-service/docs/captcha/dev/front-end/type-basic/event.html
DxCaptcha.dxCaptcha
```

## 实例方法

### reload()

启动上报

### show()

`style`为`popup`时候有效

### hide()

隐藏验证码
