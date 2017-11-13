# 快速开始

## 安装

```shell
npm install @jyb/lib-scrap-lottery --save
```

## 使用

### 引入

```javascript
import scrapLottery from '@jyb/lib-scrap-lottery'
```

### 调用方法
- 一般在页面初始化的时候调用

```javascript
const lottery = new ScrapLottery({
    conId: 'lotteryContainer',              // 刮奖容器，id名，必须
    cover: '#ccc',                          // 涂层内容，可以为图片地址或颜色值，可空，默认为 #ccc
    coverType: 'color',                     // 涂层类型，值为 image 或 color，可空，默认为 color
    lottery: null,                          // 刮开后显示的内容，可以为图片地址或字符串，必须
    lotteryType: 'image',                   // 刮开后显示的内容类型，值为 image 或 text，要跟lottery匹配，默认为 image
    width: 300,                             // 刮奖区域宽度，默认为300px，可空
    height: 100,                            // 刮奖区域高度，默认为100px，可空
    isScrape: true,                         // 是否可以刮开，必填
    drawPercentCallback(percent) {          // 刮开的区域百分比，可空，返回percent为百分比
        alert("恭喜您中奖了");
    },  
});
lottery.init('red', 'text');                //text类型
lottery.init('./image/lottery_no.png', 'image');                //image类型，传图片，图片尽量传本地，否则容易出现跨域问题
```
## 例子
- 刮奖html
```html
<div class="lottery-wrap">
    <div class="lottery-box">
      <div id="lotteryContainer"></div>
    </div> 
    <div class="lottery-content-none"  id="lottery_again">
        <p class="f-30 color-fff lottery-chance">当前您的刮奖机会：<span class="number" id="number">0次</span></p>
        <a href="javascript:;" class="lottery-reload f-24" et="click:lotteryAgain">再刮一次</a>
      </div>
  </div>
```

- 刮奖scss

```css

#lotteryContainer {
    position:relative;
    width: 5.91rem;
    height:2.27rem;
    display: inline-block;
    background: #fcc4c4;
    border-radius: 0.1rem;
    a{
      display: block;
      width: 100%;
      height: 100%;
    }
}
.lottery-wrap{
  width: 7rem;
  height: 4.35rem;
  border-radius: 0.15rem;
  background: #c93c1a;
  border: 1px solid #b13316;
  margin: 0 auto;
  .lottery-box{
    width: 6.56rem;
    height: 2.75rem;
    background: url(img/lottery_bg.png);
    background-size: 100% 100%;
    margin: 0.35rem auto;
    text-align: center;
    padding-top: 0.24rem;
  }
  .lottery-content{
    overflow: hidden;
    position: relative;
    .lottery-chance{
      float: left;
      display: inline-block;
      width: 70%;
    }
    .lottery-reload{
      display: inline-block;
      position: absolute;
      bottom: 0rem;
      right: 0;
      text-decoration: underline;
      color: #ffce3d;
      height: .4rem;
      line-height: .4rem;
      width: 20%;
      margin-right: 10%;
      display: block;
    }
  }
  .lottery-content-none{
    .lottery-chance{
      display: block;
    }
    .lottery-reload{
      display: none;
    }
  }
}
.number{
  display: inline-block;
  height: .5rem;
  line-height: .5rem;
  border-radius: .5rem;
  padding: 0 .25rem;
  background: #ffce3d;
  color: #ea3003;
}
```


