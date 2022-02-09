<template>
  <div class="radio">
    <label>
      <input
        ref="radio"
        v-model="checkValue"
        :value="label"
        v-bind="$attrs"
        type="radio"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      />
      <span class="icon-radio" :class="[validateState]"></span>
      <span class="radio-label">
        <slot name="label"></slot>
      </span>
    </label>
    <span class="radio-text">
      <slot></slot>
    </span>
  </div>
</template>

<script>
import emitter from '@/mixins/emitter'

export default {
  name: 'ARadio',
  mixins: [emitter],
  inheritAttrs: false,
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
      type: [String, Number, Boolean, Object],
      required: true,
    },
    label: {
      type: [String, Number, Object],
      default: undefined,
    },
    validateEvent: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    checkValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
    validateState() {
      return this.airbnbFormItem ? this.airbnbFormItem.validateState : ''
    },
  },
  watch: {
    value(val) {
      if (this.validateEvent) {
        this.dispatch('airbnbFormItem', 'airbnb.form.change', [val])
      }
    },
  },
  methods: {
    getRadio() {
      return this.$refs.radio
    },
    focus() {
      // select 포커스 In
      this.getRadio().focus()
    },
    select() {
      // select 내용 전체 선택 & 포커스 In
      this.getRadio().index()
    },
    blur() {
      // select 포커스 Out
      this.getRadio().blur()
    },
    handleFocus(event) {
      // 포커스 In
      this.$emit('focus', event)
    },
    handleBlur(event) {
      // 포커스 Out
      this.$emit('blur', event)
      if (this.validateEvent) {
        this.dispatch('airbnbFormItem', 'airbnb.form.change', [this.value])
      }
    },
    handleChange(event) {
      // 포커스 Out 시 변경 여부
      this.$emit('change', event.target.checked, event)
    },
    clear() {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
    },
  },
}
</script>
