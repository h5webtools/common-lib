# 快速开始

## 安装

```shell
npm install @jyb/lib-navbar --save
```

## 使用

### 引入

```javascript
import NavBar from '@jyb/lib-navbar';
```

## 例子

```javascript
const navBar = new NavBar({
  title: '导航测试',
  link: {
    title: '说明',
    url: ''
  }
});

// 使用通用插件
navBar.callPlugin('common', {
  addCssText(ctx) {
    ctx.util.addCssText(`.header { padding-top: ${ctx.rect.height}px }`);
  }
});
```



