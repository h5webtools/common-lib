# 例子

## html

```html
<div id="container">
  <div id="content">1</div>
  <div class="placeholder"></div>
  <div id="content">2</div>
  <div class="placeholder"></div>
  <div id="content">3</div>
  <div class="placeholder"></div>
  <div id="content">4</div>
  <div class="placeholder"></div>
  <div id="content">5</div>
</div>
<button id="scroll-left" type="button">scrollLeft</button>
<button id="scroll-top" type="button">scrollTop</button>
```

## css

```css
html,
body {
  margin: 0;
  padding: 0;
}

#container {
  border: 1px solid #ccc;
  height: 300px;
  overflow: scroll;
  width: 300px;
}

#content {
  background-color: #ccc;
  width: 800px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}

.placeholder {
  height: 200px;
  background-color: #008000;
}
```

## js

```javascript
var sl = document.getElementById('scroll-left');
var st = document.getElementById('scroll-top');
var ct = document.getElementById('container');

sl.addEventListener('click', function() {
  scrollTo.left(ct, 100);
});

st.addEventListener('click', function() {
  scrollTo.top(ct, 100);
});
```