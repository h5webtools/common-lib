<style lang="scss" scoped>
    @import "~@jyb/common-sass/import-lib-mixins-rem";
    // 设置1px边框
    $border-color: #e6e6e6;
    %border-bottom {
        @include elementBorder($border-color, after, bottom);
    }

    .mod-addresslist-item {
        background-color: #fff;
        margin-top: .2rem;
        font-size: .3rem;

        .address-detail {
            padding-top: 20px;
            padding-bottom: 20px;
            position: relative;
            margin-left: .3rem;
            @extend %border-bottom;
        }
        
        &:first-child {
            margin-top: 0;
        }

        .mod-addresslist-item .address-detail {
            padding-top: 20px;
            padding-bottom: 20px;
            position: relative;
            margin-left: .3rem;
        }

        .fulladdress {
            font-size: .26rem;
        }

        .mod-info-line {
            line-height: 1;
            padding-left: 0;
            background-color: #fff;
            position: relative;

            .info-item {                
                position: relative;
                width: 100%;
                display: -webkit-box;
                -webkit-box-pack: justify;
                -webkit-box-align: center;
                padding: 18px 0;
                padding-left: .3rem;
            }
        }

        .icon-wrap {
            min-width: 1.5rem;
            display: inline-block;
            vertical-align: middle;
            display: inline-block;
            background-repeat: no-repeat;
            vertical-align: middle;
        }

        .icon {
            width: .4rem;
            height: .4rem;
            top: -2px;
            position: relative; 
            display: inline-block;
            vertical-align: middle;                       
        }

        .edit-icon {
            background: url('./images/_edit_address.png') no-repeat;
            background-size: 100% auto;
        }

        .default-icon {
            background: url('./images/_address_unchecked.png') no-repeat;
            background-size: 100% auto;
        }

        .checked .default-icon {
            background: url('./images/_address_checked.png') no-repeat;
            background-size: 100% auto;
        }

        .delete-icon {
            background: url('./images/_del_address.png') no-repeat;
            background-size: 100% auto;
        }
    }

    .mod-info-line .info-item {
        .desc-left, label {
            display: block;
            width: 25%;
            position: relative;
        }

        .desc-right {
            text-align: right;
            -webkit-box-flex: 1;
            padding-right: .3rem;
        }
    } 

    .mod-addresslist-item .icon-wrap {
        min-width: 1.5rem;
        display: inline-block;
        vertical-align: middle;
    }

    .color-333 {
        color: #333;
    }

    .color-888 {
        color: #888;
    }
</style>

<template>
<div class="mod-addresslist-item f-30">
    <div class="address-detail">
        <p class="color-333">收货人：{{name}}  <span class="ui-pl-20">{{tel}}</span></p>
        <p class="color-888 f-26 fulladdress">{{ fullAddress }}</p>
    </div>
    <div class="mod-info-line">
        <div class="info-item">
            <div class="desc-left">
                <span :class="{ 'icon-wrap': true, checked: checked }"
                      @click="$emit('clickSet', info_id)"><i class="default-icon icon"></i> 默认地址</span>
            </div>
            <div class="desc-right ui-ta-r">
                <span class="icon-wrap" @click="$emit('clickEdit')" ><i class="edit-icon icon"></i>编辑</span>
                <span class="icon-wrap" @click="$emit('clickDel')" ><i class="delete-icon icon"></i>删除</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import './images/_edit_address.png'
import './images/_address_unchecked.png'
import './images/_address_checked.png'
import './images/_del_address.png'

export default {
    name: 'baina-address-item',
    props: {
        name: {
            type: String
        },
        tel: {
            type: String,
        },
        fullAddress: {
            type: String,
        },
        checked: {
            type: Boolean,
            default: false,
        },
        info_id: {
            type: String,
            required: true 
        }
    },
    // computed: {
    //     checked() {
    //         return this.default == 1
    //     }
    // }
}
</script>

