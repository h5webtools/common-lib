(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Lottery = factory());
}(this, (function () { 'use strict';

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

var empty = function empty() {};
var config = {
  maxGrid: 8, // 最大格子数量
  times: 30, // 格子高亮次数
  prizeIndex: 0, // 奖品所在格子顺序1-8
  speed: 200, // 转速
  gridClass: '', // 格子类名，用于查找格子数量
  callback: empty, // 停止时的回调函数
  activeClass: 'active', // 格子高亮的样式
  reduce: 10, // 转速递减值
  advanceTimes: 10, // 提前多少步开始减速
  continueTimes: 20 // 当times次数用尽，但是还是没有设置最终奖品的情况下，times递增的次数
};

var Lottery = function () {
  function Lottery(option) {
    classCallCheck(this, Lottery);

    this.config = Object.assign(config, option);
    this.gridList = []; // 奖品格子列表
    this.index = 0; // 当前所在的格子序号
    this.isStop = false; // 是否停止转动
    this.prt = null; // 定时器
    this.currentGrid = null; // 当前格子
    this.loopedTimes = 0; // 已经高亮过的次数
    this.isLastStep = false; // 是否进入最后几个步骤
    this._init();
  }

  createClass(Lottery, [{
    key: '_init',
    value: function _init() {
      if (this.config.prizeIndex < 0 || this.config.prizeIndex > this.config.maxGrid) {
        throw new Error('奖品序号不在允许范围内');
      }

      // 初始化几个格子列表
      for (var i = 1; i <= this.config.maxGrid; i++) {
        var indexNode = document.querySelector('.' + this.config.gridClass + '[index=\'' + i + '\']');

        indexNode && this.gridList.push(indexNode);
      }
      this._start();
    }
  }, {
    key: '_start',
    value: function _start() {
      var _this = this;

      if (this.isStop) {
        this._clearStatus();
        return;
      }
      this.index++;

      // 到了最大格子数恢复为1
      if (this.index > this.config.maxGrid) {
        this.index = 1;
      }
      this.ptr = setTimeout(function () {
        _this._doLoop();
      }, this.config.speed);
    }

    /**
     * 设置奖品顺序，通常在接口返回后调用
     * @param {奖品格子顺序号} prizeLevel
     */

  }, {
    key: 'setPrizeIndex',
    value: function setPrizeIndex(prizeLevel) {
      // 如果奖品不在允许范围内，默认到第一个奖品
      if (prizeLevel < 1 || prizeLevel > this.config.maxGrid) {
        // 停止转动
        this.isStop = true;
        throw new Error('奖品序号不在允许范围内');
      } else {
        this.config.prizeIndex = prizeLevel;
      }

      // 设置奖品之后让圈数再次扩大，防止突然停止
      this.config.times += this.config.continueTimes;
      return this;
    }
  }, {
    key: 'setTimes',
    value: function setTimes(times) {
      if (times < 0) {
        throw new Error('高亮格子数量不能小于0');
      }
      this.config.times = times;
      return this;
    }

    /**
     * 停止转动
     */

  }, {
    key: 'stop',
    value: function stop() {
      this.isStop = true;
      clearTimeout(this.ptr);
      return this;
    }

    /**
     * 执行格子高亮动作
     */

  }, {
    key: '_doLoop',
    value: function _doLoop() {
      // 先清除上一个格子的高亮状态
      if (this.currentGrid) {
        this.currentGrid.classList.remove(this.config.activeClass);
      }
      this.currentGrid = this.gridList[this.index - 1];

      // 高亮当前格子
      this.currentGrid.classList.add(this.config.activeClass);
      this.loopedTimes++;

      // 如果转的次数用完，但是还没有设置奖项，继续转
      if (this.loopedTimes >= this.config.times && !this.config.prizeIndex) {
        this.config.times += this.config.continueTimes;
        this._start();
        return;
      }

      // 提前多少步开始减速
      if (this.config.prizeIndex && (this.isLastStep || this.loopedTimes + this.config.advanceTimes > this.config.times)) {
        this.config.speed += this.config.reduce;
      }

      // 次数已经用完
      if (this.loopedTimes >= this.config.times) {
        var more = 0;

        // 计算当前格子距离奖品的剩余步数
        if (this.index < this.config.prizeIndex) {
          more = this.config.prizeIndex - this.index;
        } else if (this.index == this.config.prizeIndex) {
          more = 0;
        } else {
          more = this.config.maxGrid - this.index + this.config.prizeIndex;
        }
        if (more === 0) {
          this.config.callback(this.currentGrid);
          clearTimeout(this.ptr);
          return;
        } else {
          // 是否进入最后几步
          this.isLastStep = true;

          // 步骤再多加几步
          this.config.times += more;
          this._start();
        }
      } else {
        // 继续下一次
        this._start();
      }
    }

    /**
     * 清除当前格子的高亮状态
     */

  }, {
    key: '_clearStatus',
    value: function _clearStatus() {
      this.currentGrid.classList.remove(this.config.activeClass);
    }
  }]);
  return Lottery;
}();

return Lottery;

})));
//# sourceMappingURL=lottery.dev.js.map
