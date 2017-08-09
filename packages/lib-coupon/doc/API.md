# API

```javascript
import CouponList from '@jyb/lib-coupon-list'
```

## 初始化

### new CouponList(options);

```jsdoc
@param {Object} options
```

## 选项

### title 
- Type: `String`
- Default: 选择红包/折扣券

红包列表标题

### cid
- Type: `Number`
- Default: 0

默认选中的红包id

### data
- Type: `Array`
- Default: []

红包数据

### notUseDes
- Type: `String`
- Default: 不使用，就是任性

不使用红包的文案

### onChangeCoupon
- Type: `Function`
- Default: function() {}
选择红包后的回调函数

### onClose
- Type: `Function`
- Default: function() {}
关闭红包列表后的回调函数

## 实例方法

### show()

启动上报

```javascript
instance.start(options);
```
