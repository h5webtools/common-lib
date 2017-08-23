/* eslint-disable */
import PopManager from './popManager';
import { getZIndex } from './utils';

export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    overlayOpacity: {
      type: Number,
      default: 0.4,
    },
    overlayColor: {
      type: String,
      default: '#000'
    },
  },
  data() {
    return {
      overlayZIndex: getZIndex(),
      zIndex: getZIndex(),
    };
  },
  mounted() {
    if (this.open) {
      this.resetZIndex();
      PopManager.open(this);
      this.appendElToBody();
    }
  },
  beforeDestroy() {
    PopManager.close(this);
    this.removeEl();
  },
  watch: {
    open(val, oldVal) {
      if (val === oldVal) {
        return;
      }

      if (val) {
        this.resetZIndex();
        PopManager.open(this);
        this.appendElToBody();
      } else {
        PopManager.close(this);
      }
    },
    zIndex(val, oldVal) {
      const el = this.getEl();
      if (!el) {
        console.warn('el is not defined');
        return;
      }

      // 在当前帧获取不到el
      this.$nextTick(() => {
        if (val !== oldVal) {
          this.getEl().style.zIndex = val;
        }
      });
    }
  },
  methods: {
    overlayClick(e) {
      if (this.overlay) {
        this.$emit('close', 'overlay');
      }
    },
    resetZIndex() {
      this.overlayZIndex = getZIndex();
      this.zIndex = getZIndex();
    },
    getEl() {
      return this.$refs.popup || this.$el;
    },
    appendElToBody() {
      const el = this.getEl();
      if (el) {
        document.body.appendChild(el);
      }
    },
    removeEl() {
      const el = this.getEl();
      if (el && el.nodeType == 1) {
        document.body.removeChild(el);
      }
    }
  }
};
