/**
 * 图片预览
 */

// 默认配置
const defaultOptions = {
  max: 8,
  callback() {},
  fileType: ''
};

class ImgPreview {
  /**
   * 图片预览对象，每次上传都需要new FilePreview
   * @param {Array} files 上传的图片对象
   * @param {Object} options 选项
   * @param {String} options.fileType 文件类型
   * @param {Function} options.callback 预览完成的回调函数（多张图调用多次）
   * @param {Number} options.max 最多多少张图片
   **/
  constructor(files, options = {}) {
    this.files = files;
    this.options = Object.assign({}, defaultOptions, options);

    if (!files) {
      throw new Error('files参数不能为空');
    }
    this.collectFiles();
  }

  /**
   * 处理图片
   */
  collectFiles() {
    let count = this.files.length;
    const options = this.options;

    count = count <= options.max ? count : options.max;
    for (let i = 0; i < count; i++) {
      const file = this.files[i];

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
  previewImage(file, index) {
    const options = this.options;
    const time = +new Date() + String(index);
    let url = null;

    if (window.createObjectURL !== undefined) { // basic
      url = window.createObjectURL(file);
    } else if (window.URL !== undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) { // webkit or chrome
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
  compressImage(url, imageNode, scale = 5, quantify = 0.8) {
    // 释放内存
    this.revokeObject(url);
    const imageWidth = imageNode.naturalWidth;
    const imageHeight = imageNode.naturalHeight;
    const targetWidth = parseInt(imageWidth / scale, 10);
    const targetHeight = parseInt(imageHeight / scale, 10);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

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
  revokeObject(url) {
    if (window.revokeObjectURL !== undefined) { // basic
      window.revokeObjectURL(url);
    } else if (window.URL !== undefined) { // mozilla(firefox)
      window.URL.revokeObjectURL(url);
    } else if (window.webkitURL !== undefined) { // webkit or chrome
      window.webkitURL.revokeObjectURL(url);
    }
  }

  /**
   * 将以base64的图片url数据转换为Blob，用url方式表示的base64图片数据
   * @param {String} dataurl
   */
  static convertBase64UrlToBlob(dataurl) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1]; // 获取base64中的miie类型
    const text = atob(arr[1]); // 将base64转换为字符串
    let len = text.length;
    const buffer = new Uint8Array(len);

    while (len--) {
      buffer[len] = text.charCodeAt(len);
    }

    const BlBuilder = window.BlobBuilder || window.WebKitBlobBuilder;
    let blob;

    if (BlBuilder) {
      const builder = new BlBuilder();
      builder.append(buffer);
      blob = builder.getBlob(mime);
    } else {
      const BlBlob = window.Blob || window.WebkitBlob;
      blob = new BlBlob([buffer], { type: mime });
    }
    return blob;
  }
}

export default ImgPreview;
