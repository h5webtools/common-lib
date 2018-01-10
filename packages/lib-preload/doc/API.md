# API

```javascript
import Preload from '@jyb/lib-preload';
```

## 初始化

### new Preload(lists, cb);

```jsdoc
@param {Array} lists
@param {Function} cb
```

## 选项

### lists
- Type: `Array`
- Default: []

加载图片列表

### cb
- Type: `Function`
- Default: function() {}

全部图片加载结束后调用

## 实例方法

### start()

开始加载图片

```javascript
instance.start();
```

### reload()

重新加载图片

```javascript
instance.reload();
```
