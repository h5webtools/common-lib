/**
 * lib
 */

import dialogTpl from './index.dot';

function noop() {}

const defaultOptions = {
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

class Dialog {
  constructor(options = {}) {
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
  _init() {
    const options = this.options;
    const wh = window.innerHeight;

    // 判断按钮是否需要
    options.btns.forEach((btn, i) => {
      // 给evtHandler注册事件回调
      this.evtHandler[`btnCallback${i}`] = btn.callback;
    });

    this.dialogNode = $(dialogTpl(options));
    this.dialogNode.css({
      display: 'none',
      visibility: 'hidden'
    });
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

    this.dialogNode.css({
      visibility: 'visible'
    });

    // 注册关闭事件处理函数
    this.registerHandler('closeDialog', this.close.bind(this));
  }

  /**
   * 显示
   */
  show() {
    this.options.onShow(this.dialogNode);
    this.dialogNode.css({
      display: 'block'
    });
  }

  /**
   * 关闭
   */
  close() {
    this.options.onClose();
    this.dialogNode.css({
      display: 'none'
    });
  }

  /**
   * 销毁
   */
  dispose() {
    if (!this.dialogNode) {
      return;
    }

    const options = this.options;

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
  updateContent(content) {
    const options = this.options;
    this.dialogNode.find(`.${options.elementCls.body}`).html(content);
  }

  /**
   * 注册事件处理函数
   * @param {String} name 名称
   * @param {Function} handler 函数
   */
  registerHandler(name, handler) {
    if (this.evtHandler[name]) {
      throw new Error('事件处理函数已经存在');
    }

    this.evtHandler[name] = handler;
  }

  /**
   * 事件处理
   */
  _bindEvent() {
    this.dialogNode.on('click', (e) => {
      e = e || window.event;
      const tag = e.target.tagName;
      let node = $(e.target);
      let et = node.attr('et');

      if (!et) {
        // 向上找
        while (node[0] && node[0] !== this.dialogNode && !et) {
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
