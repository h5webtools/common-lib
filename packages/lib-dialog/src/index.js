/**
 * lib
 */

import extend from '@jyb/lib-extend';
import dialogTpl from './index.dot';

function noop() {}

const defaultOptions = {
  title: '标题', // 标题内容
  showClose: true, // 是否显示close按钮
  content: '内容', // 显示的内容
  btns: [], // 按钮列表{text:"",callback:function(){},css:""}
  mask: true, // 是否显示mask
  selfAction: '', // 自定义事件
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

class Dialog {
  constructor(options = {}) {
    this.evtHandler = {};
    this.options = extend(true, {}, defaultOptions, options);

    this.dialogNode = null;
    this._init();
    this._registerHandler();
  }

  _init() {
    const options = this.config;
    const wh = window.innerHeight;

    // 判断按钮是否需要
    options.btns.forEach((btn, i) => {
      // 给evtHandler注册事件回调
      this.evtHandler[`btnCallback${i}`] = btn.callback;
    });

    this.dialogNode = $(dialogTpl(options));
    $('body').append(this.dialogNode);

    // 判断dialog高度
    const modDialogNode = $(`.${options.elementCls.wrap}`);
    const dh = modDialogNode[0].scrollHeight;

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
    // dialogNode.removeClass("ui-vh");

    this.show();
    this.bindEvent();
  }

  _registerHandler() {
    this.evtHandler = {
      closeDialog: this.close.bind(this),
      selfDefineAction: this.selfDefineAction.bind(this)
    };
  }

  show() {
    this.options.onShow(this.dialogNode);
    this.dialogNode.show();
  }

  close() {
    this.options.onClose();
    this.dialogNode.hide();
  }

  dispose() {
    if (!this.dialogNode) {
      return;
    }

    const options = this.options;

    // 关闭浮层
    this.dialogNode.remove();
    this.dialogNode = null;
    options.onDispose();
    // 清理回调函数
    options.btns.forEach((btn, i) => {
      delete this.evtHandler[`btnCallback${i}`];
    });
  }

  selfDefineAction(node, e) {
    const options = this.options;

    options.selfAction && options.selfAction(node, e);
  }

  updateContent(content) {
    const options = this.options;
    this.dialogNode.find(`.${options.elementCls.body}`).html(content);
  }

  bindEvent() {
    this.dialogNode.on('click', (e) => {
      e = e || window.event;
      const tag = e.target.tagName;
      let node = $(e.target);
      let et = node.attr('et');

      if (!et) {
        // 向上找
        while (node[0] != this && !et) {
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
        this.evtHandler[et.split(':')[1]](node, e);
      }
    });
  }
}

export default Dialog;
