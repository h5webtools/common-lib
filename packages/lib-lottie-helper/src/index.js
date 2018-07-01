/**
 * lib
 */

class LottieHelper {
  constructor(options) {
    this.options = options || {};
    this.init();
  }

  init() {
    const { data, assetsMap } = this.options;
    data.assets.forEach((i) => {
      i.u = '';
      i.p = assetsMap[i.id];
    });
  }

  getAnimData() {
    return this.options.data;
  }
}

export default LottieHelper;
