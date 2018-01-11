# API

```javascript
import FullPage from '@jyb/lib-fullpage';
```

## 初始化

### new FullPage(el, options);

```jsdoc
@param {HTMLElement} el
@param {Object} options
```

## 选项

### el
- Type: `HTMLElement`
- Default:

html元素

### options
- Type: `Object`
- Default:

```javascript
{
  page: '.page', // 每屏的选择符，默认是 `.page`
  start: 0, // 从第几屏开始，默认是第一屏
  duration: 500, // 每屏动画切换的时间，这段时间内，不能重复切换，默认是500ms，这里只是js限制，css动画时间需要更改css文件
  loop: false, // 是否开启循环滚动，默认`false`
  drag: false, // 是否开启拖动功能，默认关闭
  dir: 'v', // 切换方向，默认垂直方向(v|h)
  der: 0.1, // 当滑动距离大于一个值时，才会引起滑动现象，滑动距离=`der`*屏幕高度|宽度，默认值为0.1
  delay: 0, // 切换页面延迟时间，默认为0
  change(/* data */) {}, // 当切换屏幕时会触发的事件
  beforeChange(/* data */) {}, // 当切换屏幕前会触发的事件
  afterChange(/* data */) {}, // 当切换屏幕后会触发的事件
  orientationchange(/* orientation */) {} // 当屏幕发生旋转时的回调
};
```

change/beforeChange/afterChange回调会传入一个参数

- e {Object} 事件的参数

`beforeChange`的e包含两个属性`next`和`cur`，表示当前屏和将要切换的下一屏。
`change/afterChange`的e包含两个属性`prev`和`cur`，表示前一屏和当前屏（和`beforeChange`的区别就是此时切换已经发生了，切不可逆转）。

**注意：若`beforeChang`e显示返回`false`，则可阻止滚屏的发生。**

orientationchange回调会传入一个参数

- dir {String} 当前屏幕的方向 portrait 竖屏 landscape 横屏。

## 实例方法

### update()

此方法会重新计算和渲染每屏的高度，当你发现如果每屏的高度有问题时，手动调用下此方法就可以了。

### moveTo()

切换到指定屏，如果指定的屏数大于屏总数或小于0，都会做修正处理。

- next {Number} 必须 要切换到的屏索引
- anim {Bollean} 可省略 是否有动画 默认为没有动画效果

### movePrev()

向前一屏，是对`moveTo`的封装

- anim {Bollean} 可省略 是否有动画 默认为没有动画效果

### moveNext()

向后一屏，是对`moveTo`的封装

- anim {Bollean} 可省略 是否有动画 默认为没有动画效果

### start()

开启切换功能，和`stop`配合使用。每次调用`start`时都会调用`holdTouch`。

丰富页面功能，比如到了某页需要点击某个元素后才能到下一页的时候 这个就有用了

### stop()

关闭切换功能，和`start`配合使用。每次调用`stop`时都会调用`unholdTouch`

### holdTouch()

监控页面触摸，页面的`touchmove`事件会被阻止掉，默认开启

### unholdTouch()

释放页面触摸，在浏览器开启滑动翻页时，这样可能会有问题

### getCurIndex()

获取当前位于第几屏的方法（第一屏的索引为0）。

- return {Number} 当前位于第几屏
