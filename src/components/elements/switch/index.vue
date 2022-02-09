<template>
  <div class="switch-button">
    <label>
      <span class="switch-button-label"><slot></slot></span>
      <input
        v-if="trueLabel !== undefined && falseLabel !== undefined"
        ref="switch"
        v-model="switchValue"
        type="checkbox"
        :true-value="trueLabel"
        :false-value="falseLabel"
        v-bind="$attrs"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      />
      <input
        v-else
        ref="switch"
        v-model="switchValue"
        v-bind="$attrs"
        type="checkbox"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      />
      <span class="switch-button-ui"></span>
    </label>
  </div>
</template>

<script>
import emitter from '@/mixins/emitter'

export default {
  name: 'ASwitch',
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
      type: [String, Number, Boolean],
      required: true,
    },
    trueLabel: {
      type: [String, Number],
      default: undefined,
    },
    falseLabel: {
      type: [String, Number],
      default: undefined,
    },
    validateEvent: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    switchValue: {
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
    getSwitch() {
      return this.$refs.switch
    },
    focus() {
      // select 포커스 In
      this.getSwitch().focus()
    },
    select() {
      // select 내용 전체 선택 & 포커스 In
      this.getSwitch().index()
    },
    blur() {
      // select 포커스 Out
      this.getSwitch().blur()
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
