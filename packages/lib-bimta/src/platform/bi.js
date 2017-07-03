/**
 * BI统计
 */

import * as _ from '../util/index';

const custId = _.getCustId();
const uuid = _.getUUID();

// 上报地址
const reportURL = {
    test: '//172.16.1.16:8890',
    prod: '//report.jyblife.com'
};

// 默认配置
const defaultOptions = {
    ak: 'KVQiUTJf',
    cmd: '65010000'
};

const bi = {
    env: 'test',
    options: {},
    init: function(env, options) {
        this.env = env;
        this.options = options || {};
        _.assign(defaultOptions, this.options);
    },
    pageview: function(ids, params) {
        this._track(ids, params);
    },
    event: function(ids, params) {
        this._track(ids, params);
    },
    _track: function(ids, params) {
        if (!ids) {
            return;
        }

        /* eslint-disable camelcase */
        const oImg = new Image();
        const url = reportURL[this.env];
        const oParam = {
            ak: this.options.ak,
            body: JSON.stringify({
                cmd: this.options.cmd,
                data: [{
                    sid: '', // 会话id（可选）
                    op_type: 'click', // click，touch，share
                    op_result: '', // （可选）
                    op_time: Date.now(), // 事件发生的时间（时间戳）
                    op_object: ids, // 操作对象，格式1000.1.1
                    op_page: '', // h5为空（可选）
                    op_params: _.assign({
                        cust_id: custId, // 客户id
                        uniq_id: custId || uuid, // 如果未登录设置此id,如果登录与custId一致
                        source: '', // h5.baidu.xxx
                        act_id: '', // 活动ID
                        group: '' // 用户群
                    }, params || {})
                }]
            })
        };
        let aParam = [];

        for (let k in oParam) {
            aParam.push(`${encodeURIComponent(k)}=${encodeURIComponent(oParam[k])}`);
        }

        oImg.src = `${url}?${aParam.join('&')}`;
    }
};

export default bi;
