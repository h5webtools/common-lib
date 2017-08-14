# 快速开始

## 安装

```shell
npm install @jyb/lib-util --save
```

## 使用

### 引入

```javascript
import * as util from '@jyb/lib-util'
```

## 调用

```javascript
console.log(Util.getFormatPrice('123456')); // 123,456
console.log(Util.formatDate('20170809')); // 2017-08-09
console.log(Util.formatDate('201708')); // 2017-08
console.log(Util.getYuan('1000')); // 10
console.log(Util.getYuan('1000', true)); // 10.00
```



