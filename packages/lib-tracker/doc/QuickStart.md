# 快速开始

## 安装

```shell
npm install @jyb/lib-tracker --save
```

## 使用

### 引入

```javascript
import tracker from '@jyb/lib-tracker'
```

### 初始化

```javascript
tracker.init({
  pid: 'act',
  debug: true,
  env: 'test'
});
```

### 手动上报脚本异常

```javascript
try {
  // some error code...
} catch (e) {
  tracker.captureError(e);
}
```

### 手动上报接口异常

```javascript
tracker.captureApi({
  c1: 404,
  c2: '404 Not Found'
})
```




