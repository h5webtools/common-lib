# 例子

[点击查看](../demo/index.html)

## 活动/产品接入

**第一步**

安装`@jyb/lib-sms-code`

```shell
$ npm i @jyb/lib-sms-code
```

**第二步**

为了方便控制是否使用滑动验证码，建议在模板引入`use-captcha.tpl`

如果没有`use-captcha.tpl`可以跳过这一个步骤

```html
<!--#include virtual="/sinclude/use-captcha.tpl"-->
```

**第三步**

`abc.json`中的`server.proxy`添加一项

如果是集成环境下：

```json
{
  "method": "post",
  "route": "/proxy/base/code",
  "options": {
    "url": "https://swebsit.jyblife.com/base/code",
    "requestOptions": {
      "strictSSL": true
    },
    "host": "https://swebsit.jyblife.com"
  }
}
```

**第四步**

通过`use-captcha.tpl`中的`window.gNeedUseCaptcha`来控制是否使用，`window.gDxCaptchaAppID`使用什么appid

```javascript
import SmsCode from '@jyb/lib-sms-code';

const smsCode = new SmsCode({
  // 本地环境直接使用代理
  reqHost: (process.env.NODE_ENV === 'local') ? '/proxy' : (window.interface_env || 'https://sweb.jyblife.com'), 
  disabled: (typeof window.gNeedUseCaptcha !== 'undefined') ? !window.gNeedUseCaptcha : false,
  captchaOptions: {
    appId: window.gDxCaptchaAppID || 'f57049edfd9daf906079dd8442fabd92'
  }
});
```

**第五步**

当点击获取验证码按钮，调用`getCode`方法

```javascript
smsCode.getCode(node, mobile, {
  disabledCls: 'disabled' // 根据需要设置disabled类名
});
```
