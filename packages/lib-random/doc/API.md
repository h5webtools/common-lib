# API

```javascript
import random from '@jyb/lib-random';
```

## 方法

### random.getRandom()

```jsdoc
/**
 * 得到一个大于等于0，小于1之间的随机数
 * @return {Number}
 */
```

### random.getRandomArbitrary(min, max)

```jsdoc
/**
 * 得到一个两数之间的随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return {Number} 返回了一个在指定值之间的随机数。这个值比min大（可能与min相等）, 以及比max小(但是不等于max).
 */
```

### random.getRandomInt(min, max)

```jsdoc
/**
 * 得到一个两数之间的随机整数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return {Number} 返回了一个在指定值之间的随机整数。这个值比min大（可能与min相等，如果min不是整数，那么下一个整数大于min）, 以及比max小(但是不等于max).
 */
```

### random.getRandomIntInclusive(min, max)

```jsdoc
/**
 * 得到一个两数之间的随机整数，包括两个数在内
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return {Number} 返回了一个在指定值之间的随机整数。返回值可能与最小值或者最大值相等
 */
```

### random.getRandomBool()

```jsdoc
/**
 * 获取一个随机布尔值
 * @return {boolean} 随机true/false
 */
```


