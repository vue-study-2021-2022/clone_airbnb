<template>
  <div class="checkbox">
    <label>
      <input
        v-if="trueLabel !== undefined && falseLabel !== undefined"
        ref="checkbox"
        v-model="checkValue"
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
        ref="checkbox"
        v-model="checkValue"
        v-bind="$attrs"
        :value="label"
        type="checkbox"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      />
      <span class="icon-checkbox" :class="[validateState]"></span>
      <span class="checkbox-label">
        <slot name="label"></slot>
      </span>
    </label>
    <span class="checkbox-text">
      <slot></slot>
    </span>
  </div>
</template>

<script>
import emitter from '@/mixins/emitter'

export default {
  name: 'ACheckbox',
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
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: [String, Number, Boolean],
    },
    label: {
      type: [String, Number],
      default: undefined,
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
  data() {
    return {
      selfModel: false,
    }
  },
  computed: {
    checkValue: {
      get() {
        return this.isGroup ? this.store : this.value !== undefined ? this.value : this.selfModel
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch('WCheckGroup', 'input', [val])
        } else {
          this.$emit('input', val)
          this.selfModel = val
        }
      },
    },
    validateState() {
      return this.airbnbFormItem ? this.airbnbFormItem.validateState : ''
    },
    isGroup() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'WCheckGroup') {
          parent = parent.$parent
        } else {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this._checkboxGroup = parent
          return true
        }
      }
      return false
    },
    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value
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
    getCheckbox() {
      return this.$refs.checkbox
    },
    focus() {
      // select 포커스 In
      this.getCheckbox().focus()
    },
    select() {
      // select 내용 전체 선택 & 포커스 In
      this.getCheckbox().index()
    },
    blur() {
      // select 포커스 Out
      this.getCheckbox().blur()
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
      this.$nextTick(() => {
        if (this.isGroup) {
          this.dispatch('WCheckGroup', 'change', [this._checkboxGroup.value])
        }
      })
    },
    clear() {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
    },
  },
}
</script>
