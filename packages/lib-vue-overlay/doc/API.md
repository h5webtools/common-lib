# API

```javascript
import PopMixin from 'lib-vue-overlay'

new Vue({
    mixins: [ PopMixin ]
})
```

## 选项

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :----| :---| :----| :-----| :------|
| open|是否显示组件，显示的逻辑要在组件中控制| Boolean | | false |
| overlay| 是否显示遮罩层 | Boolean | | true |
| overlayOpacity| 遮罩层透明度 | Number | | 0.4 | 
| overlayColor | 遮罩层颜色 | String | | #000 |


#### 事件

点击遮罩层触发事件 close
