# API

```javascript
import swipe from '@jyb/lib-swipe'
```

## 初始化

### new Swipe(el, options);

```javascript
// options
{
  startSlide: 0, // 开始位置，默认为0
  speed: 300, // prev和next转换的速度（以毫秒为单位），默认300
  auto: 0, // 以自动幻灯片播放开始（幻灯片之间的时间以毫秒为单位），默认为0
  continuous: true, // 最后一页然后从第一页开始，默认为true
  disableScroll: false, // 触摸的时候不滚动页面，默认为false
  stopPropagation: false, // 停止事件冒泡，默认为false
  callback: function(index, elem) {}, // 每页切换的时候回调
  transitionEnd: function(index, elem) {} // 在结束幻灯片转换时运行
}
```

## API

prev() 前一页

next() 后一页

getPos() 获取当前位置

getNumSlides() 获取所有页面数量

slide(index, duration) 切换到某一页
