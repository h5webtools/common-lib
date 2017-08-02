# 快速开始

## 安装

```shell
npm install @jyb/lib-validate --save
```

## 使用

### 引入

```javascript
import Validate from '@jyb/lib-validate'
```

### 页面元素

```html
<div class="input-box">
  <label for="username">用户名：</label>
  <input id="username" name="username" type="text">
  <span class="msg"></span>
</div>
```

### 添加规则

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
  callback(el, validResult) {
    el.parentNode.querySelector('span').innerHTML = validResult.join(';');
  }
}]
```

### 调用

```javascript
const valid = new Validate(rule);
valid.validate();
```





