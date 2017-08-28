# 例子
```html
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Tips</title>
  <link rel="stylesheet" href="./index.css">
  <script type="text/javascript">
    (function(doc, win) {
      var basicWidth = window.basicWidth || 750;
      var minWidth = 320;
      var htmlElement = doc.documentElement;
      var recalc = function() {
        var clientWidth = htmlElement.clientWidth || (basicWidth / 2);
        clientWidth = clientWidth < minWidth ? minWidth : clientWidth;
        htmlElement.style.fontSize = 100 * (clientWidth / basicWidth) + 'px';
      };
      recalc();
      if (!win.addEventListener) return;
      win.addEventListener('resize', recalc, false);
    })(document, window);
</script>
  <style>
      button {
        font-size: 12px;
      }
  </style>
</head>

<body>
  <button id='btn-loading'>loading</button>
  <button id='btn-error'>Error</button>
  <script src="../dist/tips.js"></script>
</body>

</html>
```

```javascript
import tips from 'Tips'
const qs = document.querySelector.bind(document)
qs('#btn-loading').addEventListener('click', e => {
  tips.showLoading()
})

qs('#btn-error').addEventListener('click', e => {
  tips.showError('error')
})
```

```scss
$baseFontSize:100px;
@import '../../../../common-sass/import-lib-mixins-rem';
@import '../../../../common-sass/import-mod-loading-rem';
```