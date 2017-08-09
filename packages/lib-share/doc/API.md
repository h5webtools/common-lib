# API

```javascript
import share from '@jyb/lib-share'
```

## 调用

### share(options)

## 选项

### options
- Type: `Object`
- Default: 

```javascript
{
  common: { // 通用配置
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl: '' // 分享图片链接
  },
  weixin: { // 微信配置，其中title,desc,link,imgUrl会覆盖通用配置
    title: '',
    desc: '',
    link: '',
    imgUrl: '',
    reqUrl: '//jyb.jyblife.com/activejyb/wxShareSign', // 微信授权请求接口
    scriptUrl: '//res.wx.qq.com/open/js/jweixin-1.0.0.js' // 微信jssdk
  },
  qq: { // QQ配置，其中title,desc,link,imgUrl会覆盖通用配置
    title: '',
    desc: '',
    link: '',
    imgUrl: '',
    scriptUrl: '//pub.idqqimg.com/qqmobile/qqapi.js?_bid=152' // QQ jssdk
  }
}
```
