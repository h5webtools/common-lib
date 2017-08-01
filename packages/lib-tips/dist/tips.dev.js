(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Tips = factory());
}(this, (function () { 'use strict';

var createElement = function () {
  var container = document.createElement('div');
  return function (html) {
    container.innerHTML = html;
    return container.children[0];
  };
}();

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
      loading: '<span class="rotate-icon"></span>',
      none: ''
    };

    this.tipTemplate = '<div id="bubble"><div class="mod-spinner">' + '<div class="spinner-wrap">{{icon}}' + '<p class="text" id="bubble-text">{{text}}</p>' + '</div></div></div>';
  }

  createClass(Tips, [{
    key: 'showTips',
    value: function showTips(option) {
      var _this = this;

      if (this.tipsHtml) {
        return;
      }

      var conf = Object.assign({}, this.config, option);
      var html = this.tipTemplate.replace(/{{icon}}/, conf.isLoading ? this.iconConf.loading : '').replace(/{{text}}/, conf.msg);

      this.tipsHtml = createElement(html);
      document.body.insertBefore(this.tipsHtml, null);

      if (conf.autoHide) {
        setTimeout(function () {
          _this.closeTips();
        }, conf.hideTime);
      }

      this.lock = true;
    }
  }, {
    key: 'showLoading',
    value: function showLoading(message) {
      this.showTips({
        msg: message || '努力加载中...',
        isLoading: true,
        autoHide: false
      });
    }
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

})));
//# sourceMappingURL=tips.dev.js.map
