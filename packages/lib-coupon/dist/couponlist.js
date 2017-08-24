(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.CouponList = factory());
}(this, (function () { 'use strict';

function anonymous(it
/**/) {
  var out = '';if (it.cid === it.curCid) {
    out += ' <div class="coupons-list active"  cid="' + it.cid + '" et="click:changecoupon" >';
  } else {
    out += ' ';if (it.type_id == 5) {
      out += ' ';if (it.detail.period == 1 && it.is_period_use == 0) {
        out += ' <div class="coupons-list week_disabled_used disabled" cidtest="' + it.cid + '" cid="' + it.cid + '" > ';
      } else if (it.detail.period == 2 && it.is_period_use == 0) {
        out += ' <div class="coupons-list month_disabled_used disabled" cidtest="' + it.cid + '" cid="' + it.cid + '" > ';
      } else {
        out += ' <div class="coupons-list " cidtest="' + it.cid + '" cid="' + it.cid + '" et="click:changecoupon" > ';
      }out += ' ';
    } else {
      out += ' <div class="coupons-list " cidtest="' + it.cid + '" cid="' + it.cid + '" et="click:changecoupon" > ';
    }
  }out += ' <div class="coupons-up"  cidtest="' + it.cid + '"> ';if (it.type_id == 5) {
    out += ' <div class="up-left "> <p class="coupons-value">' + it.detail.value / 10 + '</p> <p class="coupons-unit">折</p> </div> ';
  } else if (it.type_id == 4) {
    out += ' <div class="up-left ratioCoupons_up_left"> <p class="coupons-value ratioCoupon-value">' + (it.detail.remain_amt / 100).toFixed(2) + '</p> <p class="coupons-unit ratioCoupon-unit">元</p> </div> ';
  } else {
    out += ' <div class="up-left"> <p class="coupons-value">' + it.amount / 100 + '</p> <p class="coupons-unit">元</p> </div> ';
  }out += '  <div class="up-right"> ';if (it.type_id == 5) {
    out += ' <p class="coupons-title">' + it.name + '</p>             <p class="coupons-useinfo">已抵扣' + (it.detail.total_max_cnt - it.detail.total_remain_cnt) + '次,剩余' + it.detail.total_remain_cnt + '次</p> <p class="coupons-valid">有效期至' + it.expired_time + '</p> ';
  } else if (it.type_id == 4) {
    out += ' <p class="coupons-title">' + it.name + '</p> <p class="coupons-useinfo ">已使用' + ((it.detail.total_amt - it.detail.remain_amt) / 100).toFixed(2) + '元,剩余' + (it.detail.remain_amt / 100).toFixed(2) + '元</p> <p class="coupons-valid">有效期至' + it.expired_time + '</p> ';
  } else {
    out += ' <p class="coupons-title">' + it.name + '</p> ';if (it.amountVal) {
      out += ' <p class="coupons-useinfo">满' + it.amountVal / 100 + '元可用</p> ';
    } else {
      out += ' <p class="coupons-useinfo">满0元可用</p> ';
    }out += ' <p class="coupons-valid">有效期至' + it.expired_time + '</p> ';
  }out += ' </div> </div> <div class="coupons-down"> ' + it.usage + ' </div></div>';return out;
}

function anonymous$1(it
/**/) {
  var out = '<div id="mod-coupons-wrap"> <div class="coupons-overlay"></div> <div  class="mod-coupons-list"> <div class="coupons-head" et="click:closecoupon">' + it.title + '</div> <div class="coupons-content"> ' + it.content + ' <div class="coupons-nottouse" cid="0" et="click:changecoupon">' + it.notUseDes + '</div> </div> </div></div>';return out;
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

function NOOP() {}

/**
 * 红包列表
 */

var CouponList = function () {
  function CouponList() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, CouponList);

    this.config = _extends(options, {
      title: '选择红包/折扣券', // 标题内容
      cid: 0, // 选中的红包id
      data: [], // 红包数据
      notUseDes: '不使用，就是任性', // 不使用红包时的文案
      // selfAction: NOOP, // 自定义
      onChangeCoupon: NOOP, // 选择红包时的回调
      onClose: NOOP // 关闭列表时的回调啊
    });

    this.node = null;
    this.evtHandler = {
      handleEvent: this._handleEvent.bind(this),
      closecoupon: this._closeCoupon.bind(this),
      changecoupon: this._changeCoupon.bind(this)
    };
    this.$body = $('body');
  }

  createClass(CouponList, [{
    key: '_bindEvent',
    value: function _bindEvent() {
      this.node.on('click', this.evtHandler.handleEvent);
    }
  }, {
    key: '_destroyEvent',
    value: function _destroyEvent() {
      this.node.off('click', this.evtHandler.handleEvent);
    }
  }, {
    key: '_closeCoupon',
    value: function _closeCoupon(node) {
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
  }, {
    key: '_changeCoupon',
    value: function _changeCoupon(node) {
      this.config.onChangeCoupon(node);
      this._closeCoupon();
    }
  }, {
    key: '_handleEvent',
    value: function _handleEvent(e) {
      e = e || window.event;
      var tag = e.target.tagName;
      var node = $(e.target);
      var et = node.attr('et');

      if (!et) {
        // 向上找
        while (node[0] != this && !et) {
          // eslint-disable-line eqeqeq
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
      if (et.indexOf(e.type) == 0) {
        // eslint-disable-line eqeqeq
        // 调用事件指定的函数
        this.evtHandler[et.split(':')[1]](node, e);
      }
    }
  }, {
    key: 'show',
    value: function show() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.config = _extends(this.config, options);
      if (this.node || !this.config.data) {
        return;
      }

      var content = this.config.data.map(function (i) {
        return anonymous(_extends({ curCid: _this.config.cid }, i));
      }).join('');
      this.node = $(anonymous$1({
        content: content,
        title: this.config.title,
        notUseDes: this.config.notUseDes
      }));

      if (!this.config.cid || this.config.cid == 0) {
        // eslint-disable-line eqeqeq
        this.node.find('.coupons-nottouse').addClass('active');
      }

      this.$body.append(this.node);
      this.$body.addClass('holdmove');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      this._bindEvent();
    }
  }]);
  return CouponList;
}();

return CouponList;

})));
