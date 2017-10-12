/**
 * 性能数据采集
 */

import report from '../report';
import { TRACKER_TYPE } from '../enum';
import getTiming from './timing';

class PerfTracker {
  constructor(options = {}, params = {}) {
    this.$options = options;
    this.params = Object.assign({ t_type: TRACKER_TYPE.PERFORMANCE }, params);
    this._init();
  }

  /**
   * 上报性能数据API
   * @param {Object} trackParams
   */
  capturePerf(trackParams) {
    this._send({ c2: trackParams });
  }

  /**
   * 初始化
   */
  _init() {
    if (this.$options.perf) {
      this._addEvent();
    }
  }

  /**
   * 添加事件
   */
  _addEvent() {
    if (document.readyState === 'complete') {
      setTimeout(() => { this._send({ c1: getTiming() }); }, 0);
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => { this._send({ c1: getTiming() }); }, 0);
      });
    }
  }

  /**
   * 发送日志
   * @param {Object} params
   */
  _send(params = {}) {
    report(this.$options, Object.assign({}, this.params, params));
  }
}

export default PerfTracker;
