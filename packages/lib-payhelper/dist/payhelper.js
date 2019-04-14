(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.PayHelper = factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var tips = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
    module.exports = factory();
  })(commonjsGlobal, function () {
    'use strict';

    var createElement = function () {
      var container = document.createElement('div');
      return function (html) {
        container.innerHTML = html;
        return container.children[0];
      };
    }();

    var isAndroid = function isAndroid() {
      return (/android/i.test(window.navigator ? window.navigator.userAgent : '')
      );
    };

    function anonymous(it
    /**/) {
      var out = '<div id="bubble"> <div class="mod-spinner"> <div class="spinner-wrap"><span class="' + it.icon + '"></span><p class="text" id="bubble-text">' + it.text + '</p> </div> </div></div>';return out;
    }

    var classCallCheck = function classCallCheck(instance, Constructor) {
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

    var Tips = function () {
      function Tips() {
        classCallCheck(this, Tips);

        this.tipsHtml = null;
        this.ptr = null;
        this.config = {
          msg: '',
          isLoading: false,
          autoHide: true,
          hideTime: 1200
        };

        this.iconConf = {
          loading: isAndroid() ? 'rotate-svg' : 'rotate-icon',
          none: ''
        };
      }

      /**
       * @param {object} option
       */

      createClass(Tips, [{
        key: 'showTips',
        value: function showTips(option) {
          var _this = this;

          if (this.tipsHtml) {
            return;
          }

          var conf = _extends({}, this.config, option);
          var html = anonymous({ text: conf.msg, icon: conf.isLoading ? this.iconConf.loading : '' });
          this.tipsHtml = createElement(html);
          document.body.insertBefore(this.tipsHtml, null);

          if (conf.autoHide) {
            setTimeout(function () {
              _this.closeTips();
            }, conf.hideTime);
          }

          this.lock = true;
        }

        /**
         * @param {string} message
         */

      }, {
        key: 'showLoading',
        value: function showLoading(message) {
          this.showTips({
            msg: message || '努力加载中...',
            isLoading: true,
            autoHide: false
          });
        }

        /**
         * @param {string} message
         */

      }, {
        key: 'showError',
        value: function showError(message) {
          var _this2 = this;

          clearInterval(this.ptr);
          this.ptr = setInterval(function () {
            if (!_this2.tipsHtml) {
              _this2.showTips({
                msg: message
              });

              clearInterval(_this2.ptr);
              _this2.ptr = null;
            }
          }, 200);
        }
      }, {
        key: 'closeTips',
        value: function closeTips() {
          if (!this.tipsHtml) {
            return this;
          }

          this.tipsHtml.parentNode.removeChild(this.tipsHtml);
          this.tipsHtml = null;
          this.lock = false;
          return this;
        }
      }]);
      return Tips;
    }();

    var index = new Tips();

    return index;
  });
});

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





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _payHandler;

/* eslint-disable object-shorthand */
/**
 * 统一支付模块
 */
function noop() {}

var PayTypes = {
  weixinPay: 2,
  newWXPay: window.wxPayType || 7,
  baofooPay: 6, // 宝付和支付宝
  QQpay: 8,
  jybPay: -1,
  baiduPay: 1
};

var payHandler = (_payHandler = {}, defineProperty(_payHandler, PayTypes.baofooPay, function (_ref) {
  var method = _ref.method;

  var form = document.createElement('form');
  var hiddenInput = [];
  form.method = method || 'post';
  form.action = this.payData.payInfo.pay_url;
  for (var ori in this.payData.payInfo.orderinfo) {
    hiddenInput.push('<input type="hidden" name="' + ori + '" value="' + this.payData.payInfo.orderinfo[ori] + '">');
  }
  form.innerHTML = hiddenInput.join('');
  document.body.appendChild(form);
  form.submit();
}), defineProperty(_payHandler, PayTypes.weixinPay, function (_ref2) {
  var returnUrl = _ref2.returnUrl;

  WeixinJSBridge.invoke( // eslint-disable-line no-undef
  'getBrandWCPayRequest', {
    appId: this.payData.payInfo.appId,
    timeStamp: this.payData.payInfo.timeStamp,
    nonceStr: this.payData.payInfo.nonceStr,
    package: this.payData.payInfo.package,
    signType: this.payData.payInfo.signType,
    paySign: this.payData.payInfo.paySign
  }, function (res) {
    // 微信支付成功
    if (res.err_msg === 'get_brand_wcpay_request:ok') {
      // 跳转到订单列表页
      location.replace(returnUrl);
    } else {
      // 微信返回支付失败
      tips.showError('支付失败<br/>请重试');
    }
  });
}), defineProperty(_payHandler, PayTypes.newWXPay, function () {
  location.href = this.payData.payInfo.pay_url;
}), defineProperty(_payHandler, PayTypes.baiduPay, function () {
  // 直接跳转支付url
  location.href = this.payData.payInfo.pay_url;
}), defineProperty(_payHandler, PayTypes.QQpay, function (_ref3) {
  var _ref3$returnUrl = _ref3.returnUrl,
      returnUrl = _ref3$returnUrl === undefined ? 'https://cdn.jyblife.com/html/wxpay/payResult.html' : _ref3$returnUrl;

  if (typeof mqq !== 'undefined') {
    // eslint-disable-line no-undef
    mqq.tenpay.pay({ // eslint-disable-line no-undef
      tokenId: this.payData.payInfo.prepay_id
    }, function (result, code) {
      if (code == 0 || result.resultCode == 0) {
        // eslint-disable-line eqeqeq
        location.replace(returnUrl);
      } else {
        tips.showError('支付失败');
      }
    });
  } else {
    tips.showError('唤起支付失败');
  }
}), defineProperty(_payHandler, PayTypes.jybPay, function () {
  wv.pay({ // eslint-disable-line no-undef
    orderId: this.payData.orderId,
    buttons: this.payData.buttons,
    extra: this.payData.extra,
    success: this.payData.success || noop,
    redirectURL: this.payData.redirectURL || ''
  });
}), _payHandler);

var PayHelper = function () {
  function PayHelper() {
    classCallCheck(this, PayHelper);

    this.payData = {};
  }

  createClass(PayHelper, [{
    key: 'pay',
    value: function pay(option) {
      if (!option || !option.payData || !option.type) {
        return;
      }

      this.payData = option.payData;
      var handler = payHandler[option.type || 0];
      handler && handler.call(this, option);
    }
  }], [{
    key: 'getPayType',
    value: function getPayType() {
      var ua = navigator.userAgent.toLowerCase();
      var payType = PayTypes.baiduPay;

      if (/micromessenger/.test(ua)) {
        payType = window.wxPayType ? PayTypes.newWXPay : PayTypes.weixinPay;
      } else if (/qq\//.test(ua)) {
        payType = PayTypes.QQpay;
      } else if (/jiayoubao/.test(ua)) {
        payType = PayTypes.jybPay;
      } else {
        payType = PayTypes.baofooPay;
      }

      return payType;
    }
  }]);
  return PayHelper;
}();

return PayHelper;

})));
