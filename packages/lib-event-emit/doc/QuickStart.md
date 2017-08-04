# 快速开始

## 安装

```shell
npm install @jyb/lib-event-emit --save
```

## 使用

### 引入

```javascript
import EventEmit from '@jyb/lib-event-emit'
```

## 调用

```javascript
const eventEmit = new EventEmit();

eventEmit.on('render');
eventEmit.emit('render');
```



