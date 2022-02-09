<template>
  <button
    type="button"
    class="button"
    :class="[color, size, { disabled: disabled }]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-show="loading" class="loader"></span>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'AButton',
  props: {
    disabled: Boolean,
    size: { type: String, default: 'xlarge' },
    color: { type: String, default: 'primary' },
    loading: Boolean,
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event)
    },
  },
}
</script>
