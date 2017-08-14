# API

```javascript
import VerifyCode from '@jyb/lib-verify-code'
```

## 初始化

### new VerifyCode(type, options, env);

## 选项

### type
- Type: `String`
- Default: ''

类型，取值可以有sms,img,voice

### options
- Type: `Object`
- Default: 

```javascript
const defaultOptions = {
  ajax: {}, // ajax配置
  onBefore() { return true; }, // 发送请求前，如果return false将不执行
  onSuccess() {}, // 请求成功，参数为响应的数据
  onError() {} // 请求失败，参数为错误信息
};
```

当`env=prod`，`type=sms`时，`ajax`默认配置为：

```javascript
{
  // env=test，url为https://swebsit.jyblife.com/base/index
  url: 'https://sweb.jyblife.com/base/index',
  data: {
    cmd: '42010101'
  }
}
```

当`env=prod`，`type=img`时，`ajax`默认配置为：

```javascript
{
  url: 'https://sweb.jyblife.com/base/index',
  data: {
    cmd: '42010102'
  }
}
```

当`env=prod`，`type=voice`时，`ajax`默认配置为：

```javascript
{
  url: 'https://sweb.jyblife.com/base/index',
  data: {
    cmd: '42010106'
  }
}
```

### env
- Type: `String`
- Default: 'prod'

接口环境，取值为prod,test

## 实例方法

### refresh()

刷新验证码

```javascript
instance.refresh();
```

