# API

```javascript
import SmsCode from '@jyb/lib-sms-code';
```

## 初始化

### new SmsCode(options);

```jsdoc
@param {Object} options
@param {String} options.el 滑动验证码容器，如果元素不存在会自动创建
@param {Boolean} options.disabled 是否禁用滑动验证码
@param {String} options.cssText 样式文本，会插入到head标签里面
@param {String} options.reqHost 请求域名
@param {Object} options.captchaOptions 滑动验证码选项，详细查看http://doc.fe.jyb.com/book/common-lib/packages/lib-dx-captcha/doc/API.html
```

默认配置项：

```javascript
const defaultOptions = {
  el: '#__dx-captcha',
  disabled: false,
  cssText: '.dx_captcha_clickword_msg{font-size: 0;}.dx_captcha_clickword_msg .dx-msg-info,.dx_captcha_clickword_msg .dx-msg-error{font-size: 12px !important;}',
  reqHost: window.interface_env || '',
  captchaOptions: {
    appId: 'f57049edfd9daf906079dd8442fabd92'
  }
};
```

## 实例方法

### getCode(node, mobile, options)

获取短信验证码

```jsdoc
@param {String|HTMLElement} node 点击获取验证码元素
@param {String} mobile 手机号码
@param {Object} options 配置项
@param {RegExp} options.mobileReg 手机号码校验正则表达式
@param {String} options.disabledCls 禁用样式名，点击获取验证码之后会添加到node上
@param {Number} options.countDownTime 倒计时时间
@param {Function} options.countDownProcessCallback 倒计时执行回调
@param {Function} options.countDownEndCallback 倒计时执行完毕回调
```

默认配置项：

```javascript
const getCodeDefaultOptions = {
  mobileReg: /^1[23456789]\d{9}$/,
  disabledCls: 'btn-disabled',
  countDownTime: 60,
  countDownProcessCallback(el, time) {
    el.innerText = `${time}s`;
  },
  countDownEndCallback(el) {
    el.innerText = '获取验证码';
  }
};
```

```javascript
const smsCode = new SmsCode();
smsCode.getCode(node, '13800138000');
```
