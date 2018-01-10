# API

```javascript
import detect from '@jyb/lib-detect';
```

## 调用

### detect(regain = false, ua = '')

#### regain
- Type: `Boolean`
- Default: false

是否重新获取环境信息

#### ua
- Type: `String`
- Default: ''

用户代理

## 字段

调用`detect()`，会返回下列字段：

```javascript
const env = {
  jyb: false,
  weixin: false,
  qq: false,
  android: undefined,
  ios: undefined,
  iphone: undefined,
  ipad: undefined,
  ipod: undefined,
  version: undefined
};
```

