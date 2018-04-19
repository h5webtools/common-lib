/**
 * 图片轮播
 */

const defaultOptions = {
  domWrap: '', // 最外层的dom容器
  auto: false, // 是否自动轮播
  element: 'li', // 轮播元素
  topDocMove: true, // 手指放上去后是否禁用页面的滑动
  animateNode: 'ul', // 执行动画的元素
  loop: true, // 循环图片
  rightLimit: '', // 右边极限位置
  width: window.innerWidth, // 轮播元素宽度
  preLoad: false, // 是否需要多加载一张图
  lazyLoad: false, // 懒加载图片
  animateTime: 500, // 动画执行事件
  fingerFollow: true, // 手指跟随动画
  lazyAttr: 'data-lazy', // 懒加载图片属性
  initIndex: 0, // 初始化加载那一张图
  autoTime: 5000, // 自动轮播间隔
  onClick() {}, // 手指点击动作的回调函数
  onInit(/* dom, index */) {},
  onLeft(/* index */) {}, // 手指点击动作的回调函数
  onRight(/* index */) {},
  onComplete(/* dom, index, length */) {}
};

class Slide {
  constructor(options) {
    this.width = window.innerWidth;
    this.option = Object.assign({}, defaultOptions, options);
    if (!this.option.domWrap) {
      throw new Error('轮播容器不能为空');
    }
    this._initEL();
  }

  _initEL() {
    const _this = this;
    const opt = _this.option;
    // 添加动画的dom元素
    this.animateNode = opt.domWrap.querySelector(opt.animateNode);
    this.domList = opt.domWrap.querySelectorAll(opt.element);
    this.scrollLength = opt.rightLimit ? opt.rightLimit / opt.width : this.domList.length;
    // 是否要循环轮播元素，条件是设置了需要循环，并且轮播元素数量大于2个
    this.isLoop = opt.loop && this.scrollLength > 2;
    // 设置轮播元素的宽度，绝对定位所有元素
    [].forEach.call(this.domList, (item, index) => {
      item.style.cssText = `left:${_this.isLoop && index === _this.scrollLength - 1 ? -opt.width : index * opt.width}px;width:${opt.width}px`;
    });
    // 用于记录位置信息
    this.position = {};
    // 记录初始的位置
    this.currentPosition = opt.width * opt.initIndex;
    // 当前滑动的次数
    this.currentIndex = opt.initIndex;
    // 上次滑动的次数
    this.lastIndex = 0;
    // 记录当前处于第几张轮播图
    this.nextIndex = 0;
    // 移动指定距离
    this._doAnimate(this.currentPosition, true)._animateEnd();
    this.option.onInit.call(this, this.domWrap, this.currentIndex);
    // 事件绑定
    this._initEvent();
    return this;
  }

  _initEvent() {
    // 自动轮播图
    if (this.option.auto) {
      this._startAuto();
    }
    // 绑定touch事件
    this._bindEvent();
  }

  /**
   * 设置轮播元素的位置
   */
  _setELPosition() {
    if (this.lastIndex === this.currentIndex) {
      return;
    }
    const isLeft = this.lastIndex > this.currentIndex;
    const index = this.currentIndex;
    const length = this.scrollLength;

    if (isLeft) {
      if (index <= 0) {
        if (this.nextIndex === 0) {
          this.nextIndex = this.scrollLength - 1;
        }
        if (index % length === 0) {
          this.nextIndex = length - 1;
        } else {
          this.nextIndex = Math.abs(this.nextIndex - 1);
        }
      } else {
        if (index % length === 0) {
          this.nextIndex = 0;
        }
        if ((index - 1) % length === 0) {
          this.nextIndex = 0;
        } else if (index === 0) {
          this.nextIndex = length - 1;
        } else {
          this.nextIndex = Math.abs((index - 1) % length);
        }
      }
      // 左滑
      const target = this.domList[this.nextIndex];
      target.style.left = `${(index - 1) * this.width}px`;
    } else {
      // 右滑
      if ((index + 1) % length === 0) {
        this.nextIndex = 0;
      } else {
        this.nextIndex = (index + 1) % length;
      }
      const target = this.domList[this.nextIndex];
      target.style.left = `${(index + 1) * this.width}px`;
    }
    this.lastIndex = this.currentIndex;
    return this;
  }

