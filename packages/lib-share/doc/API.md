# API

```javascript
import share from '@jyb/lib-share'
```

## 调用

### share.init(options)

初始化，一个页面只调用一次

options
- Type: `Object`
- Default: 

```javascript
{
  weixin: { // 微信配置
    debug: false, // 开启debug模式，页面会alert出错误信息
    reqUrl: '//jyb.jyblife.com/activejyb/wxShareSign', // 微信授权请求接口
    scriptUrl: '//res.wx.qq.com/open/js/jweixin-1.0.0.js' // 微信jssdk
  },
  qq: { // QQ配置
    scriptUrl: '//pub.idqqimg.com/qqmobile/qqapi.js?_bid=152' // QQ jssdk
  }
}
```

### share.config(name, options)

设置分享信息

name
- Type: `String`
- Default: ''

分享类型，目前只有`weixin`,`qq`

options
- Type: `Object`
- Default:

```javascript
// weixin
{
  title: '', // 分享标题
  desc: '', // 分享描述
  link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  imgUrl: '', // 分享图标
  success() {}, // 用户确认分享后执行的回调函数
  cancel() {} // 用户取消分享后执行的回调函数
}

// qq
{
  title: '', // 分享标题
  desc: '', // 分享描述
  link: '', // 分享链接
  imgUrl: '', // 分享图标
  callback() {} // 回调
}
```
