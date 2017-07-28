# API

## 引用

```javascript
import Lottery from '@jyb/lib-lottery'
```
------------
## 初始化

```javascript
let lottery = new Lottery(options);
```
-----------
## 选项
### options
- Type: `Object`
- Default: {}
- 字段如下：

```javascript
let config = {
    maxGrid: 8,                     // 最大格子数量
    times: 30,                      // 格子高亮次数
    prizeIndex: 0,                  // 奖品所在格子顺序1-8
    speed: 200,                     // 转速
    gridClass: '',                  // 格子类名，用于查找格子数量
    callback: empty,                // 停止时的回调函数
    activeClass: 'active',          // 格子高亮的样式
    reduce: 10,                     // 转速递减值
    advanceTimes: 10,               // 提前多少步开始减速
    continueTimes: 50               // 当times次数用尽，但是还是没有设置最终奖品的情况下，times递增的次数
};
```

## 可调用方法
- `setPrizeIndex()`
- 设置奖品格子，最大值小于等于maxGrid
- 如果不在 `1 ~ maxGrid` 范围内会抛出异常

```javascript
lotteryObj.setPrizeIndex(number);
```
---------------
- `setTimes()`
- 设置最大旋转次数
- 不能小于等于0，否则会抛出异常

```javascript
lotteryObj.setTimes(number);
```
--------------
- `stop()`
- 停止旋转，并清空当前格子的状态

```javascript
lotteryObj.stop()
```

