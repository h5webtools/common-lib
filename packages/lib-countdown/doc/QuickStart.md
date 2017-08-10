# 快速开始

## 安装

```shell
npm install @jyb/lib-countdown --save
```

## 使用

### 引入

```javascript
import CountDown from '@jyb/lib-countdown'
```

### 调用

```javascript
new CountDown({
  time: 3,
  processCallback: function(time) {
    console.log(time);
  },
  endCallback: function() {
    console.log('end');
  }
});
```



