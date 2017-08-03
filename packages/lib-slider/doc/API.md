# API

```javascript
import Slider from '@jyb/lib-slider'
```

## 初始化

### new Slider(options);

options
- Type: `Object`
- Default:

```javascript
const defaultOptions = {
  domWrap: '', // 最外层的dom容器，传入元素对象
  auto: false, // 是否自动轮播
  element: 'li', // 轮播元素
  topDocMove: true, // 手指放上去后是否禁用页面的滑动
  animateNode: 'ul', // 执行动画的元素
  loop: true, // 循环图片
  rightLimit: '', // 右边极限位置
  width: window.innerWidth, // 轮播元素宽度
  preLoad: false, // 是否需要多加载一张图
  lazyLoad: false, // 懒加载图片
  animateTime: 500, // 动画执行事件
  fingerFollow: true, // 手指跟随动画
  lazyAttr: 'data-lazy', // 懒加载图片属性
  initIndex: 0, // 初始化加载那一张图
  autoTime: 5000, // 自动轮播间隔
  onClick() {}, // 手指点击动作的回调函数
  onInit(/* dom, index */) {},
  onLeft(/* index */) {}, // 手指点击动作的回调函数
  onRight(/* index */) {},
  onComplete(/* dom, index, length */) {}
};
```

## 实例方法

### getCurrentIndex()

获取当前显示的轮播元素序号，从0开始，0,1,2,3,4,5....

```javascript
instance.getCurrentIndex();
```

### stopAuto()

暂时停止自动轮播图片，手指触摸后会再次恢复

```javascript
instance.stopAuto();
```

### stopAutoThorough()

彻底停止自动轮播

```javascript
instance.stopAutoThorough();
```

### destroy()

销毁轮播滚动事件

```javascript
instance.destroy();
```

### reverse()

恢复轮播，即重新绑定touch事件

```javascript
instance.reverse();
```

### updateEL()

更新轮播元素，重新绑定事件

```javascript
instance.updateEL();
```

### toNext(index)

滚动到指定的元素

```javascript
instance.toNext(index);
```