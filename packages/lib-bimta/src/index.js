/**
 * BI/MTA 业务数据上报
 */

import * as _ from './util/index';
import * as log from './util/log';
import platform from './platform/index';
import DataAttribute from './dataset/index';
import {createCommonParams} from './param';

const CHECK_REGEX = /^\s*\{(.*)\}\s*$/;
const PARSE_REGEX = /[\s"']*([^:,"'\{\}]+)[\s"']*:[\s"']*([^:,"'\{\}]+)[\s"']*,?/g;

// 默认配置
const defaultOptions = {
    configMap: {}, // 配置表
    platform: ['bi', 'mta'], // ['bi', 'mta'], {bi: {}, mta: {}}
    createCommonParams: createCommonParams, // 生成公共参数函数
    env: 'test', // 上报环境，test/prod
    debug: false // 是否为调试模式
};

class Bimta {
    /**
     * 数据统计
     * @param {Object} options
     */
    constructor(options) {
        this.options = _.assign(defaultOptions, options || {});
        this.dataAttribute = new DataAttribute({
            debug: this.options.debug
        });
    }

    /**
     * 启动
     * @return {Object}
     */
    start() {
        this._init();
        this._initPageviewReport();
        this._initEventReport();
        return this;
    }

    /**
     * 转换参数
     * @param {Object} options
     * @return {String|Object}
     */
    parseOption(options) {
        if (CHECK_REGEX.test(options)) {
            let opts = {};
            let opt = '';

            /* eslint-disable no-cond-assign */
            while (opt = PARSE_REGEX.exec(options)) {
                opts[opt[1]] = opt[2];
            }
            return opts;
        }

        return {};
    }

    /**
     * 记录访问日志
     * @param {String|Object} eventID '10000.1.1'/{ea: 'bargain', eb: 'home'}
     * @param {Object} params
     */
    pageview(eventID, params) {
        if (_.isObject(eventID)) {
            eventID.ec = 'pv';
        }

        this._call('pageview', eventID, params);
    }

    /**
     * 记录事件日志
     * @param {String|Object} eventID
     * @param {Object} params
     */
    event(eventID, params) {
        this._call('event', eventID, params);
    }

    /**
     * 获取公参
     */
    getCommonParams() {
        return this.options.createCommonParams(createCommonParams());
    }

    /**
     * 初始化
     */
    _init() {
        const env = this.options.env;

        _.each(this.options.platform, (p, i) => {
            let curr = null;
            let options = {};

            if (_.isString(p)) {
                curr = platform[p];
            } else {
                curr = platform[i];
                options = p;
            }

            curr.init(env, options);
        });
    }

    /**
     * 初始化pv上报
     */
    _initPageviewReport() {
        const dataAttribute = this.dataAttribute;
        const els = document.querySelectorAll(`[${dataAttribute.attrs.visit}]`);
        const alias = dataAttribute.alias;

        if (els.length > 0) {
            window.setTimeout(() => {
                this._dataAttrReport('pageview', els[0], [alias.ea, alias.eb, alias.visit, alias.para]);
            }, 0);
        }
    }

    /**
     * 初始化event上报
     */
    _initEventReport() {
        document.body.addEventListener('click', (e) => {
            window.setTimeout(() => {
                let el = e.target;
                const dataAttribute = this.dataAttribute;
                const alias = dataAttribute.alias;

                this._dataAttrReport('event', el, [alias.ea, alias.eb, alias.ec, alias.para]);
            }, 0);
        }, true);
    }

    /**
     * 数据属性自动上报
     * @param {String} method 方法，pageview/event
     * @param {Object} el 元素
     * @param {Array} attrs
     */
    _dataAttrReport(method, el, attrs) {
        let dataSetObj = {};
        let dataSetArr = [];
        let parseOpts = {};
        let isOk = true;
        let ids = '';
        const dataAttribute = this.dataAttribute;
        const alias = dataAttribute.alias;

        while (el && el !== document.documentElement) {
            dataAttribute.getDataSetObj(dataSetObj, attrs, el.dataset);

            // 如果第一个层级有值，跳出循环
            if (dataSetObj[alias.ea]) {
                break;
            }

            el = el.parentNode;
        }

        // 检查ea,eb,ec是否有值
        isOk = dataAttribute.checkDataSetValue(dataSetObj, attrs.slice(0, 3));
        if (isOk) {
            dataSetArr = dataAttribute.getDataSetArr(dataSetObj, attrs);
            parseOpts = this.parseOption(dataSetArr.pop());
            ids = this._getIdsStr.apply(this, dataSetArr);
            this._call(method, ids, parseOpts);
        }
    }

    /**
     * 获取事件ID数组
     * @return {Array}
     */
    _getIds() {
        const configMap = this.options.configMap;
        let current = configMap;
        let cid = [];

        for (let i = 0, l = arguments.length; i < l; i++) {
            current = current[arguments[i]];

            if (current !== void 0) {
                current.id && cid.push(current.id);
            }
        }

        return cid;
    }

    /**
     * 获取事件ID字符串
     * @return {String}
     */
    _getIdsStr() {
        return this._getIds.apply(this, arguments).join('.');
    }

    /**
     * 输出日志
     * @param {String} msg
     */
    _log(msg) {
        const debug = this.options.debug;

        if (debug) {
            log.info(msg);
        }
    }

    /**
     * 检查事件ID格式
     * @param {String|Object} eventID
     * @return {Boolean}
     */
    _checkEventID(eventID) {
        if (_.isString(eventID)) {
            const arrEventIds = eventID.split('.');

            if (arrEventIds.length === 3) {
                return true;
            }
        } else if (_.isObject(eventID)) {
            if (_.hasOwn.call(eventID, 'ea') &&
                _.hasOwn.call(eventID, 'eb') &&
                _.hasOwn.call(eventID, 'ec')) {
                return true;
            }
        }

        return false;
    }

    /**
     * 方法调用
     * @param {String} method 调用方法，pageview/event
     * @param {String|Object} eventID
     * @param {Object} params
     * @return {Boolean}
     */
    _call(method, eventID, params) {
        params = params || {};

        // 检查事件ID格式是否正确
        if (!this._checkEventID(eventID)) {
            return this._log('事件ID格式错误，应该为30000.1.1或者{ea: "home", eb: "search", ec: "btn"}');
        }

        const commonParams = this.getCommonParams();
        let mergeParams = {};
        let ids = '';

        if (_.isString(eventID)) {
            ids = eventID;
        } else if (_.isObject(eventID)) {
            ids = this._getIdsStr(eventID.ea, eventID.eb, eventID.ec);
        }

        if (!ids) {
            return false;
        }

        mergeParams = _.assign(commonParams, params);
        _.each(this.options.platform, (p, i) => {
            let curr = null;

            if (_.isString(p)) {
                curr = platform[p];
            } else {
                curr = platform[i];
            }

            curr[method](ids, mergeParams);
        });

        this._log(`[${method}] ids: ${ids}, params: ${JSON.stringify(mergeParams)}`);
        return true;
    }
}

export default Bimta;
