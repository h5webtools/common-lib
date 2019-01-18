# 快速开始

## 安装

```shell
npm install @jyb/lib-sms-code --save
```

## 使用

### 引入

```javascript
import SmsCode from '@jyb/lib-sms-code';
```

## 例子

```html
<div class="box">
  <h6 class="box-title">获取短信验证码：</h6>
  <input id="mobile" type="text">
  <button id="get-sms">获取短信验证码</button>
  <span class="code"></span>
</div>
```

```javascript
var mobile = document.getElementById('mobile');
var getSms = document.getElementById('get-sms');
var smsCode = new SmsCode();

getSms.addEventListener('click', function() {
  smsCode.getCode(getSms, mobile.value.trim());
});
```



