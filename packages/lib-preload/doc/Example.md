# 例子

### html

```html
<a id="reload" href="javascript:;">reload</a>
```

### javascript

```javascript
const oReload = document.getElementById('reload');
const preload = new Preload([
  'https://cdn.jyblife.com/static/style/app/publish/img/nocard/logo.png'
], () => {
  console.log('loaded');
});
preload.start();

oReload.addEventListener('click', () => {
  preload.reload();
});
```
