# 快速开始

## 安装

```shell
npm install @jyb/lib-ajax --save
```

## 使用

### 引入

```javascript
import ajax from '@jyb/lib-ajax'
```

### 使用

```javascript
ajax({
  type: 'GET',
  url: '/projects',
  data: { name: 'canye' },
  dataType: 'json',
  timeout: 3000,
  success: function(data){
    // data
  },
  error: function(xhr, type){
    alert('Ajax error!')
  }
})
```



