/**
 * lib
 */

const defaultOptions = {
  startBtn: null, // 开始按钮
  rollElement: null, // 转动元素
  rewardData: {}, // 奖品数据，key-value { '1': '90' }
  maxCircles: 8, // 最大转动圈数
  minCircles: 5, // 最小转动圈数
  duration: 3, // 间隔
  resultCreator() {}, // 启动转动
  end() {} // 转动结束
};

class Turntable {
  constructor(options = {}) {
    this.options = Object.assign({}, defaultOptions, options);
    this.status = false;
    this._init();
  }

  _init() {
    const { startBtn, rollElement, resultCreator, end } = this.options;

    startBtn.addEventListener('click', () => {
      if (this.status) return;
      resultCreator((result) => {
        this.roll(result);
      });
    }, false);

    rollElement.addEventListener('webkitTransitionEnd', () => {
      const priceDeg = this.priceDeg;

      rollElement.style.cssText = `
        transform: rotateZ(${priceDeg}deg);
        -webkit-transform: rotateZ(${priceDeg}deg)
      `;
      this.status = false;
      end(this.result);
    }, false);
  }

  _randCircles() {
    const { maxCircles, minCircles } = this.options;
    return Math.floor((Math.random() * ((maxCircles - minCircles) + 1)) + minCircles);
  }

  roll(result) {
    if (typeof result === 'undefined') {
      throw new Error('请传入奖品key');
    }

    const { rewardData, duration, rollElement } = this.options;
    const priceDeg = this.priceDeg = Number(rewardData[result].deg);
    const targetDeg = (this._randCircles() * 360) + priceDeg;

    this.result = rewardData[result];
    this.status = true;
    rollElement.style.cssText = `
      transition: all ${duration}s ease;
      -webkit-transition: all ${duration}s ease;
      transform: rotateZ(${targetDeg}deg);
      -webkit-transform: rotateZ(${targetDeg}deg)
    `;
  }
}

export default Turntable;
