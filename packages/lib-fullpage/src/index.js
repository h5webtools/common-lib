/**
 * fullpage
 */

const d = {
  page: '.page',
  start: 0,
  duration: 500,
  loop: false,
  drag: false,
  dir: 'v',
  der: 0.1,
  delay: 0,
  change(/* data */) {},
  beforeChange(/* data */) {},
  afterChange(/* data */) {},
  orientationchange(/* orientation */) {}
};

function touchmove(e) {
  e.preventDefault();
}

function fix(cur, pagesLength, loop) {
  if (cur < 0) {
    return loop ? pagesLength - 1 : 0;
  }

  if (cur >= pagesLength) {
    return loop ? 0 : pagesLength - 1;
  }

  return cur;
}

function move(ele, dir, dist) {
  let xPx = '0px';
  let yPx = '0px';
  if (dir === 'v') yPx = `${dist}px`;
  else xPx = `${dist}px`;
  ele.style.cssText += (`;-webkit-transform : translate3d(${xPx}, ${yPx}, 0px);` +
    `transform : translate3d(${xPx}, ${yPx}, 0px);`);
}

function init(option) {
  const o = option || {};
  for (const key in d) {
    /* eslint-disable no-prototype-builtins */
    if (!o.hasOwnProperty(key)) {
      o[key] = d[key];
    }
  }

  const that = this;
  that.curIndex = -1;
  that.o = o;

  that.startY = 0;
  that.movingFlag = false;

  that.ele.classList.add('fullPage-wp');
  that.parentEle = that.ele.parentNode;

  let query = o.page;
  if (query.indexOf('.') === 0) {
    query = query.substring(1, query.length);
  }
  that.pageEles = that.ele.getElementsByClassName(query);
  for (let i = 0; i < that.pageEles.length; i++) {
    const pageEle = that.pageEles[i];
    pageEle.classList.add('fullPage-page');
    pageEle.classList.add(`fullPage-dir-${o.dir}`);
  }

  that.pagesLength = that.pageEles.length;
  that.update();
  that.initEvent();
  that.start();
}

function Fullpage(ele, option) {
  this.ele = ele;
  init.call(this, option);
}

Fullpage.prototype.update = function () {
  if (this.o.dir === 'h') {
    this.width = this.parentEle.offsetWidth;
    for (let i = 0; i < this.pageEles.length; i++) {
      const pageEle = this.pageEles[i];
      pageEle.style.width = `${this.width}px`;
    }
    this.ele.style.width = `${this.width * this.pagesLength}px`;
  }

  this.height = this.parentEle.offsetHeight;
  for (let i = 0; i < this.pageEles.length; i++) {
    const pageEle = this.pageEles[i];
    pageEle.style.height = `${this.height}px`;
  }

  this.moveTo(this.curIndex < 0 ? this.o.start : this.curIndex);
};

Fullpage.prototype.initEvent = function () {
  const that = this;
  const ele = that.ele;

  ele.addEventListener('touchstart', (e) => {
    if (!that.status) { return 1; }
    // e.preventDefault();
    if (that.movingFlag) {
      return 0;
    }

    that.startX = e.targetTouches[0].pageX;
    that.startY = e.targetTouches[0].pageY;
  });
  ele.addEventListener('touchend', (e) => {
    if (!that.status) { return 1; }
    // e.preventDefault();
    if (that.movingFlag) {
      return 0;
    }

    /* eslint-disable max-len */
    const sub = that.o.dir === 'v' ? (e.changedTouches[0].pageY - that.startY) / that.height : (e.changedTouches[0].pageX - that.startX) / that.width;
    /* eslint-disable no-nested-ternary */
    const der = (sub > that.o.der || sub < -that.o.der) ? sub > 0 ? -1 : 1 : 0;

    that.moveTo(that.curIndex + der, true);
  });
  if (that.o.drag) {
    ele.addEventListener('touchmove', (e) => {
      if (!that.status) { return 1; }
      // e.preventDefault();
      if (that.movingFlag) {
        that.startX = e.targetTouches[0].pageX;
        that.startY = e.targetTouches[0].pageY;
        return 0;
      }

      let y = e.changedTouches[0].pageY - that.startY;
      if ((that.curIndex === 0 && y > 0) || (that.curIndex === that.pagesLength - 1 && y < 0)) y /= 2;
      let x = e.changedTouches[0].pageX - that.startX;
      if ((that.curIndex === 0 && x > 0) || (that.curIndex === that.pagesLength - 1 && x < 0)) x /= 2;
      /* eslint-disable no-mixed-operators */
      const dist = (that.o.dir === 'v' ? (-that.curIndex * that.height + y) : (-that.curIndex * that.width + x));
      ele.classList.remove('anim');
      move(ele, that.o.dir, dist);
    });
  }

  // 翻转屏幕提示
  // ==============================
  window.addEventListener('orientationchange', () => {
    if (window.orientation === 180 || window.orientation === 0) {
      that.o.orientationchange('portrait');
    }
    if (window.orientation === 90 || window.orientation === -90) {
      that.o.orientationchange('landscape');
    }
  }, false);

  window.addEventListener('resize', () => {
    that.update();
  }, false);
};

Fullpage.prototype.holdTouch = function () {
  document.addEventListener('touchmove', touchmove);
};

Fullpage.prototype.unholdTouch = function () {
  document.removeEventListener('touchmove', touchmove);
};

Fullpage.prototype.start = function () {
  this.status = 1;
  this.holdTouch();
};

Fullpage.prototype.stop = function () {
  this.status = 0;
  this.unholdTouch();
};

Fullpage.prototype.getCurIndex = function () {
  return this.curIndex;
};

Fullpage.prototype.moveTo = function (next, anim) {
  const that = this;
  const ele = that.ele;
  const cur = that.curIndex;
  next = fix(next, that.pagesLength, that.o.loop);

  if (anim) {
    ele.classList.add('anim');
  } else {
    ele.classList.remove('anim');
  }

  if (next !== cur) {
    const flag = that.o.beforeChange.call(that, { next, cur });
    // beforeChange 显示返回false 可阻止滚屏的发生
    if (flag === false) {
      return 1;
    }
  }

  that.movingFlag = true;
  that.curIndex = next;

  that.sleep(() => {
    move(ele, that.o.dir, -next * (that.o.dir === 'v' ? that.height : that.width));

    if (next !== cur) {
      that.o.change({
        prev: cur,
        cur: next
      });
    }

    window.setTimeout(() => {
      that.movingFlag = false;
      if (next !== cur) {
        that.o.afterChange.call(that, {
          prev: cur,
          cur: next
        });
        for (let i = 0; i < that.pageEles.length; i++) {
          const pageEle = that.pageEles[i];
          if (i === next) {
            pageEle.classList.add('cur');
          } else {
            pageEle.classList.remove('cur');
          }
        }
      }
    }, that.o.duration);
  });
};

Fullpage.prototype.sleep = function (fn) {
  const delay = this.o.delay;
  if (delay) {
    clearTimeout(this.sleepTimer);
    this.sleepTimer = setTimeout(() => { fn(); }, delay);
  } else {
    fn();
  }
};

Fullpage.prototype.movePrev = function (anim) {
  this.moveTo(this.curIndex - 1, anim);
};

Fullpage.prototype.moveNext = function (anim) {
  this.moveTo(this.curIndex + 1, anim);
};

Element.prototype.fullpage = function (option) {
  return new Fullpage(this, option);
};

export default Fullpage;
