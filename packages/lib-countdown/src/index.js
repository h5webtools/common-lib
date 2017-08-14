/**
 * 倒计时
 */

const defaultOptions = {
  time: 0, // 时间
  duration: 1000, // 间隔
  processCallback(/* time */) {}, // 倒计时回调
  endCallback() {} // 结束回调
};

class CountDown {
  constructor(options = {}) {
    this.options = Object.assign({}, defaultOptions, options);
    this.timer = null;
    this._init();
  }

  _init() {
    const options = this.options;
    const { duration, processCallback, endCallback } = options;
    let { time } = options;

    this.timer = setInterval(() => {
      processCallback && processCallback(time);
      time--;
      if (time === -1) {
        clearInterval(this.timer);
        this.timer = null;
        endCallback && endCallback();
      }
    }, duration);
  }
}

export default CountDown;
