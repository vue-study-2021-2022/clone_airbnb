<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import emitter from '@/mixins/emitter'

export default {
  name: 'ACheckGroup',
  mixins: [emitter],
  inject: {
    airbnbForm: {
      default: '',
    },
    airbnbFormItem: {
      default: '',
    },
  },
  props: {
    value: {
      type: [String, Number, Boolean, Array],
      required: true,
    },
  },
  watch: {
    value(val) {
      this.dispatch('airbnbFormItem', 'airbnb.form.change', [val])
      this.$emit('change', val)
    },
  },
}
</script>
