<style lang="scss" scoped>
    @import "~@jyb/common-sass/import-lib-mixins-rem";
    @import "~@jyb/lib-vue-popup/dist/bundle.css";
    // 设置1px边框
    $border-color: #e6e6e6;
    %border-top {
        @include elementBorder($border-color, before, top);
    }

    %border-bottom {
        @include elementBorder($border-color, after, bottom);
    }

    .title {
        font-size: 15px;
        text-align: center;
    }

    .normal-title {
        padding:15px 0;
        text-align: center;
        @extend %border-bottom;
    }

    .content {
        height: 6.5rem;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .icon {
        display: inline-block;
        background-repeat: no-repeat;
        vertical-align: middle;
    }

    .address-item {
        position: relative;
        padding: 15px .8rem 15px .3rem;
        @extend %border-bottom;

        .checked-icon {
            position: absolute;
        }
        
        &.chosen {
            color: #f60;

            .checked-icon {
                content: "";
                width: .44rem;
                height: .32rem;
                margin-left: .3rem;

                position: absolute;
                top: 50%;
                right: .3rem;
                transform: translateY(-50%);
                background: url('./images/_checked.png') 0 0 no-repeat;
                background-size: 100% auto;
            }
        }
    }

    .add-more-addr {
        text-align: center;
        color: #ccc;
    }

    .mod-address-plus {
        width: .4rem;
        height: .4rem;
        position: relative;
        top: -2px;
        margin-right: .1rem;

        &.gray {
            background: url('./images/_address_add_gray.png') no-repeat 0 0;
            background-size: 100% auto;
        }
    }

    .fn-button {
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        
        position: absolute;
        top: 0;
        color: #999;
        font-size: 0;
        text-align: center;

        &.back {
            left: 0;
        }

        span {
            font-size: 15px;
            color: #999;
        }
    }

    .address-content {
        height: 6.5rem;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        overflow-x: hidden;        
    }
</style>

<template>
<div>
    <popup
        :open="show"
        @close="$emit('close')">
        <template slot="title">
            <div v-if="full" class="fn-button back">
                <span @click="manageAddressList">管理</span>
            </div>
            <div class="normal-title">配送至</div>
        </template>
        <div slot="content" class="address-content">
            <div :class="{'address-item': true, chosen: currentInfoId == addr.info_id }" 
                v-for="addr, index in infoList" 
                key="addr.info_id"
                @click="choseAddress(addr.info_id)">
                <p v-if="full">
                    {{ addr.name }}
                    <span class="ui-pl-20">&nbsp;&nbsp;&nbsp;&nbsp;{{ addr.tel }}</span>
                </p>    
                <p>{{ addr.fullAddress }}</p>
                <i class="icon checked-icon"></i>
            </div>
            <div v-if="full" 
                class="address-item add-more-addr"
                @click="addMoreAddress">
                <span class="icon mod-address-plus gray"></span>新增收货地址
            </div> 
            <div v-else 
                class="address-item add-more-addr"
                @click="addOtherAddress"
                >
                <span class="icon mod-address-plus gray"></span>填写其他地址
            </div>
        </div>
    </popup>
</div>
</template>

<script>
import Popup from '@jyb/lib-vue-popup'
import './images/_address_add_gray.png'
import './images/_checked.png'

export default {
    name: 'addr-list',
    components: {
        Popup
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        full: {
            type: Boolean,
            default: false
        },
        infoList: {
            type: Array,
            default: () => [],
        },
        currentInfoId: {
            type: [String, Number],
        },
        debug: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        close() {
            this.debug && alert('trigger event close')
            this.$emit('close')
        },
        manageAddressList() {
            this.debug && alert('trigger event manageAddressList')
            this.$emit('manageAddressList')
        },
        choseAddress(infoId) {
            this.debug && alert('trigger event choseAddress ' + infoId)
            this.$emit('choseAddress', infoId)
        },
        addMoreAddress() {
            this.debug && alert('trigger event addMoreAddress')
            this.$emit('addMoreAddress')
        },
        addOtherAddress() {
            this.debug && alert('trigger event addOtherAddress')
            this.$emit('addOtherAddress')
        }
    }
}
</script>