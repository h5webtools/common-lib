# API

## 引入

``` javascript
    import AttrList from '@jyb/lib-vue-attr-list'
    import '@jyb/lib-vue-attr-list/dist/bundle.css'
    Vue.component(AttrList.name, AttrList)
```

## 使用说明

``` html
<attr-list 
    :attrs="[]"
    :skus="{}"
    :preChose="{}"
    @chose-change="">
    >
</attr-list>
```

## API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :----| :---| :----| :-----| :------|
| attrs| 属性列表| Array | 无| 无 |
| skus| 所有sku | Object | | 无 |
| preChose| 默认选择的属性 | Object | | 无 |


## 事件
|事件名称|描述|参数|
|:----|:----|:----|
|chose-change|选择了一个完整sku|skuStr 选择的sku字符串|
