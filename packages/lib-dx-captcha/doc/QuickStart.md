# 快速开始

## 安装

```shell
npm install @jyb/lib-dx-captcha --save
```

## 使用

### 引入

```javascript
import DxCaptcha from '@jyb/lib-dx-captcha'
```

## 例子

```html
<div id="dx-captcha"></div>
```

```javascript
var captcha = new DxCaptcha('#dx-captcha', {
  captchaOptions: {
    appId: 'f57049edfd9daf906079dd8442fabd92',
    style: 'embed'
  }
});
```


