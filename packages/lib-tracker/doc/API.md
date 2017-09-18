# API

```javascript
import tracker from '@jyb/lib-tracker'
```

## 用户选项

通过`tracker.init`传入，如果没有则使用默认值

### pid
- Type: `String`
- Default: 

产品ID，默认值为location.pathname（用/分割后）的下标为1的字符串

### debug
- Type: `Boolean`
- Default: false

是否调试模式，如果设置为true，会输出日志，并且正常抛出错误，不发送上报请求

### env
- Type: `String`
- Default: 'prod'

使用的环境，可以取值`test`,`prod`，当`test`会上报到测试环境，当`prod`会上报到正式环境

### collectWindowErrors
- Type: `Boolean`
- Default: true

是否使用window.onerror捕获错误

### commonParams
- Type: `Object`
- Default: null

公共参数，如果设置，上报请求都会加上，`params`为`Object`类型，可参考下面采集数据部分内容

## 属性

### tracker.init

Tracker初始化

### tracker.Ctor

Tracker构造函数

### tracker.error

ErrorTracker对象

### tracker.Error

ErrorTracker构造函数

## 方法

### tracker.init(options)

初始化，`options`可以参考上面的`用户选项`

### tracker.log(params)

通用采集数据API，params为`Object`类型，可参考下面采集数据部分内容

### tracker.captureApi(params)

上报接口异常API，params为`Object`类型，可参考下面采集数据部分内容

### tracker.captureError(ex, [params])

捕获错误API，ex为`Error`对象，params为`Object`类型，可参考下面采集数据部分内容

## 采集数据定义

### 公共参数

一般不需要修改，由库内部自动生成即可

```javascript
// 页面地址
link: location.href,
// 用户代理
ua: navigator.userAgent,
// 页面title
title: document.title,
// 窗口大小
size: `${document.documentElement.clientWidth}*${document.documentElement.clientHeight}`,
// 返回跳转或打开到当前页面的那个页面的URI
referer: document.referer || '',
// 时间戳
timestamp: new Date().getTime(),
// 网络类型
network: util.networkType
```

### 必填参数

`pid`可以通过`window.g_config.tracker`修改，如果不定义，则使用默认值

`t_type`为上报数据类型，通过默认的错误捕获和`captureError`上报的数据`t_type`自动设置为`1`；通过`captureApi`上报的数据`t_type`为`2`

`badjs`用于筛选日志数据，一般不需要改动

```javascript
// 产品ID，默认值为location.pathname（用/分割后）的下标为1的字符串
pid: '',
// 上报数据类型，会根据调用接口不同自动设置
t_type: '', // 1: js错误，2: 接口错误上报
// badjs标识符，用于统计数据
badjs: '1'
```

### 通用参数

一般用户需要修改的就是通用参数

当通过`window.onerror`或者使用`captureError`上报时候，`msg, line, col => c1`，`errStack => c2`，`url => c3`

```javascript
// 通用参数
c1: '',
c2: '',
c3: ''
```
