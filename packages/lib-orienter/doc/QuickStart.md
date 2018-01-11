# 快速开始

## 安装

```shell
npm install @jyb/lib-orienter --save
```

## 使用

### 引入

```javascript
import Orienter from '@jyb/lib-orienter';
```

## 例子

```javascript
var orienter = new Orienter();
orienter.onOrient = function(obj) {
  console.log(obj);
};
orienter.init();
```



