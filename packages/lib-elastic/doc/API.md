# API

```javascript
import Elastic from '@jyb/lib-elastic'
```

## 初始化

### new Elastic(element, options);

## 选项

### element
- Type: `HTMLElement`
- Default: undefined

要移动的元素

### options
- Type: `Object`
- Default:

```javascript
const defaultOptions = {
  minDistance: 100, // 最小滑动距离
  releaseBack: true, // 手放开后是否回弹
  direct: 'up', // 默认的手指滑动方向
  stopDocMove: true, // 手指滑动时是否禁止屏幕滑动
  initValue: 0, // 滑动元素初始所在的位置
  condition() { return true; }, // 事件触发条件，在touchstart的时候会调用该方法进行判断，返回true则进行下一项
  onRelease: noop, // 手指放开后的回调函数
  onRecovery: noop // 恢复原状时的回调函数
};
```

## 实例方法

### destroyEvent()

销毁

```javascript
instance.destroyEvent();
```
