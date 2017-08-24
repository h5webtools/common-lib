<style lang="scss" scoped>
    .switch {
        -webkit-appearance: none;
        background-color:transparent; 
        border-color:transparent;
        box-sizing: border-box;
        position: relative;
        width: .8rem;
        height: .46rem;
        border-radius: .46rem;
        outline: none;
        
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: .8rem;
            height: .46rem; 
            border-radius: .46rem;
            background-color: #ccc;
            transition: background-color .3s ease;            
            padding: 0.04rem;
        }
        &::after {
            content: '';
            position: absolute;
            top: .02rem;
            left: 0;
            width: .46rem;
            height: .45rem;
            border: 1px solid #ccc;
            border-radius: .45rem;
            background-color: #fff;
            transform: translateX(0.03rem);
            transition: transform .3s ease;
        }
        &:checked {
            &::after {
                border-color: #ff6e34;
                transform: translateX(.36rem);
            }
            &::before {
                background-color: #ff6e34;
            }
        }
    }
</style>

<template>
<input class="switch" 
    type="checkbox"
    v-model="value" 
    :disabled="disabled" 
    @click="toggle"/>
</template>

<script>
    export default {
        name: 'j-switch',
        props: {
            checked: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                value: this.checked,
            }
        },
        methods: {
            toggle() {
                this.$emit('update:checked', this.value)
            }
        }
    }
</script>