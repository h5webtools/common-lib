/**
 * MTA统计
 * http://mta.qq.com
 */

import * as _ from '../util/index';

const defaultOptions = {
    src: '//pingjs.qq.com/h5/stats.js?v2.0.4',
    name: 'MTAH5',
    sid: '500478186',
    cid: '500478188'
};

const mta = {
    env: 'test',
    options: {},
    _trackCache: [],
    init: function(env, options) {
        this.env = env;
        this.options = _.assign(defaultOptions, options || {});

        // global
        window._mtac = {'performanceMonitor': 1};
        const mta = document.createElement('script');
        const s = document.getElementsByTagName('script')[0];

        for (let k in this.options) {
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
    },
    pageview: function(ids, params) {
        this._track(ids, params);
    },
    event: function(ids, params) {
        this._track(ids, params);
    },
    _track: function(ids) {
        let arrIds = [];
        let para = {};

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
            this._trackCache.push(function() {
                window.MtaH5.clickStat(arrIds[0], para);
            });
        }
    }
};

export default mta;
