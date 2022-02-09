<template>
  <li :class="{ disabled: disabled }" @click.stop="selectOptionClick">{{ label }}</li>
</template>

<script>
import emitter from '@/mixins/emitter'

export default {
  name: 'AOption',
  mixins: [emitter],
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number, Object],
      required: true,
    },
    label: {
      type: [String, Number],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.dispatch('airbnbSelect', 'airbnb.select.addOption', [this])
  },
  methods: {
    selectOptionClick() {
      if (!this.disabled) {
        this.dispatch('airbnbSelect', 'handleOptionClick', [this])
      }
    },
  },
}
</script>
