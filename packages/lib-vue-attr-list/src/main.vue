<style lang="scss" scoped>
    @import '~@jyb/common-sass/import-lib-mixins-rem';
    // 设置1px边框
    $border-color: #999;
    %border {
        @include setRounded1pxBorder($border-color, after);
    }

    li {
        margin:0;
        padding:0;
    }

    p {
      margin: 0;
      font-size: 13px;
      color: #333;
      margin-top: .2rem;  
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    .chose-list {
        margin-left: -.3rem;

        li {
            @extend %border;
            font-size: 13px;
            color: #333;
            min-width: 1.4rem;
            padding: 5px .15rem;
            border-radius: 4px;
            text-align: center;
            float: left;
            position: relative;
            margin-left: .3rem;
            margin-top: .2rem;
            margin-bottom: 2px;
            box-sizing: border-box;
            &:after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;    
                border-radius: 4px;            
            }

            &.cur {
                color: #ff6e34;
                &:after {
                    border-color: #ff6e34;
                }
            }

            &.disabled {
                color: #ccc;
                &:after {
                    border-color: #999;
                    border-style: dashed;
                }
            }
        }
    }
</style>

<template>
<div>
    <template v-for="attr in attrs">
        <p>{{ attr && attr.name }}</p>

        <ul class="chose-list" v-if="attr.attr">
            <li v-for="a in attr.attr" 
                :key="a.item_id"
                :class="{ cur: isCurrent(attr.code, a.item_id), disabled: isDisabled(attr.code, a.item_id)}"
                @click="toggleSelect(attr.code, a.item_id)">{{ a.value }}</li>
        </ul>
    </template>
</div>
</template>

<script>
    const delimiter = ';'

    export default {
        name: 'attr-list',
        props: {
            attrs: {
                type: Array,
                required: true,
            },
            skus: {
                type: Object,
                required: true
            },
            preChose: {
                type: String,
            }
        },
        data() {
            return {
                chose: {}
            }
        },
        computed: {
            defaultChose() {
                return this.attrs.reduce((p, c) => {
                    const select = c.attr && c.attr.filter(i => i.default)[0]
                    p[c.code] = select && select.item_id
                    return p 
                }, {})
            },
            avaiableMap() {
                return Object
                    .keys(this.skus)
                    .filter(k => this.skus[k].sale_status == 1)
                    .reduce((p, c) => {
                        const sku = this.skus[c]
                        this.powerset(c.split(delimiter).filter(i => i))
                            .forEach(i => {                          
                                const key = this.wrapKey(i.join(delimiter))
                                if (p[key]) {
                                    p[key] += this.parseStock(sku.stock)
                                }
                                else {
                                    p[key] = this.parseStock(sku.stock)
                                }                                         
                            })

                        return p 
                    }, {})
            }
        },
        watch: {
            chose(val) {
                Object.keys(val).forEach(k => {
                    const value = val[k]
                    if (this.isCurrent(k, value) && this.isDisabled(k, value)) {
                        val[k] = null
                    }
                })
            }
        },
        created() {
            this.chose = this.getPreChose() || this.defaultChose
        },
        methods: {
            isAllChose() {
                return this.attrs.every(i => this.chose[i.code])
            }
            ,
            isCurrent(code, itemId) {
                return this.chose[code] && this.chose[code] == itemId 
            },
            isDisabled(code, itemId) {
                const str = this.getChoseStr(code, itemId)
                return !this.avaiableMap[str] || this.avaiableMap[str] <= 0
            },
            toggleSelect(code, itemId) {
                if (this.isDisabled(code, itemId)) {
                    return 
                }

                if (this.isCurrent(code, itemId)) {
                    this.chose[code] = ''
                } 
                else {
                    this.chose[code] = itemId
                }
                
                if (this.isAllChose()) {
                    this.$emit('chose-change', this.getChoseStr(), this.getChoseValue())
                }                
            },
            powerset(arr) {
                const ret = [[]]
                arr.forEach((i, idx) => {
                    for (let j = 0, len = ret.length; j < len; j++) {
                        ret.push(ret[j].concat(i))
                    }
                })

                return ret 
            },
            wrapKey(key) {
                return `${delimiter}${key}${delimiter}`
            },
            parseStock(stock) {
                if (stock == -1) {
                    return Infinity
                }

                return stock 
            },
            getChoseStr(code, itemId) {
                const choseArr = this.attrs.map(i => {
                    if (i.code == code) {
                        return itemId 
                    }

                    return this.chose[i.code]
                }).filter(i => i)

                return this.wrapKey(choseArr.join(delimiter))
            },
            getChoseValue() {
                return this.attrs.map(i => {
                    const attr = i.attr.filter(a => this.chose[i.code] == a.item_id)[0]
                    return attr && attr.value
                }).join(' ')
            },
            getPreChose() {
                if (!this.preChose) {
                    return 
                }

                const choseArr = this.preChose.split(delimiter).filter(i => i)
                return this.attrs.reduce((p, c, idx) => {
                    p[c.code] = choseArr[idx]
                    return p
                }, {})
            }
        }
    }
</script>