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

会自动识别微信客户端或者QQ客户端

```javascript
share({
  common: {
    title: '分享标题',
    desc: '分享描述',
    link: '//cdn.tt.com',
    imgUrl: '//cdn.tt.com/i.gif'
  }
});
```



