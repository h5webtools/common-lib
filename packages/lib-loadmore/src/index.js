/**
 * loadmore
 */

import EventEmit from '@jyb/lib-event-emit';
import util from './util';

const defaultOptions = {
  showElement: true, // 是否显示loading
  loadingText: '加载中...', // 加载中文案
  loadedText: '- 已加载全部数据 -', // 加载结束文案
  offset: 60 // 偏移
};

/**
  const loadMore = LoadMore.create(el);
  // 属性
  loadMore.disabled = true; // false
  loadMore.end = true; // 结束
  // 事件
  loadMore.on('scroll:bottom', () => {});
  loadMore.on('scroll:top', () => {});
  loadMore.on('scroll:end', () => {});
 */
class LoadMore extends EventEmit {
  constructor(el, options = {}) {
    super();
    this.el = el;
    this.__binded = false;
    this.__disabled = false; // 禁止触发
    this.__end = false; // 结束
    this.options = Object.assign({}, defaultOptions, options);
    this.$loadingText = null;
  }
  static create(el, options) {
    return new LoadMore(el, options);
  }
  start() {
    if (this.options.showElement) {
      this.injectElement();
      this.on('scroll:end', () => {
        this.$loadingText.innerText = this.options.loadedText;
      });
    }
    this.bindEvent();
  }
  injectElement() {
    const $loading = document.createElement('div');
    $loading.classList.add('md-loading');
    const $loadingText = document.createElement('div');
    $loadingText.classList.add('md-loading__text');

    const $loadingTextSpan = document.createElement('span');
    $loadingTextSpan.innerText = this.options.loadingText;

    $loadingText.appendChild($loadingTextSpan);
    $loading.appendChild($loadingText);

    this.$loadingText = $loadingText;
    this.el.appendChild($loading);
  }
  bindEvent() {
    if (this.__binded) return;
    this.__binded = true;

    this.scrollEventListener = this.handleScrollEvent.bind(this);
    this.scrollEventTarget = util.getScrollEventTarget(this.el);

    Object.defineProperty(this, 'disabled', {
      enumerable: true,
      configurable: false,
      get() {
        return this.__disabled;
      },
      set(value) {
        this.__disabled = value;
        this.scrollEventListener();
      }
    });

    Object.defineProperty(this, 'end', {
      enumerable: true,
      configurable: false,
      get() {
        return this.__end;
      },
      set(value) {
        this.__end = value;
        if (value) {
          this.emit('scroll:end');
          this.destroy();
        }
      }
    });

    this.throttleScrollEventListener = util.throttle(this.scrollEventListener);
    this.scrollEventTarget.addEventListener('scroll', this.throttleScrollEventListener, false);
    this.scrollEventListener();
  }
  handleScrollEvent() {
    // 已被禁止的滚动处理
    if (this.disabled || this.end) return;
    const element = this.el;
    const { scrollEventTarget } = this;

    const targetScrollTop = util.getScrollTop(scrollEventTarget);
    const targetVisibleHeight = util.getVisibleHeight(scrollEventTarget);
    // 滚动元素可视区域下边沿到滚动元素元素最顶上 距离
    const targetBottom = targetScrollTop + targetVisibleHeight;

    // 如果元素没有高度，直接返回
    if (!targetVisibleHeight) return;

    // 是否滚动到底部
    let scrollToBottom = false;
    if (element === scrollEventTarget) {
      scrollToBottom = scrollEventTarget.scrollHeight - targetBottom < this.options.offset;
    } else {
      const elementBottom = (util.getElementTop(element) - util.getElementTop(scrollEventTarget))
        + util.getVisibleHeight(element);
      scrollToBottom = elementBottom - targetVisibleHeight < this.options.offset;
    }
    if (scrollToBottom) {
      this.emit('scroll:bottom', { target: scrollEventTarget, top: targetScrollTop });
    }

    // 是否滚动到顶部
    let scrollToTop = false;
    if (element === scrollEventTarget) {
      scrollToTop = targetScrollTop < this.options.offset;
    } else {
      const elementTop = util.getElementTop(element) - util.getElementTop(scrollEventTarget);
      scrollToTop = elementTop + this.options.offset > 0;
    }
    if (scrollToTop) {
      this.emit('scroll:top', { target: scrollEventTarget, top: targetScrollTop });
    }
  }
  destroy() {
    this.scrollEventTarget.removeEventListener('scroll', this.throttleScrollEventListener, false);
  }
}

export default LoadMore;
