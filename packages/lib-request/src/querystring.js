
function stringify(object) {
  if (Object.prototype.toString.call(object) !== '[object Object]') return '';

  const args = [];
  for (const key in object) {
    destructure(key, object[key]);
  }

  return args.join('&');

  function destructure(key, value) {
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        destructure(`${key}[${i}]`, value[i]);
      }
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      for (const i in value) {
        destructure(`${key}[${i}]`, value[i]);
      }
    } else args.push(encodeURIComponent(key) + (value != null && value !== '' ? `=${encodeURIComponent(value)}` : ''));
  }
}

function parse(string) {
  if (string === '' || string == null) return {};
  if (string.charAt(0) === '?') string = string.slice(1);

  const entries = string.split('&');
  const data = {};
  const counters = {};
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i].split('=');
    const key = decodeURIComponent(entry[0]);
    let value = entry.length === 2 ? decodeURIComponent(entry[1]) : '';

    if (value === 'true') value = true;
    else if (value === 'false') value = false;

    const levels = key.split(/\]\[?|\[/);
    let cursor = data;
    if (key.indexOf('[') > -1) levels.pop();
    for (let j = 0; j < levels.length; j++) {
      let level = levels[j];
      const nextLevel = levels[j + 1];
      /* eslint eqeqeq:off */
      const isNumber = nextLevel == '' || !isNaN(parseInt(nextLevel, 10));
      const isValue = j === levels.length - 1;
      if (level === '') {
        const k = levels.slice(0, j).join();
        if (counters[k] == null) counters[k] = 0;
        level = counters[k]++;
      }
      if (cursor[level] == null) {
        const val = isNumber ? [] : {};
        cursor[level] = isValue ? value : val;
      }
      cursor = cursor[level];
    }
  }
  return data;
}

export default {
  stringify,
  parse
};
