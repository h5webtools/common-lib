# API

```javascript
import NavBar from '@jyb/lib-navbar';
```

## 初始化

### new NavBar(options);

```jsdoc
@param {Object} options
```

## 选项

```javascript
const defaultOptions = {
  el: document.body, // 导航栏父元素，HTMLElement类型
  title: '', // 导航栏标题，String类型
  wrapCls: 'md-navbar-wrap', // 导航栏class，String类型
  link: { // 导航栏右上角链接
    title: '', // 链接标题，String类型
    url: '', // 链接url，String类型
    query: {} // 链接querystring，Object类型
  }
};
```

## 实例属性

- $parentEl 导航栏父元素
- $el 导航栏元素，渲染之后才存在
- util 工具方法
- rect 导航栏元素的大小及其相对于视口的位置
- rendered 导航栏是否渲染完毕

```javascript
// 工具方法

// 添加样式
util.addCssText('.header { height: 10px; }');
// 当前设备是否iPhoneX系列
util.isIPhoneX();
// 客户端是否支持全屏
util.canFullScreen();
// 创建页面URL
util.createPageUrl('https://www.jyblife.com', { t: Date.now() });
```

## 实例方法

### registerWidget(k, plugin)

注册组件

```javascript
instance.registerWidget('demo', {
  defaultOptions: {
    title: 'demo'
  },
  plugin(options) {
    this.on('rendered', (ctx) => {
      // 渲染之后
      console.log(options.title);
    });
    this.on('scrollTop', (ctx) => {
      // 滚动到顶部
    });
    this.on('scroll', (ctx) => {
      // 滚动
    });
    this.render();
  }
});
```

### canFullScreen()

是否支持全屏，加油宝客户端和version >= 6.1.5才支持全屏

### render() 

渲染导航栏

### callPlugin(name, options)

调用插件

```javascript
navBar.callPlugin('demo', {
  title: 'test'
});
```

## 事件

- rendered 导航栏渲染之后触发
- scrollTop 导航栏滚动到顶部触发
- scroll 导航栏滚动触发

## 内置插件

### 通用插件

插件名称：common

插件选项：

```javascript
const defaultOptions = {
  rendered(/* ctx */) {}, // 渲染之后调用
  navbarBgCls: 'navbar-bg-color' // 该class在滚动到顶部remove，滚动add
};
```

使用举例：

```javascript
navBar.callPlugin('common', {
  rendered(ctx) {
    ctx.util.addCssText(`.header { padding-top: ${ctx.rect.height}px }`);
  }
});
```