  _bindEvent() {
    const wrapNode = this.option.domWrap;
    wrapNode.addEventListener('touchstart', this._handleEvent.bind(this));
    wrapNode.addEventListener('touchmove', this._handleEvent.bind(this));
    wrapNode.addEventListener('touchend', this._handleEvent.bind(this));
    wrapNode.addEventListener('touchcancel', this._handleEvent.bind(this));
    wrapNode.addEventListener('click', this._handleEvent.bind(this));
    this.animateNode.addEventListener('webkitTransitionEnd', this._animateEnd.bind(this));
    return this;
  }

  /**
   * 事件处理
   */
  _handleEvent(e) {
    switch (e.type) {
      case 'touchstart':
        this._start(e);
        break;
      case 'touchmove':
        this._move(e);
        break;
      case 'touchend':
      case 'touchcancel':
        this._end(e);
        break;
      case 'click':
        this.scrollLock = false;
        break;
      default:
        break;
    }
  }

  /**
   * 动画执行完毕后的回调函数
   */
  _animateEnd() {
    // 调用回调函数，提供dom对象以及序号
    this.option.onComplete.call(this, this.option.domWrap, this.currentIndex, this.scrollLength);
    this.isLoop && this._setELPosition();
    this.option.auto && this._startAuto();
    if (this.option.lazyLoad) {
      this._loadImage();
      // 多加载下一张
      this.option.preLoad && this._loadImage(this.getCurrentIndex() + 1);
    }
    this.scrollLock = false;
    return this;
  }

  /**
   * 执行动画
   * @param movePx
   * @param fast 指定是否快速到位
   * @private
   */
  _doAnimate(movePx, fast) {
    const time = fast ? 0 : this.option.animateTime;

    this.animateNode.style.transform = `translate3d(${movePx}px, 0, 0)`;
    this.animateNode.style.webkitTransform = `translate3d(${movePx}px, 0, 0)`;
    this.animateNode.style.transitionDuration = `${time}ms`;
    this.animateNode.style.webkitTransitionDuration = `${time}ms`;
    return this;
  }

  _stopDocument(e) {
    e.preventDefault();
  }

  _start(e) {
    // 锁定，需要在一次动画执行完毕之后才执行下一次动画
    if (this.scrollLock) {
      return;
    }
    const evt = e.changedTouches[0];
    this.position.sx = evt.pageX;
    this.position.sy = evt.pageY;
    this.scrollLock = true;
    this.stopAuto();
    this.option.topDocMove && document.addEventListener('touchmove', this._stopDocument, false);
  }

  _move(e) {
    if (!this.option.fingerFollow || !this.position.sx) {
      return;
    }
    const evt = e.changedTouches[0];
    const x = evt.pageX;
    const y = evt.pageY;
    const dif = x - this.position.sx;

    if (Math.abs(y - this.position.sy) > 50) {
      return;
    }
    if (Math.abs(dif) > 20) {
      e.preventDefault();
      // 移动容器元素实现动画
      this.animateNode.style.transform = `translate3d(${this.currentPosition + dif}px, 0, 0)`;
      this.animateNode.style.webkitTransform = `translate3d(${this.currentPosition + dif}px, 0, 0)`;
      this.animateNode.style.transitionDuration = '0ms';
      this.animateNode.style.webkitTransitionDuration = '0ms';
    }
  }

  _end(e) {
    if (!this.scrollLock) return;
    if (!this.position.sx) {
      this.scrollLock = false;
      return;
    }
    this.option.topDocMove && document.removeEventListener('touchmove', this._stopDocument, false);
    const evt = e.changedTouches[0];
    const x = evt.pageX;
    const y = evt.pageY;

    // 记录手指放开时的位置
    this.position.ex = x;
    // 计算移动距离
    const dif = this.position.ex - this.position.sx;
    if (dif === 0) {
      this.option.onClick.call(this);
      this.position = {};
      return;
    }
    // 纵向滑动，不做处理
    const difY = this.position.sy - y;
    if (Math.abs(difY) > 50) {
      this._doAnimate(-this.currentIndex * this.width, false);
    } else if (Math.abs(dif) < this.width / 4) { // 移动距离小，回弹回去
      this._doAnimate(-this.currentIndex * this.width);
    } else {
      this.lastIndex = this.currentIndex;
      // 判断移动的方向，小于0左滑
      if (dif < 0) {
        this.currentIndex++;
        this.option.onLeft.call(this, this.currentIndex);
      } else {
        this.currentIndex--;
        this.option.onRight.call(this, this.currentIndex);
      }
      if (!this.isLoop) {
        if (this.currentIndex < 0) {
          this.currentIndex = 0;
        } else {
          this.currentIndex = this.currentIndex >= this.scrollLength - 1 ? this.scrollLength - 1 : this.currentIndex;
        }
      }
      this.toNext();
    }
    this.position = {};
  }

  /**
   * 延迟加载图片
   * @private
   */
  _loadImage(index) {
    // eq这个方法可以接受负值作为参数，如果未负数，则从后往前提供dom对象
    index = index || this.getCurrentIndex();
    const target = this.domList[index];

    if (target && !target.getAttribute('loaded')) {
      const img = target.querySelector('img');
      const src = img.getAttribute(this.option.lazyAttr);

      img.setAttribute('src', src);
      img.removeAttribute(this.option.lazyAttr);
      target.setAttribute('loaded', 1);
    }
  }

  /**
   * 启动自动轮播
   */
  _startAuto() {
    const _this = this;
    clearTimeout(_this.autoPtr);
    this.autoPtr = setTimeout(() => {
      if (_this.autoLock) {
        return;
      }
      // 判断是否是循环的
      if (_this.isLoop) {
        _this.currentIndex++;
      } else {
        // 到底之后往回走
        if (_this.currentIndex === _this.scrollLength - 1) {
          _this.reverse = true;
        } else if (_this.currentIndex === 0) {
          _this.reverse = false;
        }
        if (_this.reverse) {
          _this.currentIndex--;
        } else {
          _this.currentIndex++;
        }
      }
      _this.toNext();
    }, this.option.autoTime);
  }

  /**
   * 切换到下一个轮播元素
   */
  toNext(index) {
    if (typeof index !== 'undefined') {
      if (index < 0) {
        index = 0;
      } else {
        index = index >= this.scrollLength - 1 ? this.scrollLength - 1 : index;
      }
      this.lastIndex = this.currentIndex;
      this.currentIndex = index;
    }
    this.currentPosition = -this.currentIndex * this.width;
    this._doAnimate(this.currentPosition);
    return this;
  }

  stopAuto() {
    clearTimeout(this.autoPtr);
    this.autoPtr = null;
    this.reverse = false;
  }

  stopAutoThorough() {
    clearTimeout(this.autoPtr);
    this.autoPtr = null;
    this.reverse = false;
    this.option.auto = false;
  }

  /**
   * 获取当前轮播元素序号
   * @returns {number}
   */
  getCurrentIndex() {
    const current = this.currentIndex;
    const mod = Math.ceil(Math.abs(current / this.scrollLength));

    return Math.abs(
      current < 0 ? ((mod * this.scrollLength) + current) % this.scrollLength : current % this.scrollLength
    );
  }

  destroy() {
    const wrapNode = this.option.domWrap;
    wrapNode.removeEventListener('touchstart', this._handleEvent.bind(this));
    wrapNode.removeEventListener('touchmove', this._handleEvent.bind(this));
    wrapNode.removeEventListener('touchend', this._handleEvent.bind(this));
    this.animateNode.removeEventListener('webkitTransitionEnd', this._animateEnd.bind(this));
    this.stopAuto();
    return this;
  }

  updateEL() {
    this.destroy()._initEL();
  }

  reverse() {
    this._bindEvent()._animateEnd();
  }
}

export default Slide;
