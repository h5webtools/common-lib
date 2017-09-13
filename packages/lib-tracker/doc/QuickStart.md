# 快速开始

## 安装

```shell
npm install @jyb/lib-tracker --save
```

## 使用

### 引入

引入会通过window.onerror自动捕获错误

```javascript
import tracker from '@jyb/lib-tracker'
```

### 修改配置

如果需要修改一些配置，可以在引入`lib-tracker`之前设置`window.g_config`

```javascript
var g_config = {
  tracker: {
    pid: 'act',
    debug: true,
    env: 'test'
  }
};
```

### 设置公共参数

设置之后，所有上报请求都会增加

```javascript
tracker.setParams({ isAndroid: true });
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




