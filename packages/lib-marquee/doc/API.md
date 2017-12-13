# API

```javascript
import Marquee from '@jyb/lib-marquee'
```

## 初始化

### new Marquee(el, options);

#### el 元素

元素，通过DOM API选择

#### options 选项
- Type: `Object`
- Default: 

```javascript
const defaultOptions = {
  step: 0, // 每次滚动的步长(px)
  stepInterval: 400, // 滚动效果执行时间(ms)
  interval: 3000, // 每次滚动间隔时间(ms)
  dir: 'left', // 滚动方向，up、down、left、right
  autoPlay: true, // 是否自动滚动
  hoverPause: true // 是否在鼠标滑过时暂停滚动
};
```

## 实例方法

### stop()

停止滚动

```javascript
marquee.start();
```

### startScroll()

开始滚动

```javascript
marquee.startScroll();
```

### changeDir(dir)

改变方向，up、down、left、right

```javascript
marquee.changeDir('up');
```
