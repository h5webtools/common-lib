# 快速开始

## 安装

```shell
npm install @jyb/lib-lottery --save
```

## 使用

### 引入

```javascript
import Lottery from '@jyb/lib-lottery'
```

### 调用方法
- 触发抽奖按钮动作后，按照如下方法调用组件

```javascript
var lottery = new Lottery({
    maxGrid: 8,                             // 最大格子数量
    times: 50,                              // 格子高亮次数
    prizeIndex: 0,                          // 奖品所在格子顺序1-8
    speed: 80,                              // 转速
    gridClass: 'reward-item',               // 格子类名，用于查找格子数量
    callback: function(node) {              // 停止时的回调函数
        // your code here 
    },       
    activeClass: 'reward-item__active',     // 格子高亮的样式
    reduce: 10,                             // 转速递减值
    advanceTimes: 10,                       // 提前多少步开始减速
    continueTimes: 20                       // 转圈数每次递增的数量
})
```
- 通常情况下点击抽奖按钮后需要从后端请求奖品，所以奖品需要等接口返回后再设置

```javascript
ajaxcallback(function(json) {
    // 设置奖品格子
    lottery.setPrizeIndex(json.data.level);
    // 再增加一些高亮次数，为了防止接口太慢，之前设置的次数快要消耗完了
    lottery.setTimes(20);
})
```

## 例子
- 九宫格html

```html
<div class="lottery-content">
    <ul class="mod-nine-reward-list">
        <li class="reward-item" index="1" rewardName="200元理财红包">
            <div class="reward-inner">
                <div class="coupon-icon">
                    <span class="f-34">200</span><span class="f-24">元</span>
                </div>
                <p class="f-24 ui-mt-5">理财红包</p>
            </div>
        </li>
        <li class="reward-item" index="2" rewardName="2.5%加息券">
            <div class="reward-inner">
                <div class="jxq-icon">
                    <span class="f-24">2.5%</span><span class="f-18">券</span>
                </div>
                <p class="f-24 ui-mt-5">2.5%加息券</p>
            </div>
        </li>
        <li class="reward-item" index="3" rewardName="30元理财红包">
            <div class="reward-inner">
                <div class="coupon-icon">
                    <span class="f-34">30</span><span class="f-24">元</span>
                </div>
                <p class="f-24 ui-mt-5">理财红包</p>
            </div>
        </li>
        <li class="reward-item" index="8" rewardName="1.5%加息券">
            <div class="reward-inner">
                <div class="jxq-icon">
                    <span class="f-24">1.5%</span><span class="f-18">券</span>
                </div>
                <p class="f-24 ui-mt-5">1.5%加息券</p>
            </div>
        </li>
        <li class="reward-item reward-item--touch" et="click:startLottery">
            <div class="reward-inner">抽奖</div>
        </li>
        <li class="reward-item" index="4" rewardName="1%加息券">
            <div class="reward-inner">
                <div class="jxq-icon">
                    <span class="f-34">1%</span><span class="f-24">券</span>
                </div>
                <p class="f-24 ui-mt-5">1%加息券</p>
            </div>
        </li>
        <li class="reward-item" index="7" rewardName="50元理财红包">
            <div class="reward-inner">
                <div class="coupon-icon">
                    <span class="f-34">50</span><span class="f-24">元</span>
                </div>
                <p class="f-24 ui-mt-5">理财红包</p>
            </div>
        </li>
        <li class="reward-item" index="6" rewardName="100元理财红包">
            <div class="reward-inner">
                <div class="coupon-icon">
                    <span class="f-34">100</span><span class="f-24">元</span>
                </div>
                <p class="f-24 ui-mt-5">理财红包</p>
            </div>
        </li>
        <li class="reward-item" index="5" rewardName="2%加息券">
            <div class="reward-inner">
                <div class="jxq-icon">
                    <span class="f-34">2%</span><span class="f-24">券</span>
                </div>
                <p class="f-24 ui-mt-5">2%加息券</p>
            </div>
        </li>
    </ul>
</div>
```

- 九宫格scss

```css
// 九宫格容器
.mod-nine-lottery-theme1 {
    background-color: #f44e51;
    @include rounded(12px);
    overflow: hidden;
    .lottery-title {
        background-image: url(../images/index/repeat.png?base64);
        background-repeat: repeat;
        @include rounded(12px);
        margin: .3rem .35rem;
        font-size: .3rem;
        text-align: center;
        padding: .2rem 0;
        line-height: 1.3;
        color: #fff;
    }
    .lottery-content {
        padding: .4rem .3rem;
        position: relative;
        box-sizing: border-box;
        &:before {
            position: absolute;
            background-image: url(../images/index/light.png);
            width: 6.9rem;
            height: 5.2rem;
            left: 0;
            top: 0.06rem;
            content: "";
            background-size: 100%;
            z-index: 0;
        }
    }
}
// 九个格子
.mod-nine-reward-list {
    background-color: #c02d32;
    @include rounded(12px);
    text-align: center;
    overflow: hidden;
    padding: 0.05rem;
    position: relative;
    z-index: 100;
    .reward-item {
        float: left;
        padding: 0.05rem;
        width: 2.06rem;
        box-sizing: border-box;
        color: #67161c;
        .reward-inner {
            background-color: #fef7ee;
            height: 1.35rem;
            box-shadow: inset 0px -.1rem 0px 0px #ffd7bf;
            position: relative;
            padding-top: .15rem;
            box-sizing: border-box;
            font-size: 0;
            @include vt-middle();
            @include rounded(12px);
            -webkit-box-orient: vertical;
            transition: all 0.3s ease;
        }
        &.reward-item--touch {
            .reward-inner {
                background-color: #fcde30;
                box-shadow: inset 0px -.1rem 0px 0px #ffd350;
                color: #88571b;
                font-size: .42rem;
                &:before, &:after {
                    content: '';
                    position: absolute;
                    top: .1rem;
                    height: .1rem;
                    background-color: #fffda4;
                }
                &:before {
                    left: .3rem;
                    width: .1rem;
                    border-radius: 50%;
                }
                &:after {
                    left: .5rem;
                    width: 1rem;
                    border-radius: 10px;
                }
            }
        }
        &.reward-item__active {
            .reward-inner {
                background-color: #fcde30;
                box-shadow: inset 0px -.1rem 0px 0px #ffd350;
            } 
        }
    }
    .jxq-icon {
        background-image: url(../images/index/jxq.png?base64);
        width: 1rem;
        height: .54rem;
        line-height: .54rem;
        display: inline-block;
        color: #fff;
    }
    .coupon-icon {
        background-image: url(../images/index/coupon.png?base64);
        width: 1.03rem;
        height: .61rem;
        color: #fdf453;
        display: inline-block;
        line-height: .61rem;
    }
}
```

## 要求
- 每一个格子都需要有一个index属性用于获取格子顺序，如果找不到index，则该格子会被忽略
