# 例子

## html

```html
<div class="container">
  <div class="mod-roll-bg">
    <div class="compass"></div>
    <a class="start-btn" href="javascript:;"></a>
  </div>
</div>
```

## css

```css
html,
body {
  margin: 0;
  padding: 0;
}

html {
  background-color: lightblue;
}

.container {
  padding-top: 2rem;
}

.mod-roll-bg {
  position: relative;
  height: 7.16rem;
  background: url(./img/roll_bg.png) center center no-repeat;
  background-size: 6.71rem 7.15rem;
  overflow: hidden;
}

.mod-roll-bg .compass {
  margin: 0.3rem auto 0 0.565rem;
  width: 6.34rem;
  height: 6.36rem;
  background: url(./img/compass.png) 0 0 no-repeat;
  background-size: 100% auto;
}

.mod-roll-bg .start-btn {
  position: absolute;
  left: 2.78rem;
  top: 2.52rem;
  width: 1.92rem;
  height: 1.92rem;
  opacity: 0;
}
```

## js

```javascript
var rewardData = {
  '1': {
    name: '2%加息券',
    deg: '136'
  },
  '2': {
    name: '1%加息券',
    deg: '262'
  },
  '3': {
    name: '200元抵扣券',
    deg: '95'
  },
  '4': {
    name: '50元抵扣券',
    deg: '180'
  },
  '5': {
    name: '100元现金红包',
    deg: '302'
  },
  '6': {
    name: '30元现金红包',
    deg: '19'
  },
  '7': {
    name: '双十一专场门票',
    deg: '341'
  },
  '8': {
    name: 'iPhone7',
    deg: '222'
  },
  '9': {
    name: 'ipad',
    deg: '56'
  }
};
var turnTable = new Turntable({
  startBtn: document.querySelector('.start-btn'),
  rollElement: document.querySelector('.compass'),
  rewardData: rewardData,
  resultCreator: function(roll) {
    roll(Math.floor(Math.random() * 10));
  },
  end: function(result) {
    console.log(result.name);
  }
});
```