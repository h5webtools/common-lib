# 快速开始

## 安装

```shell
npm install @jyb/lib-coupon-list --save
```

## 使用

引入common-sass 下的import-coupon-public-rem.scss

### 引入

```javascript
import CouponList from '@jyb/lib-coupon-list'
```

## 例子
```javascript 
const couponList = new CouponList()
couponList.show({          
  data: data,
  cid: cid,
  onChangeCoupon: function(node) {
    console.log('>>>', node)
    cid = node.attr('cid')
  }}
)
```javascript