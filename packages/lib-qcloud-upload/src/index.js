/* eslint-disable */

import CosCloud from 'cos-js-sdk-v4';
import extend from '@jyb/lib-extend';
import uuidv4 from 'uuid/v4';
import EXIF from 'exif-js';

function createObjectURL(file) {
  var url = null;
  if (window.createObjectURL != undefined) { // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) { // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }

  return url;
}

function revokeObjectURL(file) {
  var url = null;
  if (window.revokeObjectURL != undefined) { // basic
    url = window.revokeObjectURL(file);
  } else if (window.URL != undefined) { // mozilla(firefox)
    url = window.URL.revokeObjectURL(file);
  } else if (window.webkitURL != undefined) { // webkit or chrome
    url = window.webkitURL.revokeObjectURL(file);
  }

  return url;
}

function noop() {

}

class Upload {
  constructor(options) {
    this.options = {
      appid: '',
      bucket: '',
    };
    this.init(options);
  }

  compress(file, urlData, quantify = 1, ratio) {
    if (/^image/.test(file.type)) {
      return this.compressImage(file, urlData, quantify);
    }
    else {
      return urlData;
    }
  }

  compressImage(file, urlData, quantify = 1, ratio = 5) {
    const image = new Image();
    image.src = urlData;

    let Orientation = null;
    EXIF.getData(file, function () {
      Orientation = EXIF.getTag(this, 'Orientation');
    });

    return new Promise((resolve, reject) => {
      image.onload = function () {
        let iw = image.width;
        let ih = image.height;

        let cw, ch;

        // 大于400万像素，需要等比压缩到400万像素
        // iphone限制canvas最大400万像素画布

        // if ((ratio = iw * ih / 4000000) > 1) {
        //   ratio = Math.sqrt(ratio);
        // } else {
        //   ratio = 5;
        // }
        // console.log('>>>>', ratio)
        cw = parseInt(iw / ratio, 10);
        ch = parseInt(ih / ratio, 10);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = cw;
        canvas.height = ch;
        if (Orientation && Orientation != 1) {
          switch (Orientation) {
            case 6:     // 旋转90度
              canvas.width = ch;
              canvas.height = cw;
              ctx.rotate(Math.PI / 2);
              // (0,-imgHeight) 从旋转原理图那里获得的起始点
              ctx.drawImage(this, 0, -ch, cw, ch);
              break;
            case 3:     // 旋转180度
              ctx.rotate(Math.PI);
              ctx.drawImage(this, -cw, -ch, cw, ch);
              break;
            case 8:     // 旋转-90度
              canvas.width = ch;
              canvas.height = cw;
              ctx.rotate(3 * Math.PI / 2);
              ctx.drawImage(this, -cw, 0, cw, ch);
              break;
          }
        } else {
          ctx.drawImage(this, 0, 0, cw, ch);
        }

        resolve(canvas.toDataURL('image/jpeg', quantify));
      }

      image.onerror = function () {
        reject('加载图片失败');
      }
    })
  }

  createPreview(file, quantify = .6, ratio) {
    if (!file || !window.FileReader) return Promise.resolve();
    if (/^image/.test(file.type)) {
      let reader = new FileReader();
      reader.readAsDataURL(file);

      const that = this;
      return new Promise((resolve, reject) => {
        reader.onload = function () {
          resolve(that.compress(file, this.result, quantify, ratio));
        }

        reader.onerror = function () {
          reject(this.error.toString())
        }
      })
    } else if (/^video/.test(file.type)) {
      const url = createObjectURL(file);
      return Promise.resolve(url);
    }

    return Promise.resolve();
  }

  toBlob(data, type = 'image/jpeg') {
    data = data.split(',')[1];
    data = window.atob(data);
    const array = new Uint8Array(data.length);
    for (let i = 0, len = data.length; i < len; i++) {
      array[i] = data.charCodeAt(i);
    }

    Blob = window.Blob || window.WebkitBlob;
    return new Blob([array], { type });
  }

  doUpload(file, urlData, progressCallback) {
    if (!this.cos || !file) {
      return Promise.resolve();
    }

    const data = /^image/.test(file.type) ? this.toBlob(urlData, file.type) : file;
    return this.cosUpload(data, this.getFileName(file), progressCallback);
  }

  cosUpload(data, name, progressCallback = noop) {
    return new Promise((resolve, reject) => {
      this.cos.uploadFile((ret) => {
        if (ret.code == 0) {
          resolve(ret.data.source_url);
        } else {
          reject(ret.message);
        }
      }, ret => {
        if (ret != 'SUCCESS') {
          reject(ret.responseText);
        }
      }, progressCallback, this.options.bucket, name, data);
    })
  }

  getFileName(file) {
    return uuidv4() + file.name;
  }

  init(options) {
    extend(this.options, options)
    this.cos = new CosCloud({
      appid: this.options.appid,
      bucket: this.options.bucket,
      region: 'sh',
      getAppSign: (callback) => {//获取签名 必填参数
        callback(this.options.authorization);
      }
    })
  }

  destroy() {
    this.cos = null;
  }
}

export default (function () {
  const inst = null;
  return function (options) {
    if (inst) {
      return inst;
    }

    return new Upload(options);
  }
})();