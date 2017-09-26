/**
 * 错误信息自动采集
 */

import onError from './onerror';
import report from '../report';
import * as util from '../util';
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
    report(this.$options, this._paramsAdaptor(Object.assign({}, this.params, params)));
  }

  /**
   * 参数适配
   */
  _paramsAdaptor(params) {
    // msg, line, col => c1
    // url => c2
    // stack.toString() => c3
    const ps = ['msg', 'line', 'col', 'url', 'stack'];
    const options = this.$options;

    // 保证有值
    ps.forEach((p) => {
      if (!params[p]) {
        params[p] = '';
      }
    });

    params.c1 = [params.msg, params.line, params.col].join(',');
    params.c2 = params.url;
    params.c3 = cutStack(params.stack, options.stackDepth);

    // 删除参数
    ps.forEach(p => delete params[p]);
    return params;
  }

  /**
   * 捕获错误
   * @param {Object} ex 错误对象
   * @param {Object} params 自定义上报信息，会覆盖之前有的
   */
  captureError(ex, params) {
    if (!util.isError(ex)) return;

    this._send(Object.assign({
      msg: `${ex.name || ''}: ${ex.message || ''}`,
      stack: ex.stack
    }, params));
  }
}

/**
 * 截取堆栈内容
 */
function cutStack(stack, depth) {
  if (!stack) return '';

  const stackStr = stack.toString();
  const arrStack = stackStr.split('\n');
  const stackDepth = arrStack.length;

  // 如果堆栈的深度大于设置的深度
  if (stackDepth > depth) {
    return arrStack.slice(0, depth).join('\n');
  }

  return stackStr;
}

export default ErrorTracker;
