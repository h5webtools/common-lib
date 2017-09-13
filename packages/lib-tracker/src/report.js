/**
 * 上报
 * @see http://wiki.jtjr.com/doku.php?id=%E6%95%B0%E6%8D%AE%E5%B9%B3%E5%8F%B0:%E4%BA%8B%E4%BB%B6%E4%B8%8A%E6%8A%A5%E8%A7%84%E8%8C%83
 */

import env from './util/env';
import * as util from './util';
import { IDENTIFIER } from './enum';

// 上报地址
const reportURL = {
  test: '//172.16.1.16:8890',
  prod: '//report.jyblife.com'
};

const AK = 'KVQiUTJf';
const CMD = '65010000';

const CUST_ID = util.getCustId();
const UUID = util.getUUID();

/**
 * 上报
 * @param {Object} options 用户选项
 * @param {Object} trackParams 上报数据
 */
function report(options = {}, trackParams = {}) {
  // 公共参数
  const commonParams = {
    // 页面地址
    link: location.href,
    // 用户代理
    ua: navigator.userAgent,
    // 页面title
    title: document.title,
    // 窗口大小
    size: `${document.documentElement.clientWidth}*${document.documentElement.clientHeight}`,
    // 返回跳转或打开到当前页面的那个页面的URI
    referer: document.referer || '',
    // 时间戳
    timestamp: new Date().getTime(),
    // 网络类型
    network: util.networkType,
    // badjs标识符
    badjs: IDENTIFIER.BAD_JS,
    // pid
    pid: options.pid
  };

  const mergeParams = Object.assign(commonParams, trackParams);
  const url = reportURL[options.env] || '';
  // 真正上报内容
  const reportInfo = {
    ak: AK,
    body: JSON.stringify({
      cmd: CMD,
      data: [{
        sid: '', // 会话id（可选）
        op_type: 'error',
        op_result: '', // （可选）
        op_time: util.getTime(), // 事件发生的时间（时间戳）
        op_object: '', // 操作对象，格式1000.1.1
        op_page: '', // h5为空（可选）
        op_params: Object.assign({
          platform: util.getPlatform(), // 平台
          in_app: env.jyb ? 1 : 0, // 1为加油宝app内，0为app外
          cust_id: CUST_ID, // 客户id
          uniq_id: CUST_ID || UUID, // 如果未登录设置此id,如果登录与custId一致
          source: util.getQuery('channel') || util.getQuery('from') || '',
          act_id: '', // 活动ID
          group: '' // 用户群
        }, mergeParams)
      }]
    })
  };

  const params = [];
  for (const key in reportInfo) {
    params.push(`${key}=${encodeURIComponent(reportInfo[key])}`);
  }

  if (options.debug) {
    console.log(JSON.stringify(mergeParams, null, 2));
  } else {
    ping(`${url}?${params.join('&')}`);
  }
}

/**
 * 发送上报
 * @param {String} url
 */
function ping(url) {
  const uuid = util.makeHashCode();
  const img = new Image();

  // 防止回收内存导致数据上报丢失
  if (!window[uuid]) {
    window[uuid] = img;
    img.onload = img.onerror = () => {
      window[uuid] = null;
      delete window[uuid];
    };
  }

  img.src = url;
}

export default report;
