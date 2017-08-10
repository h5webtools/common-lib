# 快速开始

## 安装

```shell
npm install @jyb/lib-turntable --save
```

## 使用

### 引入

```javascript
import Turntable from '@jyb/lib-turntable'
```

## 调用

```javascript
var priceMap = {
  '1': '2%加息券',
  '2': '1%加息券',
  '3': '200元抵扣券',
  '4': '50元抵扣券',
  '5': '100元现金红包',
  '6': '30元现金红包',
  '7': '双十一专场门票',
  '8': 'iPhone7',
  '9': 'ipad'
};
var turnTable = new Turntable({
  startBtn: document.querySelector('.start-btn'),
  rollElement: document.querySelector('.compass'),
  rewardData: {
    '1': '136',
    '2': '262',
    '3': '95',
    '4': '180',
    '5': '302',
    '6': '19',
    '7': '341',
    '8': '222',
    '9': '56'
  },
  resultCreator: function(roll) {
    roll(Math.floor(Math.random() * 10));
  },
  end: function(result) {
    console.log(priceMap[result]);
  }
});
```



