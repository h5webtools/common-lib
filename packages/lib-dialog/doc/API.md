# API

```javascript
import Dialog from '@jyb/lib-dialog'
```

## 初始化

### new Dialog(options);

## 选项

### options
- Type: `Object`
- Default:

```javascript
const defaultOptions = {
  title: '标题', // 标题内容
  visible: true, // 默认显示
  showClose: true, // 是否显示close按钮
  content: '内容', // 显示的内容
  btns: [], // 按钮列表{ text: '', callback: function(){}, css:'' }
  mask: true, // 是否显示mask
  fixed: false, // 是否一直使用fixed
  onClose: function() {}, // close调用
  onShow: function() {}, // show调用
  onDispose: function() {}, // dispose调用
  elementCls: { // 元素class
    el: 'mod-dialog',
    mask: 'overlay',
    wrap: 'dialog-wrap',
    close: 'close-btn',
    head: 'dialog-head',
    body: 'dialog-body',
    foot: 'dialog-foot',
    btn: 'dialog-btn'
  }
};
```

## 实例方法

### show()

显示

```javascript
instance.show();
```

### close()

隐藏

```javascript
instance.close();
```

### dispose()

销毁

```javascript
instance.dispose();
```

### updateContent(content)

更新内容

```jsdoc
/**
 * 更新内容
 * @param {String} content 内容
 */
```

```javascript
instance.updateContent(content);
```

### registerHandler(name, handler)

注册事件处理函数

```jsdoc
/**
 * 注册事件处理函数
 * @param {String} name 名称
 * @param {Function} handler 函数
 */
```

注册完成之后，可以在模板内容中这样使用：

`<a href="javascript:;" et="click:handlerName">click</a>`

```javascript
instance.registerHandler(name, handler);
```




