<template>
  <!-- <transition name="dialog-slide" @after-enter="show" @after-leave="hide">  -->
    <div ref="popup" v-if="open" class="dialog-wrap">
        <div v-if="title" class="dialog-title" :style="dialogTitleStyle">
            {{ title }}
            <span class="close-wrap" v-if="showClose" @click="close">&#10005;</span>
        </div>
        <div class="dialog-content">
            <slot name="content"></slot>
        </div>
        <div class="dialog-btn-wrap">
            <slot name="buttons"></slot>
        </div>
    </div>
 <!-- </transition> -->
</template>
<style lang="scss">
    @import '~@jyb/lib-vue-overlay/dist/bundle.scss';
    .dialog-wrap {
        position: absolute;
        top: 50%;
        left: 50%;

        width: 90%;
        transform: translateX(-50%) translateY(-50%);
        font-size: .3rem;
        border-radius: 3px;
        background-color: #fff;
    }

    .dialog-title {
        position: relative;
        padding: .2rem 0;
        text-align: center;
        color: #333;
        
        border-bottom: 1px solid #e6e6e6;
    }

    .close-wrap {
        position: absolute;
        top: 50%;
        right: .2rem;
        display: block;

        width: .6rem;
        height: .6rem;
        line-height: .6rem;
        transform: translateY(-50%);
        color: #999;
        text-align: center;
    }

    .dialog-content {
        box-sizing: border-box;
        background-color: #fff;
    }

    .dialog-btn-wrap {
        text-align: center;
        display: -webkit-box;
        -webkit-box-align: center;
        -webkit-box-pack: justify;
        border-top: 1px solid #e6e6e6;        
    }

    .dialog-btn {
        display: block;
        text-align: center;
        -webkit-box-flex: 1;
        width: 0;
        height: .8rem;
        line-height: .8rem;
        background-color: #fff;

        &.btn-strong {
            color: #f60;
        }

        &:first-child {
            border-bottom-left-radius: 5px;
            border-right: 1px solid #e6e6e6;
        }

        &:last-child {
            border-bottom-right-radius: 5px;
        }
    }
</style>
<script>
import PopMixin from '@jyb/lib-vue-overlay'
const NONEFUNC = function() {}
export default {
    name: 'common-dialog',
    mixins: [ PopMixin ],
    props: {
        title: {
            type: String,
            default: '',
        },
        showClose: {
            type: Boolean,
            default: false,
        },
        titleBorder: {
            type: Boolean,
            default: true
        },
        titleStyle: {
            type: Object,
            default: () => ({}),
        }
    },
    computed: {
        dialogTitleStyle() {
            const style = {}
            for (let i in this.titleStyle) {
                if (this.titleStyle.hasOwnProperty(i)) {
                    style[i] = this.titleStyle[i]
                }
            }

            if (!this.titleBorder) {
                style['borderBottom'] = 'none'
            }

            return style
        }
    },
    methods: {
        close: function () {
            this.$emit('update:open', false)
        },
        show: function (target) {
            this.$emit('show', target)
        },
        hide: function (target) {
            this.$emit('hide', target)
        }
    }
}
</script>