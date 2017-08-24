(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.switch = global.switch || {}, global.switch.vue = factory());
}(this, (function () { 'use strict';

var Switch$1 = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.value, expression: "value" }], staticClass: "switch", attrs: { "type": "checkbox", "disabled": _vm.disabled }, domProps: { "checked": Array.isArray(_vm.value) ? _vm._i(_vm.value, null) > -1 : _vm.value }, on: { "click": _vm.toggle, "__c": function __c($event) {
                    var $$a = _vm.value,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false;if (Array.isArray($$a)) {
                        var $$v = null,
                            $$i = _vm._i($$a, $$v);if ($$c) {
                            $$i < 0 && (_vm.value = $$a.concat($$v));
                        } else {
                            $$i > -1 && (_vm.value = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                        }
                    } else {
                        _vm.value = $$c;
                    }
                } } });
    }, staticRenderFns: [], _scopeId: 'data-v-4c2805bf',
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
    data: function data() {
        return {
            value: this.checked
        };
    },

    methods: {
        toggle: function toggle() {
            this.$emit('update:checked', this.value);
        }
    }
};

return Switch$1;

})));
