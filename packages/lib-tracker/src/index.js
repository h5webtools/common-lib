/**
 * 前端数据采集
 */

import ErrorTracker from './error';
import ApiTracker from './api';
import PerfTracker from './perf';
import report from './report';
import * as util from './util';

const defaultOptions = {
  pid: util.getFirstPathName(), // 产品ID
  debug: false,
  ajax: false, // 是否对ajax请求上报
  perf: false, // 是否上报性能数据
  apiThreshold: 3000, // 接口响应时间超过3s上报
  apiCodeList: [], // 如果接口响应的数据code值在该列表中，则上报
  apiReportFilter(/* xhr, param */) { // 接口上报过滤函数，返回true则上报，返回false不上报
    return true;
  },
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
    this.initPerf();
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

  /**
   * 性能数据采集初始化
   */
  initPerf() {
    // perf
    const perfTracker = new PerfTracker(this.$options, this.commonParams);
    this.perf = perfTracker;
    this.Perf = PerfTracker;
    this.capturePerf = perfTracker.capturePerf.bind(perfTracker);
  }
}

const tracker = new Tracker();

// properties
tracker.Ctor = Tracker;

export default tracker;
