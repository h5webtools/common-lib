export const createElement = (function () {
  const container = document.createElement('div');
  return function (html) {
    container.innerHTML = html;
    return container.children[0];
  };
}());

export default {
  createElement
};
