/**
 * preload
 */

function noop() {}

class Preload {
  constructor(lists = [], cb) {
    if (!Array.isArray(lists)) {
      throw new Error('lists必须为数组类型');
    }

    this.lists = lists;
    this.len = lists.length;
    this.cursor = 0;
    this.cb = cb || noop;
  }
  start() {
    this.lists.forEach((item) => {
      this.loadImg(item);
    });
  }
  reload() {
    this.cursor = 0;
    this.start();
  }
  loadImg(img) {
    const oImg = new Image();

    oImg.src = img;
    oImg.onload = this.onLoad.bind(this);
    oImg.onerror = this.onLoad.bind(this);
  }
  onLoad() {
    this.cursor++;
    if (this.cursor === this.len) {
      this.cb();
    }
  }
}

export default Preload;
