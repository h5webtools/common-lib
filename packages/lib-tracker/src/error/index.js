/**
 * 错误信息自动采集
 */

/**
 * window.onerror上报，包含设备ua，网络环境，js文件url，页面url，时间，堆栈，行号....，区分活动和产品
 * 提供主动上报方法，不仅限于针对错误的上报，为今后的返回码上报提供预留参数和方法
 * onerror的上报注意在上报的参数里添加badjs标识符，用于统计数据
 */
import BaseTracker from '../base';

class ErrorTracker extends BaseTracker {
  constructor() {
    super();
    this.pid = '';
    this._init();
  }
  _init() {
    // 获取pid
    this.pid = '';
  }
  captureException(ex, options) {

  }
}

export default ErrorTracker;
