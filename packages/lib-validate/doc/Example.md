# 例子

## 页面元素

```html
<fieldset>
  <legend>表单校验测试1</legend>
  <div class="input-box">
    <label for="username">用户名：</label>
    <input id="username" name="username" type="text">
    <span class="msg"></span>
  </div>
  <div class="input-box">
    <label for="age">年龄：</label>
    <input id="age" name="age" type="text">
    <span class="msg"></span>
  </div>
  <div class="input-box">
    <label for="phone">联系手机：</label>
    <input id="phone" name="phone" type="text">
    <span class="msg"></span>
  </div>
  <div class="input-box">
    <label for="pwd">密码：</label>
    <input id="pwd" name="pwd" type="password">
    <span class="msg"></span>
  </div>
  <div class="input-box">
    <label for="cpwd">确认密码：</label>
    <input id="cpwd" name="cpwd" type="password">
    <span class="msg"></span>
  </div>
  <button id="submit">提交</button>
</fieldset>
```

## 规则

```javascript
const rule = [{
  node: '#username',
  validators: [{
    name: 'required',
    options: {
      itemName: '用户名'
    }
  }, {
    name: 'format',
    options: {
      errMsg: '用户名必须为小写字母',
      reg: /^[a-z]*$/
    }
  }],
  callback: validateCallback
}, {
  node: '#age',
  validators: [{
    name: 'range',
    options: {
      itemName: '年龄',
      maxVal: 100,
      minVal: 1
    }
  }],
  callback: validateCallback
}, {
  node: '#phone',
  validators: [{
    name: 'format',
    options: {
      itemName: '联系手机',
      reg: /^1[0-9]{10}$/
    }
  }],
  callback: validateCallback
}, {
  node: '#pwd',
  validators: [{
    name: 'length',
    options: {
      itemName: '密码',
      maxLen: 10,
      minLen: 6
    }
  }],
  callback: validateCallback
}, {
  node: '#cpwd',
  validators: [{
    name: 'compare',
    options: {
      compareWith: '#pwd',
      itemName: '密码'
    }
  }],
  callback: validateCallback
}];

function validateCallback(el, validResult) {
  el.parentNode.querySelector('span').innerHTML = validResult.join(';');
}

export default rule;
```

## 调用

```javascript
import Validate from '@jyb/lib-validate';
import rule from './rule';

const valid = new Validate(rule);
valid.validate();
```