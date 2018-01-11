# API

```javascript
import Orienter from '@jyb/lib-orienter'
```

## 初始化

### new Orienter(options);

```jsdoc
@param {Object} options
```

## 选项

### options
- Type: `Object`
- Default: {}

```javascript
{
  onOrient: function(obj) { // 设备方向变化回调，deviceorientation
    /**
    {
      a: Math.round(event.alpha),
      b: Math.round(event.beta),
      g: Math.round(event.gamma),
      lon: this.lon,
      lat: this.lat,
      dir: this.direction
    } 
     */
  },
  onChange: function(dir) { // 方向改变回调，orientationchange
    // dir，等于window.orientation
  }
}
```

## 实例方法

### init()

初始化

```javascript
instance.init();
```
