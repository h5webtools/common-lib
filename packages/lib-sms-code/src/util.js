
export function normalizeElement(el) {
  if (typeof el === 'string') return document.querySelector(el);
  return el;
}

export function ajaxPost(opt, success, error) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    const ptr = setTimeout(() => {
      if (xhr.readyState !== 4) {
        error && error(405);
        xhr.abort();
      }
    }, opt.timeout || 50000);

    if (xhr.readyState === 4) {
      clearTimeout(ptr);
      if (xhr.status === 200) {
        let result = null;
        try {
          result = JSON.parse(xhr.responseText);
          success.call(xhr, result);
        } catch (e) {
          error && error(e);
        }
      } else {
        error && error.apply(xhr, [xhr.status, xhr.responseText]);
      }
    }
  };
  xhr.open('POST', opt.url);
  xhr.withCredentials = false;
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(JSON.stringify(opt.data));
}

export function addCssText(cssText) {
  const styleEl = document.createElement('style');
  document.getElementsByTagName('head')[0].appendChild(styleEl);
  if (styleEl.styleSheet) {
    if (!styleEl.styleSheet.disabled) {
      styleEl.styleSheet.cssText = cssText;
    }
  } else {
    try {
      styleEl.innerHTML = cssText;
    } catch (e) {
      styleEl.innerText = cssText;
    }
  }
}
