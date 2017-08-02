/**
 * MTA统计
 * http://mta.qq.com
 */

import * as log from '../util/log';
import * as _ from '../util/index';

const defaultOptions = {
  test: {
    src: '//pingjs.qq.com/h5/stats.js?v2.0.4',
    name: 'MTAH5',
    sid: '500499846',
    cid: '500499847'
  },
  prod: {
    src: '//pingjs.qq.com/h5/stats.js?v2.0.4',
    name: 'MTAH5',
    sid: '500478186',
    cid: '500478188'
  }
};

class MTA {
  constructor(debug, env = 'test', options = {}) {
    this.platform = 'mta';
    this.debug = debug;
    this.env = env;
    this.options = _.assign(defaultOptions[env] || {}, options);
    this._trackCache = [];
  }

  init() {
    // global
    window._mtac = { performanceMonitor: 1 };
    const mta = document.createElement('script');
    const s = document.getElementsByTagName('script')[0];

    for (const k in this.options) {
      if (_.hasOwn.call(this.options, k)) {
        mta.setAttribute(k, this.options[k]);
      }
    }

    mta.onload = () => {
      let track = null;

      /* eslint-disable no-cond-assign */
      while (track = this._trackCache.shift()) {
        track();
      }
    };

    if (s) {
      s.parentNode.insertBefore(mta, s);
    } else {
      document.getElementsByTagName('head')[0].appendChild(mta);
    }

    return this;
  }

  pageview(ids, params) {
    this._track('pageview', ids, params);
  }

  event(ids, params) {
    this._track('event', ids, params);
  }

  _track(method, ids) {
    let arrIds = [];
    const para = {};

    if (!ids) {
      return;
    }

    arrIds = ids.split('.');
    if (arrIds.length < 3) {
      return;
    }
    para[arrIds[1]] = arrIds[2];

    if (window.MtaH5) {
      window.MtaH5.clickStat(arrIds[0], para);
    } else {
      this._trackCache.push(() => {
        window.MtaH5.clickStat(arrIds[0], para);
      });
    }
    if (this.debug) {
      log.info(`[${method}] platform: ${this.platform}, ids: ${ids}`);
    }
  }
}

export default MTA;
