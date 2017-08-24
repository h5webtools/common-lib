(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.addressItem = global.addressItem || {}, global.addressItem.vue = factory());
}(this, (function () { 'use strict';

var AddressItem$1 = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mod-addresslist-item f-30" }, [_c('div', { staticClass: "address-detail" }, [_c('p', { staticClass: "color-333" }, [_vm._v("收货人：" + _vm._s(_vm.name) + " "), _c('span', { staticClass: "ui-pl-20" }, [_vm._v(_vm._s(_vm.tel))])]), _c('p', { staticClass: "color-888 f-26 fulladdress" }, [_vm._v(_vm._s(_vm.fullAddress))])]), _c('div', { staticClass: "mod-info-line" }, [_c('div', { staticClass: "info-item" }, [_c('div', { staticClass: "desc-left" }, [_c('span', { class: { 'icon-wrap': true, checked: _vm.checked }, on: { "click": function click($event) {
                    _vm.$emit('clickSet', _vm.info_id);
                } } }, [_c('i', { staticClass: "default-icon icon" }), _vm._v(" 默认地址")])]), _c('div', { staticClass: "desc-right ui-ta-r" }, [_c('span', { staticClass: "icon-wrap", on: { "click": function click($event) {
                    _vm.$emit('clickEdit');
                } } }, [_c('i', { staticClass: "edit-icon icon" }), _vm._v("编辑")]), _vm._v(" "), _c('span', { staticClass: "icon-wrap", on: { "click": function click($event) {
                    _vm.$emit('clickDel');
                } } }, [_c('i', { staticClass: "delete-icon icon" }), _vm._v("删除")])])])])]);
    }, staticRenderFns: [], _scopeId: 'data-v-4c2805bf',
    name: 'baina-address-item',
    props: {
        name: {
            type: String
        },
        tel: {
            type: String
        },
        fullAddress: {
            type: String
        },
        checked: {
            type: Boolean,
            default: false
        },
        info_id: {
            type: String,
            required: true
        }
    }
    // computed: {
    //     checked() {
    //         return this.default == 1
    //     }
    // }
};

return AddressItem$1;

})));
