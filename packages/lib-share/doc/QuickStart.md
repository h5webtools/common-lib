# 快速开始

## 安装

```shell
npm install @jyb/lib-share --save
```

## 使用

### 引入

```javascript
import share from '@jyb/lib-share'
```

## 分享

```javascript
share.init({
  weixin: {},
  qq: {}
});

share.config('qq', {
  title: '分享标题',
  desc: '分享描述',
  link: '//cdn.tt.com',
  imgUrl: '//cdn.tt.com/i.gif'
});
```



