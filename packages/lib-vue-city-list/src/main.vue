<style lang="scss" scope>
    .normal-title {        
        padding: 15px 0;
        text-align: center;
        color: #999;
    }

</style>
<template>
<popup :open="show"
    @close="$emit('close')">
    <div class="normal-title" slot='title'>选择所在地区</div>
    <cascade-list slot='content'        
        :lists="lists"
        :maxLevel=4
        :preChosen="chosenRegion"
        @nextLevel="getLevelData"
        @chosen-complete="onChosenComplete">
    </cascade-list>
</popup>
</template>

<script>
import Popup from '@jyb/lib-vue-popup'
// import Popup from '../../popup'
import CascadeList from './cascadeList.vue'
import Vue from 'vue'

Vue.component(Popup.name, Popup)
Vue.component(CascadeList.name, CascadeList)
export default {
    name: 'city-list',
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        lists: {
            type: Array,
            required: true
        },
        chosenRegion: {
            type: Array,
            default: [],
        }
    },
    methods: {
        getLevelData(level, id) {
            this.$emit('nextLevel', level, id)
        },
        onChosenComplete (chosen) {
            this.$emit('chosen-complete', chosen)
        }
    }
}
</script>