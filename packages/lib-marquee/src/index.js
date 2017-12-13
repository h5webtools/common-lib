/**
 * 跑马灯
 */

import * as util from './util';

const defaultOptions = {
  step: 0, // 每次滚动的步长(px)
  stepInterval: 400, // 滚动效果执行时间(ms)
  interval: 3000, // 每次滚动间隔时间(ms)
  dir: 'left', // 滚动方向，up、down、left、right
  autoPlay: true, // 是否自动滚动
  hoverPause: true // 是否在鼠标滑过时暂停滚动
};

class Marquee {
  constructor(el, options = {}) {
    // 要滚动的元素
    this.elem = el;
    // 选项
    this.options = Object.assign({}, defaultOptions, options);
    // 保存暂停状态
    this.pausing = false;
    // 滚动计时器
    this.timerStep = null;
    // 滚动间隔计时器
    this.timer = null;
    this.init();
  }

  init() {
    // 如果元素不存在则直接返回
    if (!this.elem) return false;
    // 复制滚动元素内容并填充
    this.elem.innerHTML += this.elem.innerHTML;
    this.loadStyle();
    this.options.hoverPause && this.bindEvents();
    this.options.autoPlay && this.startScroll();
  }

  // 初始化滚动元素的样式
  loadStyle() {
    const childrens = this.elem.children;
    const dir = this.options.dir;

    // 如果是左右滚动就给滚动元素加上宽度
    if (dir === 'left' || dir === 'right') {
      this.elem.style.width = `${childrens[0].offsetWidth * childrens.length}px`;
    }

    // 如果是向右滚动，初始时将滚动元素的left设置为负的自身宽度的一半
    if (dir === 'right' && this.elem.offsetLeft === 0) {
      this.elem.style.left = `${-this.elem.offsetWidth / 2}px`;
    }

    // 如果是向左滚动，初始时将滚动元素的left设置为0
    if (dir === 'left' && this.elem.offsetLeft === -this.elem.offsetWidth / 2) {
      this.elem.style.left = 0;
    }

    // 如果是向下滚动，初始时将滚动元素的top设置为负的自向高度的一半
    if (dir === 'down' && this.elem.offsetTop === 0) {
      this.elem.style.top = `${-this.elem.offsetHeight / 2}px`;
    }

    // 如果是向上滚动，初始时将滚动元素的top设置为0
    if (dir === 'up' && this.elem.offsetTop === -this.elem.offsetHeight / 2) {
      this.elem.style.top = 0;
    }
  }

  // 绑定控制元素的事件
  bindEvents() {
    // 鼠标移入父级元素时暂停
    util.bind(this.elem.parentNode, 'mouseover', () => {
      this.stop();
      this.pausing = true;
    });

    // 鼠标移出父级元素时重新开始滚动
    util.bind(this.elem.parentNode, 'mouseout', () => {
      this.pausing = false;
      this.options.autoPlay && this.startScroll();
    });
  }

  // 停止滚动
  stop() {
    clearInterval(this.timer);
  }

  // 执行滚动效果
  doScroll() {
    let style = '';
    let offset = '';
    let target = 0;
    let step = 0;
    let elemSize = 0;

    if (this.options.dir === 'left' || this.options.dir === 'right') {
      // element.style[ 'left' | 'top' ]
      style = 'left';
      offset = 'offsetLeft';
      elemSize = this.elem.offsetWidth / 2;
    } else {
      // element[ offset[Left|Top] ];
      style = 'top';
      offset = 'offsetTop';
      elemSize = this.elem.offsetHeight / 2;
    }

    step = (this.options.dir === 'left' || this.options.dir === 'up') ? -this.options.step : this.options.step;
    if (this.options.stepInterval === 0) {
      // 滚动效果执行时间为0时，进入无缝滚动模式
      if (elemSize - Math.abs(this.elem[offset]) < Math.abs(step)) {
        step = (step / Math.abs(step)) * (elemSize - Math.abs(this.elem[offset]));
      }
      target = this.elem[offset] + step;
      target = util.fixTarget(step, this.elem[offset] + step, elemSize);
      this.elem.style[style] = `${target}px`;
    } else {
      if (this.timerStep != null) return;
      // 先停止掉this.timer，在滚动执行完过后再开启
      this.stop();
      // 将step按stepInterval分割
      let seed = (30 / this.options.stepInterval) * step;
      seed = seed < 0 ? Math.ceil(seed) : Math.floor(seed);
      this.timerStep = setInterval(() => {
        seed = seed > 0 ? Math.min(seed, step) : Math.max(seed, step);
        target = util.fixTarget(seed, this.elem[offset] + seed, elemSize);
        this.elem.style[style] = `${target}px`;
        step -= seed;
        if (step === 0) {
          clearInterval(this.timerStep);
          this.timerStep = null;
          if (this.options.autoPlay && !this.pausing) {
            this.startScroll();
          }
        }
      }, 30);
    }
  }

  // 改变方向
  changeDir(dir) {
    this.options.dir = dir;
    this.loadStyle();
    this.doScroll();
  }

  // 开始滚动
  startScroll() {
    this.timer = setInterval(() => {
      this.doScroll();
    }, this.options.interval);
  }
}

export default Marquee;
