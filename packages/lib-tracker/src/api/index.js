/**
 * 接口异常自动采集
 */

import report from '../report';
import { TRACKER_TYPE } from '../enum';

class ApiTracker {
  constructor(options = {}, params = {}) {
    this.$options = options;
    this.params = Object.assign({ t_type: TRACKER_TYPE.API_ERROR }, params);
    this._init();
  }

  /**
   * 上报接口异常API
   * @param {Object} trackParams
   */
  captureApi(trackParams) {
    this._send(trackParams, false);
  }

  /**
   * 初始化
   */
  _init() {
    if (this.$options.ajax) {
      this._ajaxHook(window.XMLHttpRequest);
    }
  }

  /**
   * 发送日志
   * @param {Object} params
   */
  _send(params = {}, adaptor = true) {
    let reportParams = Object.assign({}, this.params, params);

    // 是否适配参数
    if (adaptor) {
      reportParams = paramsAdaptor(reportParams);
    }
    report(this.$options, reportParams);
  }

  /**
   * 重写open, send方法
   * @param {Function} Ctor
   */
  _ajaxHook(Ctor) {
    /* eslint-disable prefer-rest-params */
    const originOpen = Ctor.prototype.open;
    const originSend = Ctor.prototype.send;
    const that = this;

    // 重写open, send方法
    Ctor.prototype.open = function (method, url) {
      this._apiTrackData = { method: method.toLowerCase(), url };
      return originOpen.apply(this, arguments);
    };

    Ctor.prototype.send = function (data) {
      this._apiTrackData.start = Date.now();
      this._apiTrackData.body = data ? JSON.stringify(data) : '';
      that._addEvent(this);
      return originSend.apply(this, arguments);
    };
  }

  /**
   * 添加事件监听
   * @param {Object} xhr
   */
  _addEvent(xhr) {
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4) {
        const trackData = xhr._apiTrackData;
        const apiCodeList = this.$options.apiCodeList;
        const apiReportFilter = this.$options.apiReportFilter;

        if (!trackData) return;

        // 响应时间
        const responseTime = Date.now() - trackData.start;

        // 上报参数
        const reportParams = {
          method: trackData.method,
          url: trackData.url,
          body: trackData.body,
          time: responseTime,
          statusCode: xhr.status,
          statusText: xhr.statusText
        };
        let result = null;
        let sendParams = null;

        // 如果状态码大于等于400，上报
        if (xhr.status >= 400) {
          sendParams = Object.assign({ result: '' }, reportParams);
        } else if (xhr.status === 200) { // 如果状态码为200
          try {
            result = JSON.parse(xhr.responseText);

            // 如果apiCodeList为空，并且code值不为0和'0'（活动接口没有统一类型，蛋疼），则上报
            // 如果code值在apiCodeList列表中，则上报
            if ((apiCodeList.length === 0 && result.code !== 0 && result.code !== '0') ||
              apiCodeList.indexOf(result.code) > -1) {
              sendParams = Object.assign({ result: `${result.code || ''}, ${result.msg || ''}` }, reportParams);
            }
          } catch (e) {
            // e
          }
        } else if (responseTime > this.$options.apiThreshold) { // 时间超过apiThreshold，则上报
          sendParams = Object.assign({ result: '' }, reportParams);
        }

        // 如果send参数存在并且reportFilter返回值为true，则上报
        if (sendParams && apiReportFilter(xhr, sendParams)) {
          this._send(sendParams);
        }
      }
    }, true);
  }
}

/**
 * 参数适配
 */
function paramsAdaptor(params) {
  // method, url, body => c1
  // time, statusCode, statusText => c2
  // result => c3
  const ps = ['method', 'url', 'body', 'time', 'statusCode', 'statusText', 'result'];

  // 保证有值
  ps.forEach((p) => {
    if (typeof params[p] === 'undefined') {
      params[p] = '';
    }
  });

  params.c1 = ['method', 'url', 'body'].map(v => `${v}:${params[v]}`).join(';');
  params.c2 = ['time', 'statusCode', 'statusText'].map(v => `${v}:${params[v]}`).join(';');
  params.c3 = params.result;

  // 删除参数
  ps.forEach(p => delete params[p]);
  return params;
}

export default ApiTracker;
