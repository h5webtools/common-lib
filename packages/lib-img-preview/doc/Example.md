# 例子

## html

```html
<div class="img-upload-wrap">
  <a href="javascript:;" class="upload">
    <input type="file" id="input" accept="image/*" multiple>点击上传文件
  </a>
</div>
<div class="preview"></div>
```

## scss

```css
.upload {
  position: relative;
  display: inline-block;
  padding: 4px 10px;
  color: #888;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  text-decoration: none;
  font-size: 14px;

  input {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
    font-size: 50px;
    cursor: pointer;
  }
}

.preview img {
  width: 160px;
}
```

## js

```javascript
var input = document.getElementById('input');
var preview = document.querySelector('.preview');

input.addEventListener('change', function() {
  preview.innerHTML = '';
  new ImgPreview(input.files, {
    callback(url, time, fileType) {
      var img = document.createElement('img');
      img.src = url;
      preview.appendChild(img);
    }
  });
});
```