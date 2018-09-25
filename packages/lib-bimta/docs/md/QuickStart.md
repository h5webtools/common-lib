# 快速开始

## 安装

```shell
npm install @jyb/lib-bimta --save
```

## 例子

**定义配置表**

```javascript
const configMap = {
  invite: { // 第一级，跟data-stat-ea对应
    id: '30000',
    home: { // 第二级，跟data-stat-eb对应
      id: '1',
      pv: { // 第三级，跟data-stat-visit对应
        id: '1'
      },
      btn: { // 第三级，跟data-stat-ec对应
        id: '2'
      }
    }
  }
};
```

**启动上报**

```javascript
import Bimta from '@jyb/lib-bimta';
// 创建bimta对象
const bimta = new Bimta({
  configMap: configMap,
  platform: ['bi'],
  debug: true,
  env: 'test',
  createCommonParams: function(defaults) {
    return {
      act_id: '' // 活动ID
    };
  }
});
// 启动
bimta.start();
```

**自定义数据属性**

```html
<body data-stat-ea="invite" data-stat-eb="home" data-stat-visit="pv">
  <button data-stat-ec="btn">Click me</button>
</body>
```

**调用API**

```javascript
bimta.pageview({ ea: 'invite', eb: 'home' }, { op_type: 'pv' });
bimta.event({ ea: 'invite', eb: 'home', ec: 'btn' });
```

