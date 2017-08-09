# API

```javascript
import ImgPreview from '@jyb/lib-img-preview'
```

## 初始化

### new ImgPreview(files, options);

## 选项

### files
- Type: `Array`
- Default: undefined

FileList object包含选择文件的信息

### options
- Type: `Object`
- Default: 

```javascript
const defaultOptions = {
  max: 8, //  最多多少张图片
  callback(url, time, fileType) {}, //  预览完成的回调函数（多张图调用多次）
  fileType: '' // 文件类型
};
```

