# API

```javascript
import Validate from '@jyb/lib-validate'
```

## 初始化

### new Validate(rules, [options]);

```jsdoc
@param {Object[]} rules
@param {Object} options
```

## 选项

### rule
- Type: `Object[]`
- Default: 

```javascript
{
  node: '#name', // 元素，可以传入字符串或者元素对象
  event: ['input'], // 事件触发，没有可以不传
  validators: [{ // 校验器
    name: 'required', // 名称
    options: { // 选项
      itemName: '',
      emptyMsg: ''
    }
  }],
  callback(el, validResult, value) {} // 回调
}
```

### options
- Type: `Object`
- Default:

```javascript
const defaultOptions = {
  eventInterval: 200 // 事件触发间隔时间
};
```

## 实例方法

### addValidator(name, handler)

添加校验器

```javascript
instance.addValidator('newValidator', (el, value, options) => {
  // el: 当前元素对象
  // value: 当前的值
  // options: 校验器的参数的值
  return []; // 返回数组，如果校验通过，数组为空；如果校验失败，数组为错误信息
});
```

### setRuleStatus(node, isDisable)

```text
/**
 * 设置规则状态
 * @param {String|Number} node 字符串或者rule数组下标
 * @param {Boolean} 是否禁用，默认为false
 */
```

```javascript
instance.setRuleStatus('#username', true);
instance.setRuleStatus(0, false);
```

### validate()

校验

```javascript
const validResult = instance.validate();
```

## 内置校验器

### required

校验必填

```jsdoc
/**
 * @param {String} options.errMsg 错误信输出信息
 * @param {String} options.itemName 名称
 */
```

### format

校验格式

```jsdoc
/**
 * @param {Regex} options.reg 规则，正则表达式
 * @param {String} options.itemName 名称
 * @param {String} options.errMsg 错误信输出信息
 */
```

### length

校验长度

```jsdoc
/**
 * @param {Boolean} options.dByte
 * @param {Number} options.maxLen 最大
 * @param {Number} options.minLen 最小
 * @param {String} options.errMsg 错误信输出信息
 * @param {String} options.itemName 名称
 */
```

### range

校验区间

```jsdoc
/**
 * @param {Number} options.minVal 最小值
 * @param {Number} options.maxVal 最大值
 * @param {String} options.errMsg 错误信输出信息
 */
```

### compare

校验比较两个值

```jsdoc
/**
 * @param {Object|String} options.compareWith 跟哪个值比较，可以传入字符串或者元素对象
 * @param {String} options.itemName 名称
 * @param {String} options.errMsg 错误信输出信息
 */
```
