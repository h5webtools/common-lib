(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.numInput = global.numInput || {}, global.numInput.vue = factory());
}(this, (function () { 'use strict';

var NumInput$1 = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mod-minus-plus-group" }, [_c('span', { staticClass: "tap-btn minus", on: { "click": _vm.decr } }, [_c('i', { staticClass: "minus-icon" })]), _vm._v(" "), _c('input', { staticClass: "number-input", attrs: { "readonly": "readonly", "type": "tel" }, domProps: { "value": _vm.num } }), _vm._v(" "), _c('span', { staticClass: "tap-btn plus", on: { "click": _vm.incr } }, [_c('i', { staticClass: "plus-icon" })])]);
    }, staticRenderFns: [], _scopeId: 'data-v-4c2805bf',
    name: 'num-input',
    props: {
        min: {
            type: Number,
            default: 1
        },
        max: {
            type: Number,
            default: 1
        },
        num: {
            type: Number,
            required: true
        }
    },
    data: function data() {
        return {
            val: this.num
        };
    },

    watch: {
        val: function val(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.$emit('update:num', newVal);
            }
        }
    },
    methods: {
        incr: function incr() {
            var val = this.num + 1;
            this.val = Math.min(this.max, val);
        },
        decr: function decr() {
            var val = this.num - 1;
            this.val = Math.max(this.min, val);
        }
    }
};

return NumInput$1;

})));
