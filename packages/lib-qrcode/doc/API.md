# API

```javascript
import QRCode from '@jyb/lib-qrcode'
```

## 初始化

### new QRCode(el, options);

```jsdoc
@param {HTMLElement|String} el target element or 'id' attribute of element.
@param {Object|String} vOption
@param {String} vOption.text QRCode link data
@param {Number} [vOption.width=256]
@param {Number} [vOption.height=256]
@param {String} [vOption.colorDark="#000000"]
@param {String} [vOption.colorLight="#ffffff"]
@param {Boolean} [vOption.useSVG=false]
@param {QRCode.CorrectLevel} [vOption.correctLevel=QRCode.CorrectLevel.H] [L|M|Q|H]
```

## 实例方法

### makeCode(text)

生成QRCode

```javascript
instance.makeCode('https://cc.com');
```

### clear()

清除QRCode

```javascript
instance.clear();
```
