(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.attrList = global.attrList || {}, global.attrList.vue = factory());
}(this, (function () { 'use strict';

var delimiter = ';';

var AttrList$1 = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_vm._l(_vm.attrs, function (attr) {
            return [_c('p', [_vm._v(_vm._s(attr && attr.name))]), attr.attr ? _c('ul', { staticClass: "chose-list" }, _vm._l(attr.attr, function (a) {
                return _c('li', { key: a.item_id, class: { cur: _vm.isCurrent(attr.code, a.item_id), disabled: _vm.isDisabled(attr.code, a.item_id) }, on: { "click": function click($event) {
                            _vm.toggleSelect(attr.code, a.item_id);
                        } } }, [_vm._v(_vm._s(a.value))]);
            })) : _vm._e()];
        })], 2);
    }, staticRenderFns: [], _scopeId: 'data-v-4c2805bf',
    name: 'attr-list',
    props: {
        attrs: {
            type: Array,
            required: true
        },
        skus: {
            type: Object,
            required: true
        },
        preChose: {
            type: String
        }
    },
    data: function data() {
        return {
            chose: {}
        };
    },

    computed: {
        defaultChose: function defaultChose() {
            return this.attrs.reduce(function (p, c) {
                var select = c.attr && c.attr.filter(function (i) {
                    return i.default;
                })[0];
                p[c.code] = select && select.item_id;
                return p;
            }, {});
        },
        avaiableMap: function avaiableMap() {
            var _this = this;

            return Object.keys(this.skus).filter(function (k) {
                return _this.skus[k].sale_status == 1;
            }).reduce(function (p, c) {
                var sku = _this.skus[c];
                _this.powerset(c.split(delimiter).filter(function (i) {
                    return i;
                })).forEach(function (i) {
                    var key = _this.wrapKey(i.join(delimiter));
                    if (p[key]) {
                        p[key] += _this.parseStock(sku.stock);
                    } else {
                        p[key] = _this.parseStock(sku.stock);
                    }
                });

                return p;
            }, {});
        }
    },
    watch: {
        chose: function chose(val) {
            var _this2 = this;

            Object.keys(val).forEach(function (k) {
                var value = val[k];
                if (_this2.isCurrent(k, value) && _this2.isDisabled(k, value)) {
                    val[k] = null;
                }
            });
        }
    },
    created: function created() {
        this.chose = this.getPreChose() || this.defaultChose;
    },

    methods: {
        isAllChose: function isAllChose() {
            var _this3 = this;

            return this.attrs.every(function (i) {
                return _this3.chose[i.code];
            });
        },
        isCurrent: function isCurrent(code, itemId) {
            return this.chose[code] && this.chose[code] == itemId;
        },
        isDisabled: function isDisabled(code, itemId) {
            var str = this.getChoseStr(code, itemId);
            return !this.avaiableMap[str] || this.avaiableMap[str] <= 0;
        },
        toggleSelect: function toggleSelect(code, itemId) {
            if (this.isDisabled(code, itemId)) {
                return;
            }

            if (this.isCurrent(code, itemId)) {
                this.chose[code] = '';
            } else {
                this.chose[code] = itemId;
            }

            if (this.isAllChose()) {
                this.$emit('chose-change', this.getChoseStr(), this.getChoseValue());
            }
        },
        powerset: function powerset(arr) {
            var ret = [[]];
            arr.forEach(function (i, idx) {
                for (var j = 0, len = ret.length; j < len; j++) {
                    ret.push(ret[j].concat(i));
                }
            });

            return ret;
        },
        wrapKey: function wrapKey(key) {
            return '' + delimiter + key + delimiter;
        },
        parseStock: function parseStock(stock) {
            if (stock == -1) {
                return Infinity;
            }

            return stock;
        },
        getChoseStr: function getChoseStr(code, itemId) {
            var _this4 = this;

            var choseArr = this.attrs.map(function (i) {
                if (i.code == code) {
                    return itemId;
                }

                return _this4.chose[i.code];
            }).filter(function (i) {
                return i;
            });

            return this.wrapKey(choseArr.join(delimiter));
        },
        getChoseValue: function getChoseValue() {
            var _this5 = this;

            return this.attrs.map(function (i) {
                var attr = i.attr.filter(function (a) {
                    return _this5.chose[i.code] == a.item_id;
                })[0];
                return attr && attr.value;
            }).join(' ');
        },
        getPreChose: function getPreChose() {
            if (!this.preChose) {
                return;
            }

            var choseArr = this.preChose.split(delimiter).filter(function (i) {
                return i;
            });
            return this.attrs.reduce(function (p, c, idx) {
                p[c.code] = choseArr[idx];
                return p;
            }, {});
        }
    }
};

return AttrList$1;

})));
