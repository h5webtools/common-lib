# 例子

## html

```html
<div class="page">1</div>
```

## css

```css
.page {
  width: 100vw;
  height: 100vh;
  line-height: 100vh;
  background-color: green;
  font-size: 50px;
  color: #fff;
  text-align: center;
}
```

## js

```javascript
new Elastic(document.querySelector('.page'), {
  onRelease: function() {
    console.log('Release');
  },
  onRecovery: function() {
    console.log('Recovery');
  }
});
```