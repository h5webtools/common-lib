/**
 * 前端数据采集
 */

import ErrorTracker from './error';
import ApiTracker from './api';
import report from './report';
import * as util from './util';

const defaultOptions = {
  pid: util.getFirstPathName(), // 产品ID
  debug: false,
  ajax: false, // 是否对ajax请求上报
  apiThreshold: 3000, // 接口响应时间超过3s上报
  apiCodeList: [], // 如果接口响应的数据code值在该列表中，则上报
  collectWindowErrors: true, // 是否通过window.onerror收集
  stackDepth: 8, // 堆栈深度
  env: 'prod', // 上报环境，test/prod
  commonParams: null // 公共参数
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
    this.initApi();
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
   * 接口采集初始化
   */
  initApi() {
    // api
    const apiTracker = new ApiTracker(this.$options, this.commonParams);
    this.api = apiTracker;
    this.Api = apiTracker;
    this.captureApi = apiTracker.captureApi.bind(apiTracker);
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
