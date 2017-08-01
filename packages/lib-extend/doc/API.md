# API

```javascript
import extend from '@jyb/lib-extend'
```

```jsdoc
/**
 * Extend one object with one or more others, returning the modified object.
 * extend ( [deep], target, object1, [objectN] )
 * @param {Boolean} deep If set, the merge becomes recursive (i.e. deep copy).
 * @param {Object} target The object to extend.
 * @param {Object} object1 The object that will be merged into the first.
 * @param {Object} objectN More objects to merge into the first.
 */
```

## 选项

### deep
- Type: `Boolean`
- Default: false

是否为深拷贝

### target
- Type: `Object`
- Default: {}

目标对象
