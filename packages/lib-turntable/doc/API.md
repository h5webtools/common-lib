# API

```javascript
import Turntable from '@jyb/lib-turntable'
```

## 初始化

### new Turntable(options);

## 选项

### options
- Type: `Object`
- Default:

```javascript
const defaultOptions = {
  startBtn: null, // 开始按钮
  rollElement: null, // 转动元素
  rewardData: {}, // 奖品数据，key-value { '1': { 'deg': 90 } }
  maxCircles: 8, // 最大转动圈数
  minCircles: 5, // 最小转动圈数
  duration: 3, // 间隔
  resultCreator(roll) {}, // 启动转动，参数返回启动roll函数，roll函数需要传入奖品key
  end(result) {} // 转动结束，参数返回当前指向的rewardData
};
```

