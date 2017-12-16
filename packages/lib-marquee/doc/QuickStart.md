# 快速开始

## 安装

```shell
npm install @jyb/lib-marquee --save
```

## 使用

### 引入

```javascript
import Marquee from '@jyb/lib-marquee'
```

### 调用

```javascript
const marquee = new Marquee(document.getElementById('demo1'), {
  autoPlay: true,
  step: 3,
  stepInterval: 0,
  interval: 50,
  dir: 'left'
});
```



