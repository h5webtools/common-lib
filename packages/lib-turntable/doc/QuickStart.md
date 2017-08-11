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



