(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Dialog = factory());
}(this, (function () { 'use strict';

function anonymous(it
/**/) {
  var out = '<div class="' + it.elementCls.el + '"> ';if (it.mask) {
    out += ' <div class="' + it.elementCls.mask + '"></div> ';
  }out += ' <div class="' + it.elementCls.wrap + '" style="position:absolute;top:' + it.top + 'px;"> ';if (it.title) {
    out += ' <div class="' + it.elementCls.head + '"> ' + it.title + ' ';if (it.showClose) {
      out += ' <span class="' + it.elementCls.close + '" et="click:closeDialog">&#10005;</span> ';
    }out += ' </div> ';
  }out += ' ';if (it.content) {
    out += ' <div class="' + it.elementCls.body + '">' + it.content + '</div> ';
  }out += ' ';if (it.btns.length > 0) {
    out += ' <div class="' + it.elementCls.foot + '"> ';var arr1 = it.btns;if (arr1) {
      var value,
          index = -1,
          l1 = arr1.length - 1;while (index < l1) {
        value = arr1[index += 1];out += ' <span class="' + it.elementCls.btn + ' ' + (value.css ? value.css : '') + '" et="click:btnCallback' + index + '">' + value.text + '</span> ';
      }
    }out += ' </div> ';
  }out += ' </div></div>';return out;
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

/**
 * lib
 */

function noop() {}

var defaultOptions = {
  title: '标题', // 标题内容
  visible: true, // 默认显示
  showClose: true, // 是否显示close按钮
  content: '内容', // 显示的内容
  btns: [], // 按钮列表{ text: '', callback: function(){}, css:'' }
  mask: true, // 是否显示mask
  onClose: noop,
  onShow: noop,
  onDispose: noop,
  elementCls: {
    el: 'mod-dialog',
    mask: 'overlay',
    wrap: 'dialog-wrap',
    close: 'close-btn',
    head: 'dialog-head',
    body: 'dialog-body',
    foot: 'dialog-foot',
    btn: 'dialog-btn'
  }
};

var Dialog = function () {
  function Dialog() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Dialog);

    this.evtHandler = {};
    this.options = $.extend(true, {}, defaultOptions, options);

    this.dialogNode = null;
    this._init();
    this._bindEvent();

    if (this.options.visible) {
      this.show();
    }
  }

  /**
   * 初始化
   */


  createClass(Dialog, [{
    key: '_init',
    value: function _init() {
      var _this = this;

      var options = this.options;
      var wh = window.innerHeight;

      // 判断按钮是否需要
      options.btns.forEach(function (btn, i) {
        // 给evtHandler注册事件回调
        _this.evtHandler['btnCallback' + i] = btn.callback;
      });

      this.dialogNode = $(anonymous(options));
      this.dialogNode.css({
        display: 'none',
        visibility: 'hidden'
      });
      $('body').append(this.dialogNode);

      // 判断dialog高度
      var modDialogNode = $('.' + options.elementCls.wrap);
      var dh = modDialogNode[0].scrollHeight;

      // 浮层高度小于窗口高度的情况下
      if (dh < wh) {
        modDialogNode.css({
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-50%)',
          '-webkit-transform': 'translateX(-50%) translateY(-50%)'
        });
      }

      this.dialogNode.css({
        visibility: 'visible'
      });

      // 注册关闭事件处理函数
      this.registerHandler('closeDialog', this.close.bind(this));
    }

    /**
     * 显示
     */

  }, {
    key: 'show',
    value: function show() {
      this.options.onShow(this.dialogNode);
      this.dialogNode.css({
        display: 'block'
      });
    }

    /**
     * 关闭
     */

  }, {
    key: 'close',
    value: function close() {
      this.options.onClose();
      this.dialogNode.css({
        display: 'none'
      });
    }

    /**
     * 销毁
     */

  }, {
    key: 'dispose',
    value: function dispose() {
      if (!this.dialogNode) {
        return;
      }

      var options = this.options;

      this.dialogNode.off('click');
      this.dialogNode.remove();
      this.dialogNode = null;
      options.onDispose();
      this.evtHandler = {};
    }

    /**
     * 更新内容
     * @param {String} content 内容
     */

  }, {
    key: 'updateContent',
    value: function updateContent(content) {
      var options = this.options;
      this.dialogNode.find('.' + options.elementCls.body).html(content);
    }

    /**
     * 注册事件处理函数
     * @param {String} name 名称
     * @param {Function} handler 函数
     */

  }, {
    key: 'registerHandler',
    value: function registerHandler(name, handler) {
      if (this.evtHandler[name]) {
        throw new Error('事件处理函数已经存在');
      }

      this.evtHandler[name] = handler;
    }

    /**
     * 事件处理
     */

  }, {
    key: '_bindEvent',
    value: function _bindEvent() {
      var _this2 = this;

      this.dialogNode.on('click', function (e) {
        e = e || window.event;
        var tag = e.target.tagName;
        var node = $(e.target);
        var et = node.attr('et');

        if (!et) {
          // 向上找
          while (node[0] && node[0] !== _this2.dialogNode && !et) {
            node = node.parent();
            et = node.attr('et');
          }
          if (!et) {
            return;
          }
        }

        // 超链接不阻值冒泡
        tag !== 'A' && e.stopPropagation();
        // 是对应的事件
        if (et.indexOf(e.type) === 0) {
          // 调用事件指定的函数
          _this2.evtHandler[et.split(':')[1]](node, e);
        }
      });
    }
  }]);
  return Dialog;
}();

return Dialog;

})));
//# sourceMappingURL=dialog.dev.js.map
