
export function createElement(tagName, attributes) {
  const ele = document.createElement(tagName);
  for (const key in attributes) {
    ele.setAttribute(key, attributes[key]);
  }
  return ele;
}
export function getDis(el) {
  const pos = {
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
export function getTransparentPercent(ctx, width, height) {
  const imgData = ctx.getImageData(0, 0, width, height);
  const pixles = imgData.data;
  const transPixs = [];
  for (let i = 0, j = pixles.length; i < j; i += 4) {
    const a = pixles[i + 3];
    if (a < 128) {
      transPixs.push(i);
    }
  }
  return ((transPixs.length / (pixles.length / 4)) * 100).toFixed(2);
}
export function resizeCanvas(canvas, width, height) {
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d').clearRect(0, 0, width, height);
}
