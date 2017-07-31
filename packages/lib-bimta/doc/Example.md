# 例子

## 页面元素

```html
<div data-stat-ea="home">
  <div data-stat-eb="search" data-stat-visit="pv">
    <a data-stat-ec="btn" data-stat-para="{'op_type': 'click'}" href="javascript:;">search</a>
  </div>
</div>
```

## 配置表

```javascript
(function(exports) {
  exports.configMap = {
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
})(window);
```

## 使用

```javascript
(function() {
  var bimta = new Bimta({
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

  bimta.pageview({
    ea: 'home',
    eb: 'search'
  }, {
    op_type: 'pv'
  });
  bimta.event({
    ea: 'home',
    eb: 'search',
    ec: 'input'
  });
})();
```