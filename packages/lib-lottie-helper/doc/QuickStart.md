# 快速开始

## 安装

```shell
npm install @jyb/lib-lottie-helper --save
```

## 使用

### 引入

```javascript
import LottieHelper from '@jyb/lib-lottie-helper'
```

## 例子


```javascript
import img_0 from 'assets/anim/loading/images/img_0.png';
import img_1 from 'assets/anim/loading/images/img_1.png';
import data from 'assets/anim/loading/data.json';

const map = {
  'image_0': img_0,
  'image_1': img_1,
};

new LottieHelper({ assetsMap: map, data }).getAnimData();
```




