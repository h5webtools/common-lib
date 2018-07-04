# API

```javascript
import getUploadInstance from '@jyb/lib-qcloud-upload'
```

## 初始化

### getUploadInstance(options);

```jsdoc
@param {Object} options
```

## 选项

### appid
- Type: `String`

从腾讯云申请的appid

### bucket
- Type: `String`

从腾讯云新建的bucket

### authorization
- Type: `String`

从后端获取到的签名

## 实例方法

### createPreview(file, quantify)

生成预览

返回Promise中的值为预览图数据

```javascript
instance.createPreview(file, quantify);
```

### doUpload(file, url)

返回Promise中的值为图片在腾讯云保存的url

开始上传

```javascript
instance.doUpload(file, url);
```
