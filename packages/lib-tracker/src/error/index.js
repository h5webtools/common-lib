/**
 * 错误信息自动采集
 */

import onError from './onerror';
import report from '../report';
import util from '../util';
import { TRACKER_TYPE } from '../enum';

class ErrorTracker {
  constructor(options = {}, params = {}) {
    this.$options = options;
    this.params = Object.assign({ t_type: TRACKER_TYPE.JS_ERROR }, params);
    this._init();
  }

  /**
   * 初始化
   */
  _init() {
    // window.onerror
    if (this.$options.collectWindowErrors) {
      onError(this.$options, (params) => { this._send(params); });
    }
  }

  /**
   * 发送日志
   * @param {Object} params
   */
  _send(params = {}) {
    report(this.$options, paramsAdaptor(Object.assign({}, this.params, params)));
  }

  /**
   * 捕获错误
   * @param {Object} ex 错误对象
   * @param {Object} params 自定义上报信息，会覆盖之前有的
   */
  captureError(ex, params) {
    if (!util.isError(ex)) return;

    // TODO: 如果堆栈过长是否应该先解析堆栈内容（msg, url, line, col, errStack）
    this._send(Object.assign({
      msg: `${ex.name || ''}: ${ex.message || ''}`,
      errStack: (ex.stack || '').toString()
    }, params));
  }
}

/**
 * 参数适配
 */
function paramsAdaptor(params) {
  // msg, line, col => c1
  // errStack => c2
  // url => c3
  const ps = ['msg', 'line', 'col', 'url', 'errStack'];

  // 保证有值
  ps.forEach((p) => {
    if (!params[p]) {
      params[p] = '';
    }
  });

  params.c1 = [params.msg, params.line, params.col].join(',');
  params.c2 = params.url;
  params.c3 = params.errStack;

  // 删除参数
  ps.forEach(p => delete params[p]);
  return params;
}

export default ErrorTracker;
