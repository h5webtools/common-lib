# 快速开始

## 安装

```shell
npm install @jyb/lib-bimta --save
```

## 使用

### 引入

```javascript
import Bimta from '@jyb/lib-bimta';
```

### 上报方式

提供`添加自定义数据属性上报`和`调用API上报`两种方式上报，可以自由选择

#### 添加自定义数据属性上报

目前支持的`自定义数据属性`有：
- data-stat-ea 层级1
- data-stat-eb 层级2
- data-stat-ec 层级3
- data-stat-visit 用于访问统计
- data-stat-para 用于扩展参数
- data-stat-id 事件ID

如果希望通过根据层级，查找映射表来上报，则通过添加`data-stat-ea`,`data-stat-eb`,`data-stat-ec`,`data-stat-visit`上报，这种方式会逐级查找（顺序：ec -> eb -> ea）得到事件ID，然后上报

如果希望直接上报，可以通过`data-stat-id`添加事件ID，这种方式，会直接上报

#### 调用API上报

提供两个接口，`pageview`,`event`，用法参考API文档

## 例子

```html
<div data-stat-ea="home">
  <div data-stat-eb="search" data-stat-visit="pv">
    <a data-stat-ec="btn" data-stat-para="{'op_type': 'click'}" href="javascript:;">search</a>
  </div>
</div>
```

```javascript
const configMap = {
  home: {
    id: '30000',
    search: {
      id: '1',
      pv: { // 访问
        id: '1'
      },
      btn: { // 按钮
        id: '2'
      },
      input: { // 输入
        id: '3'
      }
    }
  }
};

const bimta = new Bimta({
  configMap: configMap,
  platform: ['bi'],
  debug: true,
  env: 'test',
  createCommonParams: function(defaults) {
    return {
      uuid: Date.now()
    };
  }
});

bimta.start();

bimta.pageview({ ea: 'home', eb: 'search' }, { op_type: 'pv' });
bimta.event({ ea: 'home', eb: 'search', ec: 'input' });
```


