<style lang="scss" scoped>
@import "~@jyb/common-sass/import-lib-mixins-rem";

.mod-minus-plus-group {
    display: inline-block;
    height: .6rem;
    line-height: .6rem;
    font-size: 0;
    text-align: center;
    position: relative;
    @include setRounded1pxBorder(#999, after);
    &:after {
        @include rounded(4px);
    }

    .tap-btn {
        background-color: #fff;
        display: inherit;
        color: #999;
        font-size: .4rem;
        width: .8rem;
        height: 100%;
        vertical-align: middle;
        color: #999;
        font-size: 0;
        position: relative;
        &.highlight {
            .minus-icon, .plus-icon:before, .plus-icon:after  {
                background-color: #333;
            }
        }

        &.minus {
            @include elementBorder(#999, after, right);
        }

        &.plus {
            @include elementBorder(#999, after, left);
        }
    }

    .minus-icon {
        background-color:#999999;
        border-radius: 3px;
        width: .28rem;
        height: .04rem;
        display: inline-block;
        vertical-align: middle;
    }

    .plus-icon:before, .plus-icon:after{
        content:''; 
        height: 0.04rem; 
        width: .28rem; 
        display:block; 
        background:#999; 
        @include rounded(10px);
        position:absolute; 
        top: 50%; 
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .plus-icon:after{
        height: .28rem; 
        width: 0.03rem; 
    }

    .number-input {
        @include appearance(none);
        outline: none;
        border: 0;
        width: .9rem;
        height: 100%;
        font-size: .3rem;
        vertical-align: middle;
        text-align: center;
        border-radius: 0;
    }
}
</style>

<template>
    <div class="mod-minus-plus-group">
        <span @click="decr" class="tap-btn minus"><i class="minus-icon"></i></span>
        <input :value="num" readonly class="number-input" type="tel" />
        <span @click="incr" class="tap-btn plus"><i class="plus-icon"></i></span>
    </div>
</template>

<script>
export default {
    name: 'num-input',
    props: {
        min: {
            type: Number,
            default: 1,
        },
        max: {
            type: Number,
            default: 1,
        },
        num: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            val : this.num
        }
    },
    watch : {
        val(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.$emit('update:num', newVal)
            }
        }
    },
    methods: {
        incr() {
            let val = this.num + 1
            this.val = Math.min(this.max, val)
        },
        decr() {
            let val = this.num - 1
            this.val = Math.max(this.min, val)
        }
    }
}
</script>