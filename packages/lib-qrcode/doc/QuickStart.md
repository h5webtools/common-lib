# 快速开始

## 安装

```shell
npm install @jyb/lib-qrcode --save
```

## 例子

```html
<div id="qrcode"></div>
```

```javascript
import QRCode from '@jyb/lib-qrcode';

const qrcode = new QRCode(document.getElementById('qrcode'), {
	text: 'https://www.aa.com',
	width: 128,
	height: 128,
	colorDark : '#000000',
  colorLight : '#ffffff',
	correctLevel : QRCode.CorrectLevel.H // L/M/Q/H
});

qrcode.clear(); // clear the code.
qrcode.makeCode('https://bb.com'); // make another code.
```



