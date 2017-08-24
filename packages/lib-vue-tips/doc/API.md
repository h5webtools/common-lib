# API

## 引入

```javascript
  import Tips from '@jyb/lib-vue-tips'
  import '@jyb/lib-vue-tips/dist/bundle.css'
  Vue.use(Tips)
```

## 使用说明

``` javascript
Vue.$showTips({
    msg: '',
    isLoading: false, 
    autoHide: true, 
    hideTime: 1200 
})
```

显示Loading
``` javascript
Vue.$showLoading({
    msg: '',
})
```

手动隐藏
``` javascript
Vue.$hideTips()
```

## API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :----| :---| :----| :-----| :------|
| msg| 显示的消息| String | | 无 |
| isLoading| 是否显示加载图标 | Boolean | | false |
| autoHide| 是否自动隐藏 | Boolean | | true | 
| hideTime | 自动隐藏时间 | Number | | 1200 |
```
