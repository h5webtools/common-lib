# 快速开始

## 安装

```shell
npm install @jyb/lib-img-preview --save
```

## 使用

### 引入

```javascript
import ImgPreview from '@jyb/lib-img-preview'
```

### 调用

```javascript
new ImgPreview(input.files, {
  callback(url, time, fileType) {
    console.log(url);
  }
});
```



