# API

```javascript
import CountDown from '@jyb/lib-countdown'
```

## 初始化

### new CountDown(options);

## 选项

### options
- Type: `Object`
- Default:

```javascript
const defaultOptions = {
  time: 0, // 时间
  duration: 1000, // 间隔
  processCallback(/* time */) {}, // 倒计时回调
  endCallback() {} // 结束回调
};
```
