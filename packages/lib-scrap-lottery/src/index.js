/**
 * lib
 */
import * as util from './util';

const config = {
  conId: '', // 刮奖容器，必须
  cover: '#ccc', // 涂层内容，可以为图片地址或颜色值，可空，默认为 #ccc
  coverType: 'color', // 涂层类型，值为 image 或 color，可空，默认为 color
  lottery: null, // 刮开后显示的内容，可以为图片地址或字符串，必须
  lotteryType: 'image', // 刮开后显示的内容类型，值为 image 或 text，要跟lottery匹配，默认为 image
  width: 300, // 刮奖区域宽度，默认为300px，可空
  height: 100, // 刮奖区域高度，默认为100px，可空
  isScrape: true, // 是否可以刮开，必填
  drawPercentCallback(/* percent*/) { }, // 刮开的区域百分比，可空
};

class ScrapLottery {
  constructor(option) {
    this.config = Object.assign({}, config, option);
    this.conNode = document.getElementById(this.config.conId);
    this.background = null;
    this.backCtx = null;
    this.mask = null;
    this.maskCtx = null;
    this.clientRect = null;
  }
  drawPoint(x, y) {
    this.maskCtx.beginPath();
    const radgrad = this.maskCtx.createRadialGradient(x, y, 0, x, y, 30);
    radgrad.addColorStop(0, 'rgba(0,0,0,1)');
    radgrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    this.maskCtx.fillStyle = radgrad;
    this.maskCtx.arc(x, y, 30, 0, Math.PI * 2, true);
    this.maskCtx.fill();
    const drawPercentNode = util.getTransparentPercent(this.maskCtx, this.config.width, this.config.height);
    if (this.config.drawPercentCallback) {
      this.config.drawPercentCallback.call(null, drawPercentNode);
    }
  }
  bindEvent() {
    const _this = this;
    const deviceKinds = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const device = (deviceKinds.test(navigator.userAgent.toLowerCase()));
    const clickEvtName = device ? 'touchstart' : 'mousedown';
    const moveEvtName = device ? 'touchmove' : 'mousemove';
    let isMouseDown = false;

    if (!device) {
      document.addEventListener('mouseup', () => {
        isMouseDown = false;
      }, false);
    } else {
      document.addEventListener('touchmove', (e) => {
        if (isMouseDown) {
          e.preventDefault();
        }
      }, false);
      document.addEventListener('touchend', () => {
        isMouseDown = false;
      }, false);
    }
    this.mask.addEventListener(clickEvtName, (e) => {
      if (!_this.config.isScrape) {
        return;
      }
      isMouseDown = true;
      const docEle = document.documentElement;
      if (!_this.clientRect) {
        _this.clientRect = {
          left: 0,
          top: 0
        };
      }
      const pageX = device ? e.touches[0].pageX : e.pageX;
      const x = ((pageX - _this.clientRect.left) + docEle.scrollLeft) - docEle.clientLeft;
      const y = (device ? e.touches[0].pageY : e.pageY) - util.getDis(_this.conNode).top;
      _this.drawPoint(x, y);
    }, false);

    this.mask.addEventListener(moveEvtName, (e) => {
      if (!_this.config.isScrape) {
        return;
      }
      if (!device && !isMouseDown) {
        return false;
      }
      const docEle = document.documentElement;
      if (!_this.clientRect) {
        _this.clientRect = {
          left: 0,
          top: 0
        };
      }
      const pageX = device ? e.touches[0].pageX : e.pageX;
      const x = ((pageX - _this.clientRect.left) + docEle.scrollLeft) - docEle.clientLeft;
      const y = (device ? e.touches[0].pageY : e.pageY) - util.getDis(_this.conNode).top;
      _this.drawPoint(x, y);
    }, false);
  }
  drawLottery() {
    this.background = this.background || util.createElement('canvas', {
      style: 'position:absolute;left:0;top:0;'
    });
    this.mask = this.mask || util.createElement('canvas', {
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
      const image = new Image();
      const _this = this;
      image.onload = function () {
        // _this.width = this.width;
        // _this.height = this.height;
        util.resizeCanvas(_this.background, _this.config.width, _this.config.height);
        _this.backCtx.drawImage(this, 0, 0, _this.config.width, _this.config.height);
        _this.drawMask();
      };
      image.src = this.config.lottery;
    } else if (this.config.lotteryType === 'text') {
      this.width = this.config.width;
      this.height = this.config.height;
      util.resizeCanvas(this.background, this.width, this.height);
      this.backCtx.save();
      this.backCtx.fillStyle = '#FFF';
      this.backCtx.fillRect(0, 0, this.width, this.height);
      this.backCtx.restore();
      this.backCtx.save();
      const fontSize = 30;
      this.backCtx.font = `Bold ${fontSize}px Arial`;
      this.backCtx.textAlign = 'center';
      this.backCtx.fillStyle = '#F60';
      this.backCtx.fillText(this.config.lottery, this.width / 2, (this.height / 2) + (fontSize / 2));
      this.backCtx.restore();
      this.drawMask();
    }
  }
  drawMaskPoint() {
    this.mask = this.mask || util.createElement('canvas', {
      style: 'position:absolute;left:0;top:0;color:#fff;'
    });
    if (!this.conNode.innerHTML.replace(/[\w\W]| /g, '')) {
      this.conNode.appendChild(this.mask);
      this.clientRect = this.conNode ? this.conNode.getBoundingClientRect() : null;
      this.bindEvent();
    }
    this.maskCtx = this.maskCtx || this.mask.getContext('2d');
  }
  drawMask() {
    util.resizeCanvas(this.mask, this.config.width, this.config.height);
    if (this.config.coverType === 'color') {
      this.maskCtx.fillStyle = this.config.cover;
      this.maskCtx.fillRect(0, 0, this.config.width, this.config.height);
      this.maskCtx.globalCompositeOperation = 'destination-out';
    } else if (this.config.coverType === 'image') {
      const image = new Image();
      const _this = this;
      image.onload = function () {
        _this.maskCtx.drawImage(this, 0, 0, _this.config.width, _this.config.height);
        _this.maskCtx.globalCompositeOperation = 'destination-out';
      };
      image.src = this.config.cover;
    }
  }
  init(lottery, lotteryType) {
    this.config.lottery = lottery;
    this.config.lotteryType = lotteryType || 'image';
    this.drawLottery();
  }
}


export default ScrapLottery;
