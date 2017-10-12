/**
 * 性能数据采集
 */

import report from '../report';
import { TRACKER_TYPE } from '../enum';
import getTiming from './timing';
import * as util from '../util';

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
    this._send({ c2: obj2Str(trackParams) });
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
      setTimeout(() => { this._send({ c1: obj2Str(getTiming()) }); }, 0);
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => { this._send({ c1: obj2Str(getTiming()) }); }, 0);
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

function obj2Str(obj) {
  if (!util.isObject(obj)) {
    return '';
  }

  return Object.keys(obj).map(k => `${k}:${obj[k]}`).join(';');
}

export default PerfTracker;
