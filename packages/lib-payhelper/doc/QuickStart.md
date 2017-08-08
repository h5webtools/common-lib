# 快速开始

## 安装

```shell
npm install @jyb/lib-payhelper --save
```

## 使用

### 引入

```javascript
import PayHelper from '@jyb/lib-payhelper'
```

## 例子

```javascript
var type = PayHelper.getPayType()
var payHelper = new PayHelper()
payHelper.pay({ type: type, payData: {}})
```
