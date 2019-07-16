# API

```javascript
import LoadMore from '@jyb/lib-loadmore';
```

## 初始化

### new LoadMore(el, options);

```jsdoc
@param {HTMLElement} el
@param {Object} options
```

```javascript
const defaultOptions = {
  showElement: true, // 是否显示loading
  loadingText: '加载中...', // 加载中文案
  loadedText: '- 已加载全部数据 -', // 加载结束文案
  offset: 60 // 偏移
};
```

## 实例属性

- disabled 禁用加载
- end 结束加载

## 实例方法

### start()

启动

```javascript
instance.start();
```

## 事件

- scroll:bottom 滚动到底部触发
- scroll:end 滚动结束，当设置了属性end为true触发
