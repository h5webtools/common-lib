# API

## 引入

```javascript
    import CommonDialog from '@jyb/lib-vue-dialog';
    import '@jyb/lib-vue-dialog/dist/bundle.css';
    Vue.component{CommonDialog.name, CommonDialog};
```

## 使用说明

``` html
<common-dialog 
    :open="false"
    :title="标题"
    :showClose="true"
    @close="closeDialog"
    >
    <p slot="content" style="text-align:center;">我是内容</p>
    <template slot="buttons">
    <span class="dialog-btn" @click="confirm">确认</span>
    <span class="dialog-btn" @click="cancel">取消</span>
    </template>
</common-dialog>
```

## API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :----| :---| :----| :-----| :------|
| open| 是否显示| Boolean | | false |
| overlay| 是否显示遮罩层 | Boolean | | true |
| overlayOpacity| 遮罩层透明度 | Number | | 0.4 | 
| overlayColor | 遮罩层颜色 | String | | #000 |
| title| 对话框标题 | String | | 无 |
| showClose| 是否显示关闭按钮 | Boolean | | true |
| titleStyle| 标题样式 | Object | | {} |


## 事件

点击遮罩层和关闭按钮触发事件 close

对话框显示动画执行完毕触发事件 show

对话框消失动画执行完毕触发事件 hide
