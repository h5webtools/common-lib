# 例子

## html

```html
<div class="mod-banner-scroll detail-scroll needsclick">
  <ul class="scroll-list">
    <li class="needsclick"><img data-lazy="./img/01.png"></li>
    <li class="needsclick"><img data-lazy="./img/02.png"></li>
    <li class="needsclick"><img data-lazy="./img/03.png"></li>
    <li class="needsclick"><img data-lazy="./img/04.png"></li>
    <li class="needsclick"><img data-lazy="./img/05.png"></li>
    <li class="needsclick"><img data-lazy="./img/06.png"></li>
  </ul>
  <div class="status-bar">
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
  </div>
</div>
```

## scss

```css
.mod-banner-scroll {
  width: 7.5rem;
  height: 2.35rem;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  box-sizing: border-box;

  .scroll-list {
    position: relative;
    width: 100%;

    li {
      width: 7.5rem;
      height: 2.35rem;
      position: absolute;
      left: 0;
      top: 0;
      overflow: hidden;
      text-align: center;
    }

    img {
      width: 100%;
      position: relative;
      z-index: 100;
    }
  }

  .status-bar {
    position: absolute;
    bottom: .2rem;
    left: 0;
    text-align: center;
    width: 100%;
    height: .15rem;
    font-size: 0;

    i {
      display: inline-block;
      width: .12rem;
      height: .12rem;
      border-radius: 50%;
      margin-left: .16rem;
      vertical-align: middle;
      background-color: rgba(0, 0, 0, 0.2);

      &:first-child {
        margin-left: 0;
      }
    }

    .cur {
      background-color: #ff6e34;
    }
  }
}

.detail-scroll {
  width: 7.5rem;
  height: 8.5rem;
  font-size: 0;

  .scroll-list {
    li {
      padding: .7rem 0;
      width: 7.5rem;
      height: 8rem;
    }

    img {
      width: 5rem;
    }
  }
}
```

## js

```javascript
const slider = new Slider({
  domWrap: document.querySelector('.detail-scroll'),
  loop: false,
  lazyLoad: true,
  topDocMove: false,
  animateTime: 200,
  onComplete: function(dom, index, length) {
    const bar = dom.querySelectorAll('.status-bar i');

    [].forEach.call(bar, function(item) {
      item.classList.remove('cur');
    });
    bar[index].classList.add('cur');
  }
});
```