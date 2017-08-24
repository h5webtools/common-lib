<style lang="scss">
    .coupons-head {
        font-size: .34rem;
        text-align: center;
        padding: .2rem 0;
        color: #333;
        border-bottom: 1px solid #b2b2b2;
        &::after {
            content: "";
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAjFJREFUWAm92M9KwzAcB/A1nZchKDupTyA+iX+OkzGvQrcd3fAxZODJ0bOgVAVBvHjwIfQZdrNPsH9+f6MZ3br8bbJAbBPT/D5L2qQ0SJJkN03T+yAIGpVKZYRjr9PpfOHce4rj+Gw2mw0Q6AD5BbFvGGFQuJ7P53vIJ2jwiYaE85oQo4VYH4h5jLyPHCHggGUjkw9enU6nzz5RGeYRiDAfGOUGQ8UoX5mde0OJMFncEY1QD4XJNlAyDBzjMAz7jG5gFK58o1QYGJpRFH0HfGSGw+El5vAJ5Sqvyx0n0Lfa7fZbrk77VAeDgXmnDpcgKvhAmWAKINcoU8xGkCuUDUYIKouyxUhBtqgyGCXIFFUWowXSRaHdDvamwnawCIJFj9YZ/mhTnSitPPaiRlSvWhIQMFjfm+g6VGtjFu3pj25SoArdmGKoA+0R4tF0UTYYKxBdpELZYqhvev0wToyxKoIKRxf3Ev175V1HN4iwU1EHskd77RqrDdkIZIDhNmOU9pTJMJieMQROXvK0QCoMQE1kJy95yinTwfAVWPH0aU2fFGSC4TdNWZQQZINxgdoIKoMpiyqAXGDKoFZALjG2qCXIB8YGtQD5xJiiAmDokwh9hShshrQC06LH1xneue1RtSQg1jkDZrANDP2Ibrf7KlvR4bijreNw/Re7Hpl8/zIU4h4RKMlf4BPD40hQCavVaj0gYjROkX/wUeHU1T3DAZuOhMKL3gVi/yL/oc1DvV6//QdmEWYVdn4q0AAAAABJRU5ErkJggg==) no-repeat;
            background-size: .34rem .34rem;
            position: relative;
            top: .04rem;
            left: 2.13rem;
            display: inline-block;
            margin: 0 .08rem 0 0;
            width: .34rem;
            height: .34rem;            
        }
    }

    .coupons-content {
        overflow: auto;
        max-height: 6.6rem;
        background: #f5f5f5;        
    }

    .coupons-nottouse {
        background: #fff;
        border: 1px solid #e6e6e6;
        border-radius: .03rem;
        width: 6.9rem;
        margin: .3rem auto;
        font-size: .3rem;
        color: #333;
        line-height: .8rem;
        height: .8rem;
        text-align: center;
        position: relative;
        margin-bottom: .8rem;        
    }

    .active::after {
        content: "";
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABeCAYAAACq0qNuAAAAAXNSR0IArs4c6QAAA5hJREFUeAHt3MFu1DAQANDJ0gPfUO58AF9ABYd+AahICAkhymE/An6ioj0hIVSp/8CBC0fOcOdAL+VQgRAFhZmyrrLpbtZ2PONxPL7EqyQez1vLcaLdAFgRF2jnsH1DPGrlAdt9eAEttLPKHUTTX6AfUFCDF6LvoDcGnwnd4AXg+yPdhbSpxkkwbNehUyiDZwCnJofQab/Bk0Lisgmdwhl8BnSDz4Ru8AnhfaaXbjibaroakfVQdApj8JHY7rQYdIN3epHbWHSDjwSn08agG3wk/Fh0g4+AT4Fu8IHwqdANPgA+JbrBe8KnRjd4D3gOdIPfAM+FbvAD8JzoBr8Gnhvd4FfAS6AbfA9eCt3gO/CS6Aa/gJdGN3gUyIFePXwu9Krhc6JXC58bvUp4DejVwWtBrwpeE3o18NrQq4DXiD55eK3ok4bXjD5ZeO3ok4QvAX1y8KWgTwq+JPTJwJeGPgn4EtGLhy8VvWj4ktGLhS8dvUj4KaAXBz8V9KLglaKfI+IpQYaWIv5uqRZ9C3YR/C408G1y8JrRmwP42BzBZ3zH2E4ovuoRrx3djfIYfLXwpaA7fDiEL1j/cPV5Q2Vrw/4su0tDb1ucaPbhCLEe+oKpG/EFoz/zRafjVMHXgq4KviZ0NfC1oauAZ0D/i4m9xMvdd0owspwD3hzROr1/fudCGjSn99vJOsezoM/gCa6rX+FNzf1IfHZ0+hKywbOhv4Z3lBjif4rAF0HPBs+AjtLwtFmgU2JUAvHF0Klv4iOeBZ0yAdhtT+Da+/A98UXRqbOi8Izo+C8y2IP38DYCXxxdFJ4VnTKhEo6fBZ26KjLiRdApGyr++NnQqZuXb++nClcRRe8m0cAx3IPHzQOgdf1SaZ/DHVyn3+Rcpy8F7H+YwQ4rfDZ0l+gAvjuku011c9Rtc2Ud4dmmmuzolPHAtNMHEUNfBGaBV4HuZD3wpdGpa8nhVaF74OdATw6vEn0APxd6UnjV6Cvwc6JTd5KsaopAd/j/sz7GC+8PrI56tNttMqieYjlZHHqQENPBY5eThh7/xUSvagw9Hp3OjII39HHoUfCGPh49GN7Q06AHwRt6OnRveENPi+4Fb+jp0TfCGzoP+iC8ofOhr4U3dF50bP3i2g2UobOj023r6dLTSUMXQAc4g99w62rEG7oIOj2Inzdv4NclvKGLoJ8h+qPmEH92gqVp57ANf+C2SOg6g1zQnA4/4SuNdEfwD98lGLTXEIIaAAAAAElFTkSuQmCC) no-repeat;
        background-size: .64rem .64rem;
        position: absolute;
        left: 6.26rem;
        bottom: 0;
        display: inline-block;
        margin: 0 .08rem 0 0;
        width: .64rem;
        height: .64rem;        
    }

</style>

<template>
<popup 
    :open="show" 
    :showClose="false"
    @close="closecoupon">

    <div 
        slot="title" 
        class="coupons-head" 
        @click="closecoupon">{{title}}</div>

    <div 
        slot="content" 
        class="coupons-content">

        <coupon-item             
            v-for="item, idx in list" 
            :key="item.cid"
            v-bind="item"
            :active="item.cid == cid"
            @click-coupon="changecoupon">                
        </coupon-item>

        <div 
            :class="{'coupons-nottouse': true, active: cid == 0}" 
            @click="changecoupon('0')">{{ notUseDes }}</div>
    </div>

</popup>
</template>

<script>
import Popup from '@jyb/lib-vue-popup'
import CouponItem from './couponItem.vue'

export default {
    name: 'coupon-list',
    components: {
        Popup,
        CouponItem
    },
    props: {
        show: {
            type: Boolean,
            required: true,
            default: false
        },
        list: {
            type: Array,
            required: true,
            default: []
        },
        cid: {
            type: [String, Number],
            default: 0
        },
        title: {
            type: String,
            default: '选择红包/折扣券',
        },
        notUseDes: {
            type: String,
            default: '不使用，就是任性'
        }
    },
    methods: {
        closecoupon() {
            this.$emit('update:show', false)
            // this.$emit('close')
        },
        changecoupon(cid) {
            this.$emit('update:cid', cid)
            this.closecoupon()
        }
    }
}
</script>