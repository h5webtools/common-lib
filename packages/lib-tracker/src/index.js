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
  env: 'prod' // test/prod
};

// 数据采集
class Tracker {
  constructor(options = {}) {
    this.$options = Object.assign({}, defaultOptions, options);
    this.trackParams = {};
    this.initError();
  }

  /**
   * 设置配置
   * @param {Object} trackParams
   */
  setParams(trackParams = {}) {
    Object.assign(this.trackParams, trackParams);
  }

  /**
   * 通用采集数据API
   * @param {Object} trackParams
   */
  log(trackParams) {
    report(this.$options, Object.assign({}, this.trackParams, trackParams));
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
    const errorTracker = new ErrorTracker(this.$options, this.trackParams);
    this.error = errorTracker;
    this.Error = ErrorTracker;
    this.captureError = errorTracker.captureError.bind(errorTracker);
  }
}

const tracker = new Tracker((window.g_config || {}).tracker);

// properties
tracker.Ctor = Tracker;

export default tracker;
