# 快速开始

## 安装

```shell
npm install @jyb/lib-preload --save
```

## 使用

### 引入

```javascript
import Preload from '@jyb/lib-preload';
```

## 例子

```javascript
const preload = new Preload([
  'https://cdn.jyblife.com/static/style/app/publish/img/nocard/logo.png'
], () => {
  console.log('loaded');
});
preload.start();
```



