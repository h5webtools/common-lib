# 例子

### html

```html
<p id="tip"></p>
```

### javascript

```javascript
var o = new Orienter();
var tip = document.getElementById('tip');

o.onOrient = function(obj) {
  tip.innerHTML =
    'alpha:' + obj.a +
    '<br>' + 'beta:' + obj.b +
    '<br>' + 'gamma:' + obj.g +
    '<br>' + 'longitude:' + obj.lon +
    '<br>' + 'latitude:' + obj.lat +
    '<br>' + 'direction:' + obj.dir;
};
o.init();
```
