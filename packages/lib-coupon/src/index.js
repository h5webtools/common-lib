import couponTemplate from '../dot/coupon.dot';
import wrapper from '../dot/wrapper.dot';

function NOOP() {
}

/**
 * 红包列表
 */

class CouponList {
  constructor(options = {}) {
    this.config = Object.assign(options, {
      title: '选择红包/折扣券', // 标题内容
      cid: 0, // 选中的红包id
      data: [], // 红包数据
      notUseDes: '不使用，就是任性', // 不使用红包时的文案
      // selfAction: NOOP, // 自定义
      onChangeCoupon: NOOP, // 选择红包时的回调
      onClose: NOOP // 关闭列表时的回调
    });

    this.node = null;
    this.evtHandler = {
      handleEvent: this._handleEvent.bind(this),
      closecoupon: this._closeCoupon.bind(this),
      changecoupon: this._changeCoupon.bind(this),
    };
    this.$body = $('body');
  }

  _bindEvent() {
    this.node.on('click', this.evtHandler.handleEvent);
  }

  _destroyEvent() {
    this.node.off('click', this.evtHandler.handleEvent);
  }

  _closeCoupon(node) {
    if (!this.node) {
      return;
    }

    this._destroyEvent();
    this.node.remove();
    this.node = null;

    this.$body.removeClass('holdmove');
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';

    this.config.onClose(node);
  }

  _changeCoupon(node) {
    this.config.onChangeCoupon(node);
    this._closeCoupon();
  }

  _handleEvent(e) {
    e = e || window.event;
    const tag = e.target.tagName;
    let node = $(e.target);
    let et = node.attr('et');

    if (!et) {
      // 向上找
      while (node[0] != this && !et) { // eslint-disable-line eqeqeq
        node = node.parent();
        et = node.attr('et');
      }
      if (!et) {
        return;
      }
    }
    // 超链接不阻值冒泡
    tag != 'A' && e.stopPropagation(); // eslint-disable-line eqeqeq
    // 是对应的事件
    if (et.indexOf(e.type) == 0) { // eslint-disable-line eqeqeq
      // 调用事件指定的函数
      this.evtHandler[et.split(':')[1]](node, e);
    }
  }

  show(options = {}) {
    this.config = Object.assign(this.config, options);
    if (this.node || !this.config.data) {
      return;
    }

    const content = this.config.data.map(i => couponTemplate(Object.assign({ curCid: this.config.cid }, i))).join('');
    this.node = $(wrapper({
      content,
      title: this.config.title,
      notUseDes: this.config.notUseDes
    }));

    if (!this.config.cid || this.config.cid == 0) { // eslint-disable-line eqeqeq
      this.node.find('.coupons-nottouse').addClass('active');
    }

    this.$body.append(this.node);
    this.$body.addClass('holdmove');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    this._bindEvent();
  }
}

export default CouponList;
