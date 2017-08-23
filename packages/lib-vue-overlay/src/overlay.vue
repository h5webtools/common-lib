<style lang="scss" scoped>
.bn-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: .4;
    z-index: 1000;
}

.overlay-fade-enter-active, .overlay-fade-leave-active {
    transition: opacity .4s;
}

.overlay-fade-enter, .overlay-fade-leave-active {
    opacity: 0 !important;
}

</style>

<template>
    <!-- <transition name="overlay-fade"> -->
        <div class="bn-overlay"
            v-if="show"
            @click="handleClick"
            :style="overlayStyle"
        ></div>
    <!-- </transition> -->
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        onClick: {
            type: Function,
        },
        opacity: {
            type: Number,
            default: 0.4,
        },
        color: {
            type: String,
            default: '#000'
        },
        zIndex: {
            type: Number,
        }
    },
    computed: {
        overlayStyle () {
            return {
                'opacity': this.opacity,
                'background-color': this.color,
                'z-index': this.zIndex,
            }
        }
    },
    methods: {
        handleClick () {
            this.onClick && this.onClick()
        }
    }
}
</script>