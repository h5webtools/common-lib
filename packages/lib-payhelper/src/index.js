/* eslint-disable object-shorthand */
/**
 * 统一支付模块
 */
import tips from '@jyb/lib-tips';

function noop() {}

const PayTypes = {
  weixinPay: 2,
  newWXPay: window.wxPayType || 7,
  baofooPay: 6, // 宝付和支付宝
  QQpay: 8,
  jybPay: -1,
  baiduPay: 1,
};

const payHandler = {
  /**
     * 宝付和支付宝支付方式
     * @param method form提交类型
     */
  [PayTypes.baofooPay]: function ({ method }) {
    const form = document.createElement('form');
    const hiddenInput = [];
    form.method = method || 'post';
    form.action = this.payData.payInfo.pay_url;
    for (const ori in this.payData.payInfo.orderinfo) {
      hiddenInput.push(`<input type="hidden" name="${ori}" value="${this.payData.payInfo.orderinfo[ori]}">`);
    }
    form.innerHTML = hiddenInput.join('');
    document.body.appendChild(form);
    form.submit();
  },
  /**
     * 微信支付
     */
  [PayTypes.weixinPay]: function ({ returnUrl }) {
    WeixinJSBridge.invoke(// eslint-disable-line no-undef
      'getBrandWCPayRequest',
      {
        appId: this.payData.payInfo.appId,
        timeStamp: this.payData.payInfo.timeStamp,
        nonceStr: this.payData.payInfo.nonceStr,
        package: this.payData.payInfo.package,
        signType: this.payData.payInfo.signType,
        paySign: this.payData.payInfo.paySign
      },
      (res) => {
        // 微信支付成功
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          // 跳转到订单列表页
          location.replace(returnUrl);
        } else {
          // 微信返回支付失败
          tips.showError('支付失败<br/>请重试');
        }
      }
    );
  },
  // 跳转到新的微信支付渠道
  [PayTypes.newWXPay]: function () {
    location.href = this.payData.payInfo.pay_url;
  },
  [PayTypes.baiduPay]: function () {
    // 直接跳转支付url
    location.href = this.payData.payInfo.pay_url;
  },
  [PayTypes.QQpay]: function ({ returnUrl = 'https://cdn.jyblife.com/html/wxpay/payResult.html' }) {
    if (typeof mqq !== 'undefined') { // eslint-disable-line no-undef
      mqq.tenpay.pay({// eslint-disable-line no-undef
        tokenId: this.payData.payInfo.prepay_id
      }, (result, code) => {
        if (code == 0 || result.resultCode == 0) { // eslint-disable-line eqeqeq
          location.replace(returnUrl);
        } else {
          tips.showError('支付失败');
        }
      });
    } else {
      tips.showError('唤起支付失败');
    }
  },
  [PayTypes.jybPay]: function () {
    wv.pay({// eslint-disable-line no-undef
      orderId: this.payData.orderId,
      buttons: this.payData.buttons,
      extra: this.payData.extra,
      success: this.payData.success || noop,
      redirectURL: this.payData.redirectURL || '',
    });
  }
};

class PayHelper {
  constructor() {
    this.payData = {};
  }

  static getPayType() {
    const ua = navigator.userAgent.toLowerCase();
    let payType = PayTypes.baiduPay;

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

  pay(option) {
    if (!option || !option.payData || !option.type) {
      return;
    }

    this.payData = option.payData;
    const handler = payHandler[option.type || 0];
    handler && handler.call(this, option);
  }
}

export default PayHelper;
