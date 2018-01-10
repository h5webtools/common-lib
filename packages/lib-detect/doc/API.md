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
- Default: navigator.userAgent

用户代理

## 字段

调用`detect()`，会返回下列字段：

```javascript
const env = {
  jyb: false, // 是否加油宝客户端
  weixin: false, // 是否微信客户端
  qq: false, // 是否QQ客户端
  android: undefined, // 是否安卓客户端
  ios: undefined, // 是否iOS客户端
  iphone: undefined, // 是否iPhone
  ipad: undefined, // 是否iPad
  ipod: undefined, // 是否iPod
  version: undefined // iOS或者android版本
};
```

