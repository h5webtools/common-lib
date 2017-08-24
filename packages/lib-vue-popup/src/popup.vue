<style lang="scss" scoped>
@import '~@jyb/lib-vue-overlay/dist/bundle.css';
.popup-wrap {
    position: fixed;
    bottom: 0;
    left: 0;

    width: 100%;
    transform:translate3d(0, 0, 0);
    backface-visibility: hidden;
    background: #fff;
}

.popup-slide-enter-active, .popup-slide-leave-active {
    transition: transform .3s ease;
}

.popup-slide-enter,
.popup-slide-leave-active {
    transform:translate3d(0, 100%, 0)
}

.popup-wrap .title {
    position: relative;
    font-size: 15px;

    .fn-button {
        width: 1rem;
        height: 1rem;
        line-height: 1rem;

        position: absolute;
        top: 0;
        color: #999;
        font-size: 0;
        text-align: center;

        &.close {
            right: 0;
            &::after {
                display: inline-block;
                background-repeat: no-repeat;
                vertical-align: middle;

                content: "";
                width: .4rem;
                height: .4rem;

                background: url('./images/_close.png') no-repeat 0 0;
                background-size: 100% auto;
            }
        }
    }
}

.popup-wrap .content {
    font-size: 15px;
    // max-height: 6.5rem;
    // overflow-y: scroll;
    // overflow-x: hidden;
    // -webkit-overflow-scrolling: touch;
}

.popup-wrap .footer {
    position: relative;
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: justify;
}

.border-bottom-1 {
    position: absolute;
    top:0;
    left:0;
    right:0;

    content: "";
    height: 0;
    display: block;
    border-bottom: 1px solid #e6e6e6;
}
</style>

<template>
<transition name="popup-slide">
    <div ref="popup" v-if="open" class='popup-wrap'>
        <div class="title">
            <slot name="title"></slot>
            <div v-if="showClose" class="fn-button close" @click="$emit('close')"/>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
        <div class="footer">
            <slot name="footer"></slot>
        </div>        
    </div>
</transition>
</template>

<script>
import PopMixin from '@jyb/lib-vue-overlay'
import img from './images/_close.png'

export default {
    name: 'popup',
    mixins: [ PopMixin ], 
    props: {
        showClose: {
            type: Boolean,
            default: true
        }
    }
}
</script>
