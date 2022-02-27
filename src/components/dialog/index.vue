<template>
  <transition :name="transition ? transitionClass : ''">
    <div v-show="visible" class="dialog-wrapper" @click.self="handleClose">
      <div
        :key="key"
        ref="dialog"
        :class="[
          'dialog',
          {
            'is-fullscreen': fullscreen,
            'is-align-center-x': alignCenterX,
            'is-align-center-y': alignCenterY,
            'is-border-radius': borderRadius,
          },
        ]"
        :style="style"
      >
        <button v-if="closeButton" class="dialog-close" @click="handleClose">close</button>
        <slot v-if="rendered"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import Migrating from './js/migrating.js'
import emitter from './js/emitter.js'
import Popup from './js/popup.js'

export default {
  name: 'ADialog',
  mixins: [Popup, emitter, Migrating],
  props: {
    position: {
      type: String,
      default: 'relative',
    },
    top: {
      type: String,
      default: '0',
    },
    left: {
      type: String,
      default: '0',
    },
    right: {
      type: String,
      default: '0',
    },
    width: {
      type: String,
      default: '50%',
    },
    height: {
      type: String,
      default: 'auto',
    },
    maxWidth: {
      type: String,
      default: '100%',
    },
    maxHeight: {
      type: String,
      default: '90%',
    },
    alignCenterX: {
      type: Boolean,
      default: true,
    },
    alignCenterY: {
      type: Boolean,
      default: true,
    },
    borderRadius: {
      type: String,
      default: '8px',
    },
    background: {
      type: String,
      default: '#ffffff',
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    beforeClose: Function,
    appendToBody: {
      type: Boolean,
      default: true,
    },
    transition: {
      type: Boolean,
      default: true,
    },
    transitionClass: {
      type: String,
      default: 'transition-fade',
    },
    modal: {
      type: Boolean,
      default: true,
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },
    modalAppendToBody: {
      type: Boolean,
      default: true,
    },
    closeButton: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      closed: false,
      key: 0,
    }
  },
  computed: {
    style() {
      const style = {}
      if (!this.fullscreen) {
        if (!this.alignCenterX) {
          if (this.right !== '0') {
            style.left = this.left
          } else {
            style.right = this.right
          }
        }
        if (!this.alignCenterY) {
          style.top = this.top
        }
        style.width = this.width
        style.height = this.height
        style.maxHeight = this.maxHeight
        style.maxWidth = this.maxWidth
        style.borderRadius = this.borderRadius
        style.background = this.background
      }
      style.position = this.position
      return style
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.closed = false
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0
        })
        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
      }
    },
  },
  destroyed() {
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  mounted() {
    if (this.visible) {
      this.rendered = true
      this.open()
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    }
  },
  methods: {
    getMigratingConfig() {
      return {
        props: {
          size: 'size is removed.',
        },
      }
    },
    handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false)
        this.closed = true
      }
    },
  },
}
</script>
