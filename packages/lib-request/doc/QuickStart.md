# 快速开始

## 安装

```shell
npm install @jyb/lib-request --save
```

## 使用

### 引入

```javascript
import Request from '@jyb/lib-request';

const request = new Request();
request.ajax({
  url: '/base/index',
  data: {
    cmd: '123'
  },
  method: 'post',
  timeout: 60000
}).then((json) => {
  // doSomething...
}).catch((e) => {
  // doSomething...
}); 
```

## 例子



