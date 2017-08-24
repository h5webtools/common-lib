<style lang="scss" scoped>
    @import "~@jyb/common-sass/import-lib-mixins-rem";
    // 设置1px边框
    $border-color: #e6e6e6;
    %border-top {
        @include elementBorder($border-color, before, top);
    }

    %border-bottom {
        @include elementBorder($border-color, after, bottom);
    }

    .pcr-wrap {
        position:relative;
        padding:0 .3rem;
        display: flex;
        font-size: .3rem;
        @extend %border-bottom;
        
        .chosen {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding: 0 .15rem;

            .text {
                position: relative;
                top: -1px;

                display: inline-block;
                border-bottom: 2px solid transparent;
                padding: 10px 0;                
            }

            &.cur .text {
                color: #f60;
                border-bottom-color: #f60;
            }
        }
    }

    .region-wrap {
        max-height: 6.5rem;
        overflow-y: scroll;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;

        position: relative;
        display: flex;
        height: 100%;
        transition: transform .3s ease;
        transform: translate3d(0px, 0px, 0px);        
        font-size: .3rem;

        .pcr-list {
            flex: 1;
            overflow-x: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;

            li {
                position: relative;
                padding: 15px .3rem;

                &.chosen {
                    color: #f60;
                    .checked-icon {
                        content: "";
                        margin-left: .3rem;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        width: .44rem;
                        height: .32rem;
                        background: url('./images/_checked.png') no-repeat 0 0;
                        background-size: 100% auto;
                    }
                }
            }
        }
    }

    .icon {
        display: inline-block;
        background-repeat: no-repeat;
        vertical-align: middle;
    }
</style>

<template>
<div>
    <div class="pcr-wrap">
        <div v-for="list, idx in lists"
            v-show="list && list.length !== 0"
            :class="{chosen: true, cur: currentShow === idx}"
            :style="{'max-width': pcrWidth}"            
            @click="togglePrcType(idx)">    
            <span class="text">{{ currentSelect[idx] && currentSelect[idx].name || '请选择' }}</span>
        </div>
    </div>
    <div class="region-wrap"
        ref="regionWrap"
        :style="{width:wrapWidth}">
        <ul class="pcr-list"                    
            v-for="list, idx in lists"
            :style="{width:innerWidth}">
            <li v-for="item, index in list"
                :key="item.id"
                :class="{ chosen : isCurrent(idx, item.id) }"
                @click="change(idx, item)">{{ item.name }}
                <i v-if="isCurrent(idx, item.id)" class="icon checked-icon"></i>
            </li>
        </ul>       
    </div>
</div>
</template>

<script>
import './images/_checked.png'
export default {
    name: 'cascade-list',
    props: {
        lists: {
            type: Array,
            required: true
        },
        maxLevel: {
            type: Number,
            required: true,
            default: 4,
        },
        preChosen: {
            type: Array,
        }
    },
    data () {
        return {
            currentSelect : this.preChosen && this.preChosen.slice()|| [],
            currentShow: 0,
            innerWidth: 0,
        }
    },
    computed: {
        wrapWidth: function () {
            return this.innerWidth * this.lists.length + 'px'
        },
        itemWidth: function () {
            return this.innerWidth + 'px'
        },
        pcrWidth: function () {
            return (100 / this.maxLevel) + '%'
        },
        shift: function () {
            return -this.currentShow * this.innerWidth
        }
    },
    watch: {
        lists(val) {            
            const newList = val[this.currentShow + 1]
            if (newList) {
                if (newList.length === 0) {
                    this.$emit('chosen-complete', this.currentSelect)
                }
                else {
                    this.currentShow += 1
                    this.reset()
                }
            }
            else {
                return 
            }
        },
        currentShow(val) {
            this.doAnim()
        }
    },
    methods: {
        reset() {
            for (let i = this.currentShow, len = this.currentSelect.length; i < len; i++) {
                this.currentSelect.splice(i, 1, null)
            }            
        },
        togglePrcType(idx) {
            this.currentShow = idx
        },
        isCurrent(idx, id) {
            if (!this.currentSelect[idx]) {
                return false
            }

            return this.currentSelect[idx].id === id
        },
        change(idx, item) {
            this.currentSelect.splice(idx, 1, item)
            if (idx === this.maxLevel -1) {
                this.$emit('chosen-complete', this.currentSelect)
            }
            else {
                this.$emit('nextLevel', idx, item.id)
            }
        },
        doAnim() {
            const el = this.$refs.regionWrap
            if (el) {
                el.style.webkitTransform = `translate3d(${this.shift}px, 0, 0)`
            }            
        }
    },
    created() {
        this.innerWidth = window.innerWidth
    }
}
</script>