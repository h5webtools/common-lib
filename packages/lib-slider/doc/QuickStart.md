# 快速开始

## 安装

```shell
npm install @jyb/lib-slider --save
```

## 使用

### 引入

```javascript
import Slider from '@jyb/lib-slider';
```

## 调用

```javascript
const slider = new Slider({
  domWrap: document.querySelector('.detail-scroll'),
  loop: false,
  lazyLoad: true,
  topDocMove: false,
  animateTime: 200
});
```



