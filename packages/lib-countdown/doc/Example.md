# 例子

## html

```html
<span class="count-down-3"></span>
<span class="count-down-60"></span>
```

## js

```javascript
var countDown3 = document.querySelector('.count-down-3');
var countDown60 = document.querySelector('.count-down-60');
var cd3 = new CountDown({
  time: 3,
  processCallback: function(time) {
    countDown3.innerHTML = time + 's';
  },
  endCallback: function() {
    console.log('count-down-3 end');
  }
});

var cd60 = new CountDown({
  time: 60,
  processCallback: function(time) {
    countDown60.innerHTML = time + 's';
  },
  endCallback: function() {
    console.log('count-down-60 end');
  }
});
```