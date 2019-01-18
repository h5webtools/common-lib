# 例子

[点击查看](../demo/index.html)

## 活动/产品接入

**第一步**

为了方便控制是否使用滑动验证码，建议在模板引入`use-captcha.tpl`

```html
<!--#include virtual="/sinclude/use-captcha.tpl"-->
```

**第二步**

通过`use-captcha.tpl`中的`window.gNeedUseCaptcha`来控制是否使用，`window.gDxCaptchaAppID`使用什么appid

```javascript
import SmsCode from '@jyb/lib-sms-code';

const smsCode = new SmsCode({
  disabled: (typeof window.gNeedUseCaptcha !== 'undefined') ? !window.gNeedUseCaptcha : false,
  captchaOptions: {
    appId: window.gDxCaptchaAppID || 'f57049edfd9daf906079dd8442fabd92'
  }
});
```

**第三步**

当点击获取验证码按钮，调用`getCode`方法

```javascript
smsCode.getCode(node, mobile);
```
