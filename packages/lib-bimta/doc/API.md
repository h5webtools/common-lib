# API

```javascript
import Bimta from '@jyb/lib-bimta'
```

## 初始化

### new Bimta(options);

```jsdoc
@param {Object} options
```

## 选项

### configMap
- Type: `Object`
- Default: {}

配置表，格式如下：

```javascript
const configMap = {
    home: { // 自定义，对应ea
        id: '30000',
        search: { // 自定义，对应eb
            id: '1',
            pv: { // 固定为pv
                id: '1'
            },
            btn: { // 自定义，对应ec
                id: '2'
            }
        }
    }
};
```

### platform
- Type: `Array|Object`
- Default: ['bi', 'mta']

数据上报平台

类型为`Array`时，可以取值`bi`,`mta`；

类型为`Object`时，可以取值为：

```javascript
{
    bi: {
        ak: '', // 默认：KVQiUTJf
        cmd: '' // 默认：65010000
    },
    mta: {
        src: '', // 默认：//pingjs.qq.com/h5/stats.js?v2.0.4
        name: '', // 默认：MTAH5
        sid: '', // 默认：500478186
        cid: '' // 默认：500478188
    }
}
```

### createCommonParams
- Type: `Function`
- Default: function() { return {}; }

生成公共参数

```javascript
function createCommonParams(defaults) {
    // defaults为内部的生成公共参数函数返回的值，你可以选择进行合并
    return {};
}
```

### env
- Type: `String`
- Default: 'test'

设置上报环境，取值可以为`test`,`prod`

### debug
- Type: `Boolean`
- Default: false

是否为调试模式，为`true`时，会有日志输出

## 实例方法

### start()

启动上报

```javascript
instance.start();
```

### pageview(eventID, params)

pageview上报

```jsdoc
@param {String|Object} eventID '10000.1.1'/{ea: 'bargain', eb: 'home'}
@param {Object} params 参数
@param {String} params.op_type 可取值click，touch，share，默认为click
@param {String} params.act_id 活动ID，默认为空
@param {Stirng} params.group 用户群，默认为空
@param {String} params.source 渠道，默认获取url querystring中的from
```

```javascript
instance.pageview();
```

### event(eventID, params)

event上报

```jsdoc
@param {String|Object} eventID '10000.1.1'/{ea: 'bargain', eb: 'home', ec: 'btn'}
@param {Object} params 参数
```

```javascript
instance.event();
```