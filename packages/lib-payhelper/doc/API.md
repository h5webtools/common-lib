# API

```javascript
import PayHelper from '@jyb/lib-payhelper'
```

## 初始化

### new PayHelper();

```javascript
const payHelper = new PayHelper()
```

## 静态方法

### getPayType() 

```javascript
PayHelper.getPayType()
```

返回当前页面应该使用的支付类型

## 实例方法

### pay()

```javascript
payHelper.pay(options);
```

```jsdoc
@param {Object} 
{ 
  type: type, //支付类型
  payData: {
    payInfo: {}, 支付信息
    orderId: '201708086005184' //订单号
  }
}
```
