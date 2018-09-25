# 接入方式

提供`配置表上报`和`快速上报`两种方式接入，每一种都支持`自定义数据属性`和`调用API`，可以自由选择。

## 上报方式

通过自定义数据属性和上报API都可以上报，但是通过调用API在一些异步的场景下非常有用

**自定义数据属性**

目前支持的`自定义数据属性`有：

- data-stat-ea 层级1
- data-stat-eb 层级2
- data-stat-ec 层级3
- data-stat-visit 用于访问统计
- data-stat-para 用于扩展参数
- data-stat-id 事件ID

如果希望通过根据层级，查找映射表来上报，则通过添加`data-stat-ea`,`data-stat-eb`,`data-stat-ec`,`data-stat-visit`上报，这种方式会逐级查找（顺序：ec -> eb -> ea）得到事件ID，然后上报

如果希望直接上报，可以通过`data-stat-id`添加事件ID，这种方式，会直接上报

如果希望在上报的时候增加一些特有的参数，可以使用`data-stat-para`

**调用API**

提供两个接口，`pageview`,`event`，用法参考API文档

## 接入步骤

### 配置表上报

通过定义跟埋点ID的映射关系（配置表），可以把埋点ID跟业务代码隔离，方便管理和修改。

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

按照上报规范的层级，第一位对应`data-stat-ea`，第二位对应`data-stat-eb`，第三位对应`data-stat-ec`。

`data-stat-visit`对应页面访问，值必须为`pv`，固定读取配置表的`pv`字段

`data-stat-ea`/`data-stat-eb`/`data-stat-ec`的属性值对应于配置表的字段命名

```html
<body data-stat-ea="invite" data-stat-eb="home" data-stat-visit="pv">
  <button data-stat-ec="btn" data-stat-para="{'op_type': 'click'}">Click me</button>
</body>
```

**调用API**

```javascript
bimta.pageview({ ea: 'invite', eb: 'home' }, { op_type: 'pv' });
bimta.event({ ea: 'invite', eb: 'home', ec: 'btn' });
```

### 快速上报

这种方式直接通过埋点ID上报，耦合度比较高，不过在一些场景下很有用，比如页面搭建系统需要开放能力给运营直接填写埋点ID

**启动上报**

```javascript
import Bimta from '@jyb/lib-bimta';
// 创建bimta对象
const bimta = new Bimta({
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
<body>
  <button data-stat-id="30000.1.2">Click me</button>
</body>
```

**调用API**

```javascript
bimta.pageview('30000.1.1');
bimta.event('30000.1.2');
```
