# API

```javascript
import Popup from '@jyb/lib-vue-popup'
Vue.component(Popup.name, Popup)
```

### 使用说明

``` html
    <popup 
      :open="isShowPopup"
      @close="isShowPopup=false"
    >
      <div slot="title">浮层标题</div>
      <div slot="content">浮层内容</div>
      <div slot="bottom">浮层底部</div>
    </popup>
```

### API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :----| :---| :----| :-----| :------|
| open| 是否显示| Boolean | | false |
| overlay| 是否显示遮罩层 | Boolean | | true |
| overlayOpacity| 遮罩层透明度 | Number | | 0.4 | 
| overlayColor | 遮罩层颜色 | String | | #000 |
| showClose| 是否显示关闭按钮 | Boolean | | true | 

### Slot
| name | 描述 |
| :----| :----|
| title | 浮层标题部分 |
| content | 浮层内容部分 | 
| footer| 浮层底部部分 | 

### 事件

点击遮罩层触发事件 close
