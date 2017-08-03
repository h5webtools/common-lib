/**
 * lib
 */

function noop() {}

const defaultOptions = {
  minDistance: 100, // 最小滑动距离
  element: '', // 要移动的元素
  releaseBack: true, // 手放开后是否回弹
  direct: 'up', // 默认的手指滑动方向
  stopDocMove: true, // 手指滑动时是否禁止屏幕滑动
  initValue: 0, // 滑动元素初始所在的位置
  condition: '', // 事件触发条件，在touchstart的时候会调用该方法进行判断，返回true则进行下一项
  onRelease: noop, // 手指放开后的回调函数
  onRecovery: noop // 恢复原状时的回调函数
};

class Elastic {
  constructor(options = {}) {
    this.options = Object.assign({}, defaultOptions, options);
    this.position = {};
    this._init();
  }

  _init() {
    // 先释放事件
    this._releaseEvent();
    this._bindEvent();
  }

  _bindEvent() {
    this.options.element.addEventListener('touchstart', this._tstart.bind(this), false);
  }

  _tstart(e) {
    const options = this.options;

    // 判断是否有前置条件
    if (options.condition) {
      // 不满足条件
      if (!options.condition()) {
        return;
      }
    }
    const evt = e.changedTouches[0];
    this.ignoreTouch = false;
    this.position.sx = evt.pageX;
    this.position.sy = evt.pageY;

    options.element.addEventListener('touchmove', this._tmove.bind(this), false);
    options.element.addEventListener('touchend', this._tend.bind(this), false);
    if (options.stopDocMove) {
      document.addEventListener('touchmove', stopDocMove, false);
    }
  }

  _tmove(e) {
    const options = this.options;
    const evt = e.changedTouches[0];

    this.position.mx = evt.pageX;
    this.position.my = evt.pageY;

    const diffX = this.position.mx - this.position.sx;
    const diffY = this.position.my - this.position.sy;

    this.ignoreTouch = false;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        this.direct = 'right';
      } else if (diffX < 0) {
        this.direct = 'left';
      }
    } else if (Math.abs(diffX) < Math.abs(diffY)) {
      if (diffY > 0) {
        this.direct = 'down';
      } else if (diffY < 0) {
        this.direct = 'up';
      }
    } else {
      this.ignoreTouch = true;
    }
    this.diffY = this.position.my - this.position.sy;
    if (this.direct === options.direct) {
      this.fingerFollow();
    } else if (options.stopDocMove) {
      document.removeEventListener('touchmove', stopDocMove, false);
    }
  }

  _tend(e) {
    const options = this.options;
    const evt = e.changedTouches[0];

    this.position.ey = evt.pageY;
    // 移动距离过小
    if (Math.abs(this.position.ey - this.position.sy) < options.minDistance) {
      this._releaseEvent();
      this.recoverStatus();
      return;
    }
    // 手指放开后回弹回去
    if (options.releaseBack) {
      this.recoverStatus();
    }
    this._releaseEvent();
    if (this.direct === options.direct) {
      options.onRelease.call(this);
    }

    options.element.style.webkitTransform = '';
    options.element.style.webkitTransitionDuration = '';
  }

  _releaseEvent() {
    const options = this.options;

    options.element.removeEventListener('touchmove', this._tmove.bind(this), false);
    options.element.removeEventListener('touchend', this._tend.bind(this), false);
    document.removeEventListener('touchmove', stopDocMove, false);
  }

  destroyEvent() {
    this.options.element.removeEventListener('touchstart', this._tstart.bind(this), false);
    this._releaseEvent();
  }

  fingerFollow() {
    const options = this.options;

    // 移动容器元素实现动画
    options.element.style.webkitTransform = `translate3d(0, ${this.config.initValue + this.diffY}px, 0)`;
    options.element.style.webkitTransitionDuration = '0ms';
  }

  recoverStatus() {
    const options = this.options;

    options.element.addEventListener('webkitTransitionEnd', transitionEndHandler, false);

    // 移动容器元素实现动画
    options.element.style.webkitTransform = 'translate3d(0, 0, 0)';
    options.element.style.webkitTransitionDuration = '300ms';

    function transitionEndHandler(e) {
      e.stopPropagation();
      options.onRecovery();
      options.element.removeEventListener('webkitTransitionEnd', transitionEndHandler, false);
    }
  }
}

function stopDocMove(e) {
  e.preventDefault();
}

export default Elastic;
