# 例子

## html

```html
<div id="container"></div>
```

## css

```css
#container {
  width: 320px;
}

#container img {
  width: 150px;
  height: 200px;
  margin-right: 10px;
}
```

## js

```javascript
var ct = document.getElementById('container');
var frag = document.createDocumentFragment();
var count = 30;

while (count > 0) {
  var img = document.createElement('img');

  img.setAttribute('src', 'i.jpg');
  img.setAttribute('data-lazy', 'https://img6.bdstatic.com/img/image/smallpic/weijuchiluntu.jpg');
  frag.appendChild(img);
  count--;
}

ct.appendChild(frag);
new ImgLazyload(ct));
```