# 快速开始

## 安装

```shell
npm install @jyb/lib-qcloud-upload --save
```

## 使用

### 引入

```javascript
import getUploadInstance from '@jyb/lib-qcloud-upload'
```

## 例子

```javascript
getQcloudSign().then(ret => {
  if (ret.code != 0) {
    EventBus.$emit('error', ret.msg);
    return;
  }
  
  let uploadInstance = getUploadInstance(ret.data);
}, { showLoading: false });

uploadInstance.createPreview(file, 0.65).then(ret => {
  return this.uploadInstance.doUpload(file, ret);
}).then((url) => {
  console.log(url);
}))
```

