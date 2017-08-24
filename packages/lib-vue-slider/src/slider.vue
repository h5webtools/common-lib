<style lang="scss">
    * {
        box-sizing: border-box;
    }

    .bn-slider {
        position: relative;
        width:7.5rem;
        background-color: #fff;
        overflow: hidden;
        height: 100%;
        // transform-style: preserve-3d;
    }

    .bn-slider-items-wrap {
        position: relative;
        z-index: 1;
        height: 6.3rem;
        -webkit-transition-timing-function: ease;
        transition-timing-function: ease;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        // transform-style: preserve-3d;
        will-change: transform;
    }

    .bn-slider-item {
        position: absolute;
        text-align: center;
        padding: .7rem 0;
        height:5.8rem;

        img {
            width: 5rem;
            // height: 100%;
            position: relative;
            border: 0;
            z-index: 100;
        }
    }

    .showDefault {
        &::before{
            background-image: url(./images/default-logo.png);
            width: 153px;
            height: 53px;
            background-size: 100% 100%;
            display: inline-block;
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            z-index: 0;
        }
    }

    .bn-slider-indicators {
        position: absolute;
        bottom: .2rem;
        left: 0;
        text-align: center;
        width: 100%;
        height: .15rem;
        font-size: 0;

        i {
            display: inline-block;
            width: .12rem;
            height: .12rem;
            -webkit-border-radius: 50%;
            border-radius: 50%;
            margin-left: .16rem;
            vertical-align: middle;
            background-color: rgba(0, 0, 0, .2);
            &.cur {
                background-color: #ff6e34;
            }

            &:first-child {
                margin-left: 0;
            }
        }
    }
</style>
<template>
    <div class="bn-slider">
        <div class="bn-slider-items-wrap"
            :style="wrapperStyle"
             v-on:transitionend.stop="onAnimEnd">
            <div :class="{ 'bn-slider-item': true, 'showDefault': !item.loaded}"
                v-for="item, idx in items"
                :key="item.id"
                v-on:touchstart.stop="onStart"
                v-on:touchmove.stop="onMove"
                v-on:touchend.stop="onEnd"
                >
                <lazy-img 
                    :src="item.src"
                    :href="item.href"
                    :loaded="item.loaded">
                </lazy-img>

            </div>
            <div class="bn-slider-item"
                v-if="loop"
                v-on:touchstart.stop="onStart"
                v-on:touchmove.stop="onMove"
                v-on:touchend.stop="onEnd"
                >
                <lazy-img 
                    :src="items[0] && items[0].src"
                    :href="items[0] && items[0].href"
                    :loaded=true>
                </lazy-img>
            </div>            
        </div>
        <div class="bn-slider-indicators"
             v-show="showIndicators">             
            <i  v-for="item,idx in items"
                :class="{ cur : isCur(idx) }"></i>
        </div>
    </div>
</template>
<script>
import './images/default-logo.png'
import LazyImg from './lazyImg.vue'

const LEFT  = 1
const RIGHT = 2
const noneFunc = function() {}
const preventDefault = function (e) {
    e.preventDefault()
}

