# API

```javascript
import ImgLazyload from '@jyb/lib-img-lazyload'
```

## 初始化

### new ImgLazyload(wrapNode, options);

## 选项

### wrapNode
- Type: `Object`
- Default: undefined

父节点

### options
- Type: `Object`
- Default:

```javascript
const defaultOptions = {
  layer: false, // 是否弹层
  attr: 'data-lazy' // lazy属性
};
```

## 实例方法

### stop()

停止

```javascript
instance.stop();
```
