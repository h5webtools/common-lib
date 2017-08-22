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
  !function (t, i) {
    module.exports = i();
  }(commonjsGlobal, function () {
    "use strict";
    function t(t) {
      return '<div id="bubble"> <div class="mod-spinner"> <div class="spinner-wrap"><span class="' + t.icon + '"></span><p class="text" id="bubble-text">' + t.text + "</p> </div> </div></div>";
    }var i = function () {
      var t = document.createElement("div");return function (i) {
        return t.innerHTML = i, t.children[0];
      };
    }(),
        n = function n(t, i) {
      if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
    },
        e = function () {
      function t(t, i) {
        for (var n = 0; n < i.length; n++) {
          var e = i[n];e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(t, e.key, e);
        }
      }return function (i, n, e) {
        return n && t(i.prototype, n), e && t(i, e), i;
      };
    }(),
        o = Object.assign || function (t) {
      for (var i = 1; i < arguments.length; i++) {
        var n = arguments[i];for (var e in n) {
          Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e]);
        }
      }return t;
    };return new (function () {
      function s() {
        n(this, s), this.tipsHtml = null, this.ptr = null, this.config = { msg: "", isLoading: !1, autoHide: !0, hideTime: 1200 }, this.iconConf = { loading: "rotate-icon", none: "" };
      }return e(s, [{ key: "showTips", value: function value(n) {
          var e = this;if (!this.tipsHtml) {
            var s = o({}, this.config, n),
                r = t({ text: s.msg, icon: s.isLoading ? this.iconConf.loading : "" });this.tipsHtml = i(r), document.body.insertBefore(this.tipsHtml, null), s.autoHide && setTimeout(function () {
              e.closeTips();
            }, s.hideTime), this.lock = !0;
          }
        } }, { key: "showLoading", value: function value(t) {
          this.showTips({ msg: t || "努力加载中...", isLoading: !0, autoHide: !1 });
        } }, { key: "showError", value: function value(t) {
          var i = this;clearInterval(this.ptr), this.ptr = setInterval(function () {
            i.tipsHtml || (i.showTips({ msg: t }), clearInterval(i.ptr), i.ptr = null);
          }, 200);
        } }, { key: "closeTips", value: function value() {
          return this.tipsHtml ? (this.tipsHtml.parentNode.removeChild(this.tipsHtml), this.tipsHtml = null, this.lock = !1, this) : this;
        } }]), s;
    }())();
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
var PayTypes = {
  weixinPay: 2,
  newWXPay: 7,
  baofooPay: 6,
  QQpay: 8,
  jybPay: -1,
  baiduPay: 0
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
}), defineProperty(_payHandler, PayTypes.QQpay, function () {
  if (mqq) {
    // eslint-disable-line no-undef
    mqq.tenpay.pay({ // eslint-disable-line no-undef
      tokenId: this.payData.payInfo.prepay_id
    }, function (result, code) {
      if (code == 0 || result.resultCode == 0) {
        // eslint-disable-line eqeqeq
        location.replace('https://cdn.jyblife.com/html/wxpay/payResult.html');
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
    extra: this.payData.extra
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
        payType = PayTypes.newWXPay;
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
