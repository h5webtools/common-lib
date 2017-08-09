/**
 * lib
 */

const defaultOptions = {
  layer: false, // 是否弹层
  attr: 'data-lazy' // lazy属性
};

class ImgLazyload {
  constructor(wrapNode, options = {}) {
    if (!wrapNode) {
      throw new Error('wrapNode为必填项');
    }

    this.wrapNode = wrapNode;
    this.options = Object.assign({}, defaultOptions, options);
    this.loadTimer = null;
    this._init();
  }

  _init() {
    const wh = window.innerHeight;
    const wrapNode = this.wrapNode;
    const options = this.options;
    let imgList = wrapNode.querySelectorAll(`img[${options.attr}]`);

    imgList = Array.prototype.slice.apply(imgList);
    if (!imgList.length) {
      return;
    }

    let ph = options.layer ? wrapNode.scrollTop : window.pageYOffset;
    // 过滤掉已经有src的img
    imgList = imgList.filter((img) => {
      const isLazy = img.getAttribute(options.attr);
      if (isLazy) {
        img.setAttribute('top', img.getBoundingClientRect().top + ph);
      }
      return isLazy;
    });
    clearInterval(this.loadTimer);
    // 检测滚动条位置
    this.loadTimer = setInterval(() => {
      ph = options.layer ? wrapNode.scrollTop : window.pageYOffset;
      if (!imgList.length) {
        clearInterval(this.loadTimer);
        return;
      }
      imgList = imgList.filter((img) => {
        const top = img.getAttribute('top');

        if (top != null && ph + wh > top) {
          img.src = img.getAttribute(options.attr);
          img.removeAttribute(options.attr);
          return false;
        }
        return true;
      });
    }, 200);
  }

  stop() {
    clearInterval(this.loadTimer);
  }
}

export default ImgLazyload;
