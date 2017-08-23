# API

```javascript
import { instanceEvent } from '@jyb/lib-event-emit'
import EventEmit from '@jyb/lib-event-emit'
```

## 直接使用

```javascript
instanceEvent.on(name);
instanceEvent.emit(name);
```

## 初始化

### new EventEmit();

## 实例方法

### on(name, fn, one)

绑定事件

```jsdoc
/**
 * 自定义事件绑定
 * @param {String} name
 * @param {Function} fn
 * @param {Boolean} [one]
 */
```

### has(name)

是否有事件

```jsdoc
/**
 * 是否有事件
 * @param {String} name
 */
```

### once(name, fn)

事件只执行一次

```jsdoc
/**
 * 事件只执行一次
 * @param {String} name
 * @param {Function} fn
 */
```

### emit(name, ...args)

触发事件

```jsdoc
/**
 * 触发事件
 * @param {String} name
 * @param {Any} args参数
 */
```

### off(name)

关闭指定的自定义事件

```jsdoc
/**
 * 关闭指定的自定义事件
 * @param name
 */
```

### offAll()

关闭所有的自定义事件

