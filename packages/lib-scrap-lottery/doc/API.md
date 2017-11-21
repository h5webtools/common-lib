# API

```javascript
import scrapLottery from '@jyb/lib-scrap-lottery'
```

## 初始化

```javascript
let lottery = new scrapLottery(options);
```
-----------

## 选项
### options
- Type: `Object`
- Default: {}
- 字段如下：

```javascript
const config = {
    conId: '',                              // 刮奖容器，id名，必须
    cover: '#ccc',                          // 涂层内容，可以为图片地址或颜色值，可空，默认为 #ccc
    coverType: 'color',                     // 涂层类型，值为 image 或 color，可空，默认为 color
    lottery: null,                          // 刮开后显示的内容，可以为图片地址或字符串，必须
    lotteryType: 'image',                   // 刮开后显示的内容类型，值为 image 或 text，要跟lottery匹配，默认为 image
    width: 300,                             // 刮奖区域宽度，默认为300px，可空
    height: 100,                            // 刮奖区域高度，默认为100px，可空
    isScrape: true,                         // 是否可以刮开，必填
    drawPercentCallback(/* percent*/) { },  // 刮开的区域百分比，可空，返回percent为百分比
};
```

## 可调用方法
- `init()`
- 底层canvas绘图
- 传两个值，图片地址或字符串，分别对应'image'与'text'

```javascript
lotteryObj.init(lottery,lotteryType);
```
---------------