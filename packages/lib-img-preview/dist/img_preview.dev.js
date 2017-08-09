(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ImgPreview = factory());
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
 * 图片预览
 */

// 默认配置
var defaultOptions = {
  max: 8,
  callback: function callback() {},

  fileType: ''
};

var ImgPreview = function () {
  /**
   * 图片预览对象，每次上传都需要new FilePreview
   * @param {Array} files 上传的图片对象
   * @param {Object} options 选项
   * @param {String} options.fileType 文件类型
   * @param {Function} options.callback 预览完成的回调函数（多张图调用多次）
   * @param {Number} options.max 最多多少张图片
   **/
  function ImgPreview(files) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, ImgPreview);

    this.files = files;
    this.options = _extends({}, defaultOptions, options);

    if (!files) {
      throw new Error('files参数不能为空');
    }
    this.collectFiles();
  }

  /**
   * 处理图片
   */


  createClass(ImgPreview, [{
    key: 'collectFiles',
    value: function collectFiles() {
      var count = this.files.length;
      var options = this.options;

      count = count <= options.max ? count : options.max;
      for (var i = 0; i < count; i++) {
        var file = this.files[i];

        if (/^image\/*/.test(file.type)) {
          this.previewImage(file, i);
        }
      }
    }

    /**
     * 预览图片
     * @param {Object} file 文件
     * @param {Number} index 下标
     */

  }, {
    key: 'previewImage',
    value: function previewImage(file, index) {
      var options = this.options;
      var time = +new Date() + String(index);
      var url = null;

      if (window.createObjectURL !== undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL !== undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      options.callback(url, time, options.fileType);
    }

    /**
     * 压缩图片
     * @param {Object} url 是一个 DOMString，表示通过调用 URL.createObjectURL() 方法产生的 URL 对象
     * @param {Object} imageNode
     * @param {Number} scale 缩小倍数
     * @param {Number} quantity 压缩质量
     */

  }, {
    key: 'compressImage',
    value: function compressImage(url, imageNode) {
      var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
      var quantify = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.8;

      // 释放内存
      this.revokeObject(url);
      var imageWidth = imageNode.naturalWidth;
      var imageHeight = imageNode.naturalHeight;
      var targetWidth = parseInt(imageWidth / scale, 10);
      var targetHeight = parseInt(imageHeight / scale, 10);
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(imageNode, 0, 0, targetWidth, targetHeight);

      // 压缩图片
      return canvas.toDataURL('image/jpeg', quantify);
    }

    /**
     * 释放占用的内存
     * @param {Object} url 是一个 DOMString，表示通过调用 URL.createObjectURL() 方法产生的 URL 对象
     */

  }, {
    key: 'revokeObject',
    value: function revokeObject(url) {
      if (window.revokeObjectURL !== undefined) {
        // basic
        window.revokeObjectURL(url);
      } else if (window.URL !== undefined) {
        // mozilla(firefox)
        window.URL.revokeObjectURL(url);
      } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        window.webkitURL.revokeObjectURL(url);
      }
    }

    /**
     * 将以base64的图片url数据转换为Blob，用url方式表示的base64图片数据
     * @param {String} dataurl
     */

  }], [{
    key: 'convertBase64UrlToBlob',
    value: function convertBase64UrlToBlob(dataurl) {
      var arr = dataurl.split(',');
      var mime = arr[0].match(/:(.*?);/)[1]; // 获取base64中的miie类型
      var text = atob(arr[1]); // 将base64转换为字符串
      var len = text.length;
      var buffer = new Uint8Array(len);

      while (len--) {
        buffer[len] = text.charCodeAt(len);
      }

      var BlBuilder = window.BlobBuilder || window.WebKitBlobBuilder;
      var blob = void 0;

      if (BlBuilder) {
        var builder = new BlBuilder();
        builder.append(buffer);
        blob = builder.getBlob(mime);
      } else {
        var BlBlob = window.Blob || window.WebkitBlob;
        blob = new BlBlob([buffer], { type: mime });
      }
      return blob;
    }
  }]);
  return ImgPreview;
}();

return ImgPreview;

})));
//# sourceMappingURL=img_preview.dev.js.map
