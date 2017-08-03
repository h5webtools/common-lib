# 例子

## 页面元素

```html
<a id="default-dialog" class="btn-primary" href="javascript:;">dialog</a>
```

## 样式，lang=scss

```css
.mod-dialog {
  .overlay {
    background-color: #000;
    filter: alpha(opacity=60);
    opacity: 0.6;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 1024;
    -webkit-backface-visibility: hidden;
  }

  .dialog-wrap {
    border-radius: 3px;
    width: 90%;
    position: fixed;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 8888;
    overflow: hidden;
    font-size: 0.36rem;

    .dialog-head {
      background-color: #fff;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      text-align: center;
      position: relative;
      border-bottom: 1px solid #e6e6e6;
      color: #333;
    }

    .close-btn {
      width: 0.44rem;
      height: 0.44rem;
      position: absolute;
      right: 0.3rem;
      top: 50%;
      line-height: 0.44rem;
      transform: translateY(-50%);
      color: #FE8856;
      text-align: right;
    }

    .dialog-body {
      box-sizing: border-box;
      overflow: hidden;
      background-color: #fff;
      padding: .2rem;
    }

    .dialog-foot {
      display: flex;
      text-align: center;

      .dialog-btn {
        display: block;
        text-align: center;
        height: 0.8rem;
        line-height: 0.8rem;
        background-color: #fff;

        &:first-child {
          border-bottom-left-radius: 5px;
          border-right: 1px solid #e6e6e6;
        }

        &:last-child {
          border-bottom-right-radius: 5px;
        }
      }
    }
  }
}
```

## 调用

```javascript
import Dialog from '@jyb/lib-dialog'

const dialog = new Dialog({
    title: '标题', // 标题内容
    visible: false, // 默认显示
    showClose: true, // 是否显示close按钮
    content: '这是内容', // 显示的内容
    mask: true, // 是否显示mask
    btns: [{ // 按钮列表{text:"",callback:function(){},css:""}
      text: '确定',
      callback() {
        console.log('确定');
      }
    }, {
      text: '取消',
      callback() {
        console.log('取消');
      }
    }],
    onClose() {
      console.log('close');
    },
    onShow() {
      console.log('show');
    },
    onDispose() {
      console.log('dispose');
    }
  });
});

dialog.show();
```