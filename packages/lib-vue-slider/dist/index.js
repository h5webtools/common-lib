(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.slider = global.slider || {}, global.slider.vue = factory());
}(this, (function () { 'use strict';

var LazyImg = {
    name: 'lazy-img',
    functional: true,
    props: {
        src: {
            type: String,
            required: true
        },
        loaded: {
            type: Boolean,
            default: false
        },
        width: {
            type: String
        },
        href: {
            type: String
        }
    },
    render: function render(createElement, context) {
        var _context$props = context.props,
            src = _context$props.src,
            loaded = _context$props.loaded;

        var attrs = loaded ? { src: src } : { 'data-src': src };
        if (context.props.width) {
            attrs.style.width = context.prop.width;
        }

        if (context.props.href) {
            return createElement('a', {
                attrs: {
                    href: context.props.href
                }
            }, [createElement('img', { attrs: attrs })]);
        } else {
            return createElement('img', { attrs: attrs });
        }
    }
};

var LEFT = 1;
var RIGHT = 2;
var noneFunc = function noneFunc() {};
var preventDefault = function preventDefault(e) {
    e.preventDefault();
};

var Slider$1 = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "bn-slider" }, [_c('div', { staticClass: "bn-slider-items-wrap", style: _vm.wrapperStyle, on: { "transitionend": function transitionend($event) {
                    $event.stopPropagation();_vm.onAnimEnd($event);
                } } }, [_vm._l(_vm.items, function (item, idx) {
            return _c('div', { key: item.id, class: { 'bn-slider-item': true, 'showDefault': !item.loaded }, on: { "touchstart": function touchstart($event) {
                        $event.stopPropagation();_vm.onStart($event);
                    }, "touchmove": function touchmove($event) {
                        $event.stopPropagation();_vm.onMove($event);
                    }, "touchend": function touchend($event) {
                        $event.stopPropagation();_vm.onEnd($event);
                    } } }, [_c('lazy-img', { attrs: { "src": item.src, "href": item.href, "loaded": item.loaded } })], 1);
        }), _vm.loop ? _c('div', { staticClass: "bn-slider-item", on: { "touchstart": function touchstart($event) {
                    $event.stopPropagation();_vm.onStart($event);
                }, "touchmove": function touchmove($event) {
                    $event.stopPropagation();_vm.onMove($event);
                }, "touchend": function touchend($event) {
                    $event.stopPropagation();_vm.onEnd($event);
                } } }, [_c('lazy-img', { attrs: { "src": _vm.items[0] && _vm.items[0].src, "href": _vm.items[0] && _vm.items[0].href, "loaded": true } })], 1) : _vm._e()], 2), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.showIndicators, expression: "showIndicators" }], staticClass: "bn-slider-indicators" }, _vm._l(_vm.items, function (item, idx) {
            return _c('i', { class: { cur: _vm.isCur(idx) } });
        }))]);
    }, staticRenderFns: [],
    name: 'slider',
    components: { LazyImg: LazyImg },
    props: {
        items: {
            type: Array,
            required: true
        },
        height: {
            type: String
        },
        wrapHeight: {
            type: String
        },
        preload: {
            type: Number,
            default: 0
        },
        width: {
            type: String
        },
        // imgWidth: {
        //     type: String,
        // },
        time: {
            type: Number,
            default: 300
        },
        loop: {
            type: Boolean,
            default: false
        },
        auto: {
            type: Boolean,
            default: false
        },
        interval: {
            type: Number,
            default: 3000
        },
        onClick: {
            type: Function,
            default: noneFunc
        }
    },
    data: function data() {
        return {
            isLockX: 0,
            current: 0,

            beginPos: {
                x: null,
                y: null
            },
            endPos: {
                x: null,
                y: null
            },

            startTime: null,
            endTime: null,
            allowedTime: 300,

            wrapperStyle: {},

            tid: null,
            reverse: false,

            options: {
                width: this.width,
                auto: this.auto
            }
        };
    },

    computed: {
        move: function move() {
            return this.endPos.x - this.beginPos.x;
        },
        elapsedTime: function elapsedTime() {
            return this.endTime - this.startTime;
        },
        offset: function offset() {
            return this.move + this.shift;
        },
        // 是否是往右移第一张图或者往左移最后一张
        isLimit: function isLimit() {
            return this.moveDir === LEFT && this.current === this.items.length - 1 || this.moveDir === RIGHT && this.current === 0;
        },
        rebound: function rebound() {
            return Math.abs(this.move) < this.options.width / 3;
            // || this.isLimit
        },
        moveDir: function moveDir() {
            return this.move < 0 ? LEFT : RIGHT;
        },
        shift: function shift() {
            return -this.current * this.options.width;
        },
        showIndicators: function showIndicators() {
            return this.items.length > 1;
        },
        isSwipe: function isSwipe() {
            return this.elapsedTime <= this.allowedTime;
        }
    },
    watch: {
        // current: function (newValue, oldValue) {
        //     const len = this.items.length            
        //     if (this.options.auto) {
        //         if (this.loop) {
        //             this.reverse = false 
        //         }
        //         else {
        //             if (newValue === len - 1) {
        //                 this.reverse = true 
        //             }
        //             else {
        //                 if (0 === newValue) {
        //                     this.reverse = false 
        //                 }
        //             }
        //         }
        //     }

        //     this.load(newValue)
        //     this.doAnim()
        //     this.$emit('change', newValue % len)
        // },
        items: function items(newValue, oldValue) {
            var _this = this;

            this.load(0);
            this.$nextTick(function () {
                _this.init();
                _this.current = 0;
            });
        }
    },
    methods: {
        isCur: function isCur(idx) {
            return idx === this.current || idx + this.items.length === this.current;
        },
        setEl: function setEl() {
            var _this2 = this;

            var wrapper = this.$el;
            var ul = this.getListEl();
            var li = ul.children[0];

            try {
                this.options.width = this.options.width || document.documentElement.clientWidth; //li.getBoundingClientRect().width
            } catch (e) {
                this.options.width = document.documentElement.clientWidth;
            }

            var width = this.options.width;
            ul.style.width = width * this.items.length + 'px';
            wrapper.style.width = width + 'px';
            if (this.wrapHeight) {
                wrapper.style.height = this.wrapHeight;
            }

            Array.prototype.slice.call(ul.children).forEach(function (i, idx) {
                i.style.left = idx * width + 'px';
                i.style.width = width + 'px';
                if (_this2.height) {
                    i.style.height = _this2.height;
                }
            });

            this.doMove(0);
        },
        getListEl: function getListEl() {
            return this.$el.children[0];
        },
        getCoordinate: function getCoordinate(e) {
            var touchObj = e.changedTouches[0];
            var x = touchObj.pageX,
                y = touchObj.pageY;

            return { x: x, y: y };
        },
        doMove: function doMove(offset) {
            offset = typeof offset === 'undefined' ? this.offset : +offset;
            this.wrapperStyle = {
                '-webkit-transition-duration': '0ms',
                '-webkit-transform': 'translate3d(' + offset + 'px, 0, 0)'

                // const ul = this.getListEl()


                // ul.style.webkitTransitionDuration = '0ms'
                // ul.style.webkitTransform = `translate3d(${offset}px, 0, 0)`
            };
        },
        doAnim: function doAnim() {
            this.reset();
            // const ul = this.getListEl() 
            this.wrapperStyle = {
                '-webkit-transition-duration': this.time + 'ms',
                '-webkit-transform': 'translate3d(' + this.shift + 'px, 0, 0)'

                // ul.style.webkitTransitionDuration = `${this.time}ms`
                // ul.style.webkitTransform = `translate3d(${this.shift}px, 0, 0)`            
            };
        },
        onAnimEnd: function onAnimEnd() {
            this.isLockX = false;
            this.autoStart();
            this.resetStart();
        },
        doRebound: function doRebound() {
            if (Math.abs(this.move) > 0) {
                this.doAnim();
            } else {
                this.onAnimEnd();
            }
        },
        load: function load(idx) {
            var _load = function _load(item) {
                if (item && !item.loaded) {
                    item.loaded = true;
                }
            };

            for (var i = 0, len = this.preload + 1; i < len; i++) {
                _load(this.items[idx + i]);
            }
        },
        prev: function prev() {
            this.jumpTo(this.current - 1);
        },
        next: function next() {
            this.jumpTo(this.current + 1);
        },
        jumpTo: function jumpTo(i) {
            var len = this.items.length;
            if (this.loop && i === this.items.length) {
                // this.current = i
            } else {
                i = i < 0 ? len - 2 : i >= len ? 1 : i;
            }

            this.current = i;
            if (this.options.auto) {
                if (this.loop) {
                    this.reverse = false;
                } else {
                    if (i === len - 1) {
                        this.reverse = true;
                    } else {
                        if (0 === i) {
                            this.reverse = false;
                        }
                    }
                }
            }

            this.load(i);
            this.doAnim();
            this.$emit('change', i % len);
        },
        onStart: function onStart(e) {
            if (this.isLockX) {
                return;
            }

            clearTimeout(this.tid);
            this.startTime = Date.now();
            this.endTime = null;
            this.beginPos = this.endPos = this.getCoordinate(e);
            this.isLockX = true;

            document.documentElement.addEventListener('touchmove', preventDefault, false);
        },
        onMove: function onMove(e) {
            e.preventDefault();
            this.endPos = this.getCoordinate(e);
            this.doMove();
        },
        onEnd: function onEnd(e) {
            if (!this.beginPos.x) {
                this.isLockX = false;
                return;
            }

            document.documentElement.removeEventListener('touchmove', preventDefault, false);
            this.endTime = Date.now();
            this.endPos = this.getCoordinate(e);
            if (this.isLimit || !this.isSwipe && this.rebound) {
                this.doRebound();
            } else {
                this.moveDir === LEFT ? this.next() : this.prev();
            }
        },
        autoStart: function autoStart() {
            var _this3 = this;

            clearTimeout(this.tid);
            if (this.options.auto && this.items.length >= 3) {
                var action = this.reverse ? this.prev : this.next;
                this.tid = setTimeout(function () {
                    action.call(_this3);
                }, this.interval);
            }
        },
        resetStart: function resetStart() {
            if (this.loop && this.current === this.items.length) {
                this.doMove(0);
            }
        },
        init: function init() {
            this.setEl();
            this.autoStart();
        },
        reset: function reset() {
            this.beginPos = {};
            this.endPost = {};
        }
    },
    created: function created() {
        this.load(0);
    },
    mounted: function mounted() {
        this.init();
    },
    beforeDestroy: function beforeDestroy() {
        clearTimeout(this.tid);
    }
};

return Slider$1;

})));