export default {
    name: 'slider',
    components: { LazyImg },
    props: {
        items: {
            type: Array,
            required: true 
        },
        height: {
            type: String,
        },
        wrapHeight: {
            type: String,
        },
        preload: {
            type: Number,
            default : 0
        },        
        width: {
            type: String,
        },
        // imgWidth: {
        //     type: String,
        // },
        time: {
            type: Number,
            default: 300,
        },
        loop: {
            type: Boolean,
            default: false,
        },
        auto: {
            type: Boolean,
            default: false, 
        },
        interval: {
            type: Number,
            default: 3000,
        },
        onClick: {
            type: Function,
            default: noneFunc,
        }
    },    
    data() {
        return {
            isLockX : 0,
            current : 0,

            beginPos   : {
                x : null,
                y : null,
            },
            endPos : {
                x : null,
                y : null,
            },

            startTime: null,
            endTime: null,
            allowedTime: 300,

            wrapperStyle: {

            },

            tid   : null,
            reverse : false,

            options : {
                width: this.width,
                auto : this.auto,
            }
        }
    },
    computed: {
        move: function () {
            return  this.endPos.x - this.beginPos.x
        },
        elapsedTime: function () {
            return this.endTime - this.startTime 
        },
        offset: function () {
            return this.move + this.shift 
        },
        // 是否是往右移第一张图或者往左移最后一张
        isLimit: function () {
            return this.moveDir === LEFT && this.current === this.items.length - 1
                || this.moveDir === RIGHT && this.current === 0
        },
        rebound: function () {
            return Math.abs(this.move) < (this.options.width / 3)
                // || this.isLimit
        },
        moveDir: function () {
            return this.move < 0 ? LEFT : RIGHT
        },
        shift: function () {
            return -this.current * this.options.width 
        },
        showIndicators: function () {
            return this.items.length > 1
        },
        isSwipe: function() {
            return this.elapsedTime <= this.allowedTime 
        }
    },
    watch: {
        // current: function (newValue, oldValue) {
        //     const len = this.items.length            
        //     if (this.options.auto) {
        //         if (this.loop) {
        //             this.reverse = false 
        //         }
        //         else {
        //             if (newValue === len - 1) {
        //                 this.reverse = true 
        //             }
        //             else {
        //                 if (0 === newValue) {
        //                     this.reverse = false 
        //                 }
        //             }
        //         }
        //     }

        //     this.load(newValue)
        //     this.doAnim()
        //     this.$emit('change', newValue % len)
        // },
        items: function (newValue, oldValue) {
            this.load(0)            
            this.$nextTick(() => {
                this.init()
                this.current = 0 
            })
        },
    },
    methods: {
        isCur(idx) {
            return idx === this.current || (idx + this.items.length === this.current)
        },
        setEl() {
            const wrapper = this.$el
            const ul      = this.getListEl()
            const li      = ul.children[0]

            try {
                this.options.width  = this.options.width || document.documentElement.clientWidth//li.getBoundingClientRect().width
            } 
            catch (e) {
                this.options.width = document.documentElement.clientWidth
            }
            
            const width = this.options.width
            ul.style.width  = `${width * this.items.length}px`
            wrapper.style.width  = `${width}px`
            if (this.wrapHeight) {
                wrapper.style.height = this.wrapHeight 
            }

            Array.prototype.slice.call(ul.children) .forEach((i, idx) => {
                i.style.left  = `${idx * width}px`
                i.style.width = `${width}px`
                if (this.height) {
                    i.style.height = this.height
                }
            })

            this.doMove(0)       
        },
        getListEl () {
            return this.$el.children[0]
        },
        getCoordinate(e) {
            const touchObj = e.changedTouches[0]
            const {pageX : x, pageY : y} = touchObj
            return {x, y}
        },

        doMove(offset) {
            offset = typeof offset === 'undefined' ? this.offset : +offset
            this.wrapperStyle = {
                '-webkit-transition-duration' : '0ms',
                '-webkit-transform': `translate3d(${offset}px, 0, 0)`
            }

            // const ul = this.getListEl()

            
            // ul.style.webkitTransitionDuration = '0ms'
            // ul.style.webkitTransform = `translate3d(${offset}px, 0, 0)`
        },
        doAnim() {
            this.reset()
            // const ul = this.getListEl() 
            this.wrapperStyle = {
                '-webkit-transition-duration' : `${this.time}ms`,
                '-webkit-transform': `translate3d(${this.shift}px, 0, 0)`
            }


            // ul.style.webkitTransitionDuration = `${this.time}ms`
            // ul.style.webkitTransform = `translate3d(${this.shift}px, 0, 0)`            
        },
        onAnimEnd() {
            this.isLockX = false
            this.autoStart()
            this.resetStart()
        },
        doRebound() {
            if (Math.abs(this.move) > 0) {
                this.doAnim()
            }
            else {
                this.onAnimEnd()
            }
        },

        load(idx) {
            const _load = item => { 
                if (item && !item.loaded) {
                    item.loaded = true 
                }
            }

            for (let i = 0, len = this.preload + 1; i < len; i++) {
                _load(this.items[idx + i])
            }
        },
        prev() {
            this.jumpTo(this.current - 1)
        },
        next() {
            this.jumpTo(this.current + 1)
        },
        jumpTo(i) {
            const len = this.items.length
            if (this.loop && i === this.items.length) {
                // this.current = i
            }
            else {
                i = i < 0 ? len - 2 : (i >= len ? 1 : i)
            }

            this.current = i  
            if (this.options.auto) {
                if (this.loop) {
                    this.reverse = false 
                }
                else {
                    if (i === len - 1) {
                        this.reverse = true 
                    }
                    else {
                        if (0 === i) {
                            this.reverse = false 
                        }
                    }
                }
            }

            this.load(i)
            this.doAnim()
            this.$emit('change', i % len)                      
        },

        onStart(e) {            
            if (this.isLockX) {
                return 
            }

            clearTimeout(this.tid)
            this.startTime = Date.now()
            this.endTime = null
            this.beginPos = this.endPos = this.getCoordinate(e)
            this.isLockX = true

            document.documentElement.addEventListener('touchmove', preventDefault, false)            
        },
        onMove(e) {
            e.preventDefault()            
            this.endPos = this.getCoordinate(e)
            this.doMove()
        },
        onEnd(e) {
            if (!this.beginPos.x) {
                this.isLockX = false
                return 
            }
            
            document.documentElement.removeEventListener('touchmove', preventDefault, false)
            this.endTime = Date.now()
            this.endPos = this.getCoordinate(e)
            if (this.isLimit || (!this.isSwipe && this.rebound)) {
                this.doRebound()
            }
            else {
                this.moveDir === LEFT ?  this.next() : this.prev()
            }          
        },

        autoStart() {
            clearTimeout(this.tid)
            if (this.options.auto && this.items.length >= 3) {
                var action = this.reverse ? this.prev : this.next
                this.tid = setTimeout(() => {
                    action.call(this)
                }, this.interval)
            }
        },
        resetStart() {
            if (this.loop && this.current === this.items.length) {
                this.doMove(0)
            }
        },
        init() {    
            this.setEl()
            this.autoStart()                    
        },
        reset() {
            this.beginPos = {}
            this.endPost = {}             
        }
    },
    created() {
        this.load(0)
    },
    mounted() {
        this.init()
    },
    beforeDestroy() {
        clearTimeout(this.tid)        
    }
}
</script>

