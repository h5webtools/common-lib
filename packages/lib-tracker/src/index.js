/**
 * 前端数据采集
 */

import ErrorTracker from './error';
import report from './report';
import * as util from './util';
import { TRACKER_TYPE } from './enum';

const defaultOptions = {
  pid: util.getFirstPathName(),
  debug: false,
  collectWindowErrors: true,
  env: 'prod', // test/prod
  commonParams: null
};

// 数据采集
class Tracker {
  constructor() {
    this.$options = {};
    this.commonParams = {};
    this.inited = false;
  }

  /**
   * 初始化
   * @param {Object} options
   */
  init(options = {}) {
    if (this.inited) {
      return;
    }

    this.$options = Object.assign({}, defaultOptions, options);
    this.commonParams = this.$options.commonParams || {};
    this.initError();
    this.inited = true;
  }

  /**
   * 通用采集数据API
   * @param {Object} trackParams
   */
  log(trackParams) {
    if (!this.inited) {
      throw new Error('必须先初始化');
    }
    report(this.$options, Object.assign({}, this.commonParams, trackParams));
  }

  /**
   * 上报接口异常API
   * @param {Object} trackParams
   */
  captureApi(trackParams) {
    this.log(Object.assign({ t_type: TRACKER_TYPE.API_ERROR }, trackParams));
  }

  /**
   * 错误采集初始化
   */
  initError() {
    // error
    const errorTracker = new ErrorTracker(this.$options, this.commonParams);
    this.error = errorTracker;
    this.Error = ErrorTracker;
    this.captureError = errorTracker.captureError.bind(errorTracker);
  }
}

const tracker = new Tracker();

// properties
tracker.Ctor = Tracker;

export default tracker;
