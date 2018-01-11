(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Orienter = factory());
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

/**
 * 横竖屏重力感应的易用组件
 * @see https://developer.mozilla.org/en-US/docs/Web/Events/orientationchange
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Detecting_device_orientation
 */

function noop() {}

var Orienter = function () {
  function Orienter() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Orienter);

    this.lon = 0;
    this.lat = 0;
    this.direction = 0;
    this.fix = 0;
    this.os = '';
    this.initialize(options);
  }

  createClass(Orienter, [{
    key: 'initialize',
    value: function initialize(config) {
      var _config = config || {};

      this.onOrient = _config.onOrient || noop;
      this.onChange = _config.onChange || noop;

      this._orient = this._orient.bind(this);
      this._change = this._change.bind(this);

      this.lon = 0;
      this.lat = 0;
      this.direction = window.orientation || 0;

      switch (this.direction) {
        case 0:
          this.fix = 0;
          break;
        case 90:
          this.fix = -270;
          break;
        case -90:
          this.fix = -90;
          break;
        default:
          break;
      }

      if (!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        this.os = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') ? 'android' : '';
      } else {
        this.os = 'ios';
      }
    }
  }, {
    key: 'init',
    value: function init() {
      window.addEventListener('deviceorientation', this._orient, false);
      window.addEventListener('orientationchange', this._change, false);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      window.removeEventListener('deviceorientation', this._orient, false);
      window.removeEventListener('orientationchange', this._change, false);
    }
  }, {
    key: '_change',
    value: function _change() {
      this.direction = window.orientation;
      this.onChange(this.direction);
    }
  }, {
    key: 'changeDirectionTo',
    value: function changeDirectionTo(n) {
      this.direction = n;
    }
  }, {
    key: '_orient',
    value: function _orient(event) {
      switch (this.os) {
        case 'ios':
          switch (this.direction) {
            case 0:
              this.lon = event.alpha + event.gamma;
              if (event.beta > 0) this.lat = event.beta - 90;
              break;
            case 90:
              if (event.gamma < 0) {
                this.lon = event.alpha - 90;
              } else {
                this.lon = event.alpha - 270;
              }
              if (event.gamma > 0) {
                this.lat = 90 - event.gamma;
              } else {
                this.lat = -90 - event.gamma;
              }
              break;
            case -90:
              if (event.gamma < 0) {
                this.lon = event.alpha - 90;
              } else {
                this.lon = event.alpha - 270;
              }
              if (event.gamma < 0) {
                this.lat = 90 + event.gamma;
              } else {
                this.lat = -90 + event.gamma;
              }
              break;
            default:
              break;
          }
          break;
        case 'android':
          switch (this.direction) {
            case 0:
              this.lon = event.alpha + event.gamma + 30;
              if (event.gamma > 90) {
                this.lat = 90 - event.beta;
              } else {
                this.lat = event.beta - 90;
              }
              break;
            case 90:
              this.lon = event.alpha - 230;
              if (event.gamma > 0) {
                this.lat = 270 - event.gamma;
              } else {
                this.lat = -90 - event.gamma;
              }
              break;
            case -90:
              this.lon = event.alpha - 180;
              this.lat = -90 + event.gamma;
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }

      this.lon += this.fix;
      this.lon %= 360;
      if (this.lon < 0) this.lon += 360;

      this.lon = Math.round(this.lon);
      this.lat = Math.round(this.lat);

      this.onOrient({
        a: Math.round(event.alpha),
        b: Math.round(event.beta),
        g: Math.round(event.gamma),
        lon: this.lon,
        lat: this.lat,
        dir: this.direction
      });
    }
  }]);
  return Orienter;
}();

return Orienter;

})));
