/* eslint-disable */
import Vue from 'vue'
import overlayOpt from './overlay.vue'
const Overlay = Vue.extend(overlayOpt)

export default {
  instances: [],
  overlay: null,

  // 是否允许滚动
  locked: false,

  // cache body html
  body: document.body,
  html: document.documentElement,

  // cache overflow style
  bodyOverflow: '',
  htmlOverflow: '',

  open(instance) {
    if (!instance || this.instances.indexOf(instance) !== -1) {
      return
    }

    if (!this.overlay && instance.overlay) {
      this.showOverlay(instance)
    }

    this.instances.push(instance)
    this.changeOverlayStyle()
  },
  close(instance) {
    const index = this.instances.indexOf(instance)
    if (index === -1) {
      return
    }

    Vue.nextTick(() => {
      this.instances.splice(index, 1)
      if (this.instances.length === 0) {
        this.closeOverlay()
      }

      this.changeOverlayStyle()
    })
  },

  showOverlay(instance) {
    const overlay = this.overlay = new Overlay({
      el: document.createElement('div')
    })

    overlay.color = instance.overlayColor
    overlay.opacity = instance.overlayOpacity
    overlay.zIndex = instance.overlayZIndex
    overlay.onClick = this.handleOverlayClick.bind(this)
    this.preventScrolling()
    this.body.appendChild(overlay.$el)

    Vue.nextTick(() => {
      overlay.show = true
    })
  },
  closeOverlay() {
    if (!this.overlay) {
      return
    }

    this.allowScrolling()
    const overlay = this.overlay
    overlay.show = false

    this.overlay = null
    Vue.nextTick(() => {
      overlay.$el.remove()
      overlay.$destroy()
    })
  },

  changeOverlayStyle() {
    if (this.instances.length === 0) {
      return
    }

    let last = this.instances.length - 1
    const instance = this.instances[last]
    if (!this.overlay || !instance.overlay) {
      return
    }

    this.overlay.color = instance.overlayColor
    this.overlay.opacity = instance.overlayOpacity
    this.overlay.zIndex = instance.overlayZIndex
  },

  handleOverlayClick() {
    if (this.instances.length === 0) {
      return
    }

    const instance = this.instances[this.instances.length - 1]
    if (instance.overlayClick) {
      instance.overlayClick()
    }
  },

  preventScrolling() {
    if (this.locked) {
      return
    }

    // 保存html和body的overflow属性
    this.bodyOverflow = this.body.style.overflow
    this.htmlOverflow = this.html.style.overflow
    // 禁止滚动
    this.body.style.overflow = 'hidden'
    this.html.style.overflow = 'hidden'

    this.locked = true
  },

  allowScrolling() {
    this.body.style.overflow = this.bodyOverflow
    this.html.style.overflow = this.htmlOverflow

    this.bodyOverflow = ''
    this.htmlOverflow = ''
    this.locked = false
  }
}
