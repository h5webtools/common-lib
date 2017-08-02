# API

```javascript
import tips from '@jyb/lib-tips'
```

## 选项

### msg
- Type: `String`
- Default: ''

显示消息内容

### isLoading
- Type: `Boolean`
- Default: false

是否显示加载icon

### autoHide
- Type: `Boolean`
- Default: true

是否自动隐藏

### hideTime
- Type: Number
- Default: 1200

自动隐藏时间

## 方法

### showTips(options)

显示tips

```javascript
showTips({ 
  msg: '',
  isLoading: false,
  autoHide: true,
  hideTime: 1200
})
``` 

### showLoading(msg)

 显示加载状态

```javascript
showLoading(msg)
```

### closeTips()

隐藏tips

```javascript
closeTips()
```

### showError(msg)

显示错误，1.2s后自动关闭

```javascript
showError(msg)
```

