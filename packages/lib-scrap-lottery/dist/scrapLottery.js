(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ScrapLottery = factory());
}(this, (function () { 'use strict';

function createElement(tagName, attributes) {
  var ele = document.createElement(tagName);
  for (var key in attributes) {
    ele.setAttribute(key, attributes[key]);
  }
  return ele;
}
function getDis(el) {
  var pos = {
    left: 0,
    top: 0
  };
  while (el) {
    pos.top += el.offsetTop;
    pos.left += el.offsetLeft;
    el = el.offsetParent;
  }
  return pos;
}
function getTransparentPercent(ctx, width, height) {
  var imgData = ctx.getImageData(0, 0, width, height);
  var pixles = imgData.data;
  var transPixs = [];
  for (var i = 0, j = pixles.length; i < j; i += 4) {
    var a = pixles[i + 3];
    if (a < 128) {
      transPixs.push(i);
    }
  }
  return (transPixs.length / (pixles.length / 4) * 100).toFixed(2);
}
function resizeCanvas(canvas, width, height) {
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d').clearRect(0, 0, width, height);
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

/**
 * lib
 */
var config = {
  conId: '', // 刮奖容器，必须
  cover: '#ccc', // 涂层内容，可以为图片地址或颜色值，可空，默认为 #ccc
  coverType: 'color', // 涂层类型，值为 image 或 color，可空，默认为 color
  lottery: null, // 刮开后显示的内容，可以为图片地址或字符串，必须
  lotteryType: 'image', // 刮开后显示的内容类型，值为 image 或 text，要跟lottery匹配，默认为 image
  width: 300, // 刮奖区域宽度，默认为300px，可空
  height: 100, // 刮奖区域高度，默认为100px，可空
  isScrape: true, // 是否可以刮开，必填
  drawPercentCallback: function drawPercentCallback() /* percent*/{}
};

var ScrapLottery = function () {
  function ScrapLottery(option) {
    classCallCheck(this, ScrapLottery);

    this.config = _extends({}, config, option);
    this.conNode = document.getElementById(this.config.conId);
    this.background = null;
    this.backCtx = null;
    this.mask = null;
    this.maskCtx = null;
    this.clientRect = null;
  }

  createClass(ScrapLottery, [{
    key: 'drawPoint',
    value: function drawPoint(x, y) {
      this.maskCtx.beginPath();
      var radgrad = this.maskCtx.createRadialGradient(x, y, 0, x, y, 30);
      radgrad.addColorStop(0, 'rgba(0,0,0,1)');
      radgrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      this.maskCtx.fillStyle = radgrad;
      this.maskCtx.arc(x, y, 30, 0, Math.PI * 2, true);
      this.maskCtx.fill();
      var drawPercentNode = getTransparentPercent(this.maskCtx, this.config.width, this.config.height);
      if (this.config.drawPercentCallback) {
        this.config.drawPercentCallback.call(null, drawPercentNode);
      }
    }
  }, {
    key: 'bindEvent',
    value: function bindEvent() {
      var _this = this;
      var deviceKinds = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      var device = deviceKinds.test(navigator.userAgent.toLowerCase());
      var clickEvtName = device ? 'touchstart' : 'mousedown';
      var moveEvtName = device ? 'touchmove' : 'mousemove';
      var isMouseDown = false;

      if (!device) {
        document.addEventListener('mouseup', function () {
          isMouseDown = false;
        }, false);
      } else {
        document.addEventListener('touchmove', function (e) {
          if (isMouseDown) {
            e.preventDefault();
          }
        }, false);
        document.addEventListener('touchend', function () {
          isMouseDown = false;
        }, false);
      }
      this.mask.addEventListener(clickEvtName, function (e) {
        if (!_this.config.isScrape) {
          return;
        }
        isMouseDown = true;
        var docEle = document.documentElement;
        if (!_this.clientRect) {
          _this.clientRect = {
            left: 0,
            top: 0
          };
        }
        var pageX = device ? e.touches[0].pageX : e.pageX;
        var x = pageX - _this.clientRect.left + docEle.scrollLeft - docEle.clientLeft;
        var y = (device ? e.touches[0].pageY : e.pageY) - getDis(_this.conNode).top;
        _this.drawPoint(x, y);
      }, false);

      this.mask.addEventListener(moveEvtName, function (e) {
        if (!_this.config.isScrape) {
          return;
        }
        if (!device && !isMouseDown) {
          return false;
        }
        var docEle = document.documentElement;
        if (!_this.clientRect) {
          _this.clientRect = {
            left: 0,
            top: 0
          };
        }
        var pageX = device ? e.touches[0].pageX : e.pageX;
        var x = pageX - _this.clientRect.left + docEle.scrollLeft - docEle.clientLeft;
        var y = (device ? e.touches[0].pageY : e.pageY) - getDis(_this.conNode).top;
        _this.drawPoint(x, y);
      }, false);
    }
  }, {
    key: 'drawLottery',
    value: function drawLottery() {
      this.background = this.background || createElement('canvas', {
        style: 'position:absolute;left:0;top:0;'
      });
      this.mask = this.mask || createElement('canvas', {
        style: 'position:absolute;left:0;top:0;'
      });

      if (!this.conNode.innerHTML.replace(/[\w\W]| /g, '')) {
        this.conNode.appendChild(this.background);
        this.conNode.appendChild(this.mask);
        this.clientRect = this.conNode ? this.conNode.getBoundingClientRect() : null;
        this.bindEvent();
      }

      this.backCtx = this.backCtx || this.background.getContext('2d');
      this.maskCtx = this.maskCtx || this.mask.getContext('2d');

      if (this.config.lotteryType === 'image') {
        var image = new Image();
        var _this = this;
        image.onload = function () {
          // _this.width = this.width;
          // _this.height = this.height;
          resizeCanvas(_this.background, _this.config.width, _this.config.height);
          _this.backCtx.drawImage(this, 0, 0, _this.config.width, _this.config.height);
          _this.drawMask();
        };
        image.src = this.config.lottery;
      } else if (this.config.lotteryType === 'text') {
        this.width = this.config.width;
        this.height = this.config.height;
        resizeCanvas(this.background, this.width, this.height);
        this.backCtx.save();
        this.backCtx.fillStyle = '#FFF';
        this.backCtx.fillRect(0, 0, this.width, this.height);
        this.backCtx.restore();
        this.backCtx.save();
        var fontSize = 30;
        this.backCtx.font = 'Bold ' + fontSize + 'px Arial';
        this.backCtx.textAlign = 'center';
        this.backCtx.fillStyle = '#F60';
        this.backCtx.fillText(this.config.lottery, this.width / 2, this.height / 2 + fontSize / 2);
        this.backCtx.restore();
        this.drawMask();
      }
    }
  }, {
    key: 'drawMaskPoint',
    value: function drawMaskPoint() {
      this.mask = this.mask || createElement('canvas', {
        style: 'position:absolute;left:0;top:0;color:#fff;'
      });
      if (!this.conNode.innerHTML.replace(/[\w\W]| /g, '')) {
        this.conNode.appendChild(this.mask);
        this.clientRect = this.conNode ? this.conNode.getBoundingClientRect() : null;
        this.bindEvent();
      }
      this.maskCtx = this.maskCtx || this.mask.getContext('2d');
    }
  }, {
    key: 'drawMask',
    value: function drawMask() {
      resizeCanvas(this.mask, this.config.width, this.config.height);
      if (this.config.coverType === 'color') {
        this.maskCtx.fillStyle = this.config.cover;
        this.maskCtx.fillRect(0, 0, this.config.width, this.config.height);
        this.maskCtx.globalCompositeOperation = 'destination-out';
      } else if (this.config.coverType === 'image') {
        var image = new Image();
        var _this = this;
        image.onload = function () {
          _this.maskCtx.drawImage(this, 0, 0, _this.config.width, _this.config.height);
          _this.maskCtx.globalCompositeOperation = 'destination-out';
        };
        image.src = this.config.cover;
      }
    }
  }, {
    key: 'init',
    value: function init(lottery, lotteryType) {
      this.config.lottery = lottery;
      this.config.lotteryType = lotteryType || 'image';
      this.drawLottery();
    }
  }]);
  return ScrapLottery;
}();

return ScrapLottery;

})));
