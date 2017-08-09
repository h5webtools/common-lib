# 快速开始

## 安装

```shell
npm install @jyb/lib-elastic --save
```

## 使用

### 引入

```javascript
import Elastic from '@jyb/lib-elastic'
```

### 调用

```html
<div class="page"></div>
```

```javascript
new Elastic(document.querySelector('.page'), {
  onRelease: function() {
    console.log('Release');
  },
  onRecovery: function() {
    console.log('Recovery');
  }
});
```



