/**
 * 页面导航组件
 */

import extend from '@jyb/lib-extend';
import detect from '@jyb/lib-detect';
import EventEmit from '@jyb/lib-event-emit';
import * as util from './util';

import tmpl from './index.dot';
import cssText from './css';
import commonPlugin from './plugin/common';

const currentEnv = detect.env;
const defaultOptions = {
  el: document.body, // 导航栏父元素，HTMLElement类型
  title: '', // 导航栏标题，String类型
  wrapCls: 'md-navbar-wrap', // 导航栏class，String类型
  link: { // 导航栏右上角链接
    title: '', // 链接标题，String类型
    url: '', // 链接url，String类型
    query: {} // 链接querystring，Object类型
  }
};

class NavBar extends EventEmit {
  constructor(options) {
    super();
    this.$options = extend(true, {}, defaultOptions, options);
    this.$parentEl = this.$options.el;
    if (typeof this.$parentEl === 'string') {
      this.$parentEl = document.querySelector(this.$parentEl);
    }

    this.$el = null;
    this.util = util;
    this.rect = {};
    this.rendered = false;
    this.plugins = {};
    if (this.canFullScreen()) util.addCssText(cssText);
    // 注册通用插件
    this.registerWidget('common', commonPlugin);
  }
  canFullScreen() {
    return this.util.canFullScreen();
  }
  registerWidget(k, plugin) {
    if ({}.hasOwnProperty.call(this.plugins, k)) throw new Error(`${k}已注册`);
    this.plugins[k] = plugin;
  }
  bindEvent() {
    const handler = util.throttle(this.scrollHandler.bind(this), 60);
    window.addEventListener('scroll', handler);
    if (currentEnv.ios) window.addEventListener('touchmove', this.scrollHandler.bind(this));
  }
  scrollHandler() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop === 0) {
      this.emit('scrollTop', this);
    } else {
      this.emit('scroll', this);
    }
  }
  render() {
    if (this.rendered || !this.canFullScreen()) return false;
    if (currentEnv.jyb && this.$options.link.url) {
      this.$options.link.url = util.createPageUrl(
        `jtjr://web?url=${encodeURIComponent(this.$options.link.url)}&fullscreen=true`,
        this.$options.link.query
      );
    }

    const el = util.wrapperElement(tmpl(extend(true, {
      isIPhoneX: util.isIPhoneX()
    }, this.$options)));
    this.$parentEl.appendChild(el);

    this.$el = el;
    this.rect = el.getBoundingClientRect();
    this.rendered = true;
    // 绑定事件
    this.bindEvent();
    this.emit('rendered', this);
  }
  callPlugin(name, options) {
    const pluginLogic = this.plugins[name];
    if (!pluginLogic) return;
    pluginLogic.plugin.call(this, extend(true, {}, pluginLogic.defaultOptions, options));
  }
  static create(options) {
    return new NavBar(options);
  }
}

export default NavBar;
