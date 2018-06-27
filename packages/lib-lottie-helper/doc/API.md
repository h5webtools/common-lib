# API

```javascript
import LottieHelper from '@jyb/lib-lottie-helper'
```

## 初始化

### new LottieHelper(options);

```jsdoc
@param {Object} options
```

## 选项

### data
- Type: `Object`

lottie导出的data.json

### assetsMap
- Type: `Object`

资源对应路径映射表

## 实例方法

### getAnimData()

获取动画数据，将获得的值传入lottie中的animationData选项即可

```javascript
instance.getAnimData();
```
