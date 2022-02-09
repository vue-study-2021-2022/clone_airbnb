<template>
  <div class="input" @click="handleClick">
    <slot name="input-icon-left"></slot>
    <input
      ref="input"
      :type="inputType"
      :class="[size, addStyle, validateState]"
      :autocomplete="autocomplete"
      v-bind="$attrs"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @keyup.enter="handleEnter"
    />
    <slot name="input-icon-right"></slot>
  </div>
</template>

<script>
import emitter from '@/mixins/emitter'

export default {
  name: 'AInput',
  mixins: [emitter],
  inheritAttrs: false,
  props: {
    size: { type: String, default: 'large' },
    addStyle: { type: String, default: '' },
    value: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      default: 'text', // text, password, tel, number 만 가능
    },
    autocomplete: {
      // 자동완성기능
      type: String,
      default: 'new-password',
    },
    validateEvent: {
      type: Boolean,
      default: true,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    min: {
      type: Number,
      default: -Infinity,
    },
  },
  data() {
    return {
      inputType: 'text',
    }
  },
  inject: {
    airbnbForm: {
      default: '',
    },
    airbnbFormItem: {
      default: '',
    },
  },
  computed: {
    nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : String(this.value)
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
    nativeInputValue() {
      this.setNativeInputValue()
    },
  },
  created() {
    // 숫자Password 구현을 위해 prop으로 받는 데이터를 판별하여 inputType을 넣어주도록 분기문 처리
    this.inputType = this.type
    if (this.type === 'tel_password') {
      this.inputType = 'password'
    }
  },
  mounted() {
    this.setNativeInputValue()
  },
  methods: {
    getInput() {
      return this.$refs.input
    },
    setNativeInputValue() {
      // value 데이터  input 에 삽입
      const input = this.getInput()
      if (!input) {
        return
      }
      if (input.value === this.nativeInputValue) {
        return
      }
      input.value = this.nativeInputValue
    },
    focus() {
      // input 포커스 In
      this.getInput().focus()
    },
    select() {
      // input 내용 전체 선택 & 포커스 In
      this.getInput().index()
    },
    blur() {
      // input 포커스 Out
      this.getInput().blur()
    },
    handleInput(event) {
      // 실시간 감시
      let newVal
      if (this.type === 'number') {
        if (event.target.value === '' || event.target.value.length === 0) {
          newVal = NaN
        } else {
          newVal = parseInt(event.target.value)
        }
        if (newVal >= this.max) {
          newVal = this.max
        }
        if (newVal <= this.min) {
          newVal = this.min
        }
      } else if (this.type === 'tel' || this.type === 'tel_password') {
        newVal = event.target.value.replace(/[^0-9]/g, '')
      } else {
        if (event.target.value === this.nativeInputValue) {
          return
        }
        newVal = event.target.value
      }

      this.$emit('input', newVal)

      this.$nextTick(() => {
        this.setNativeInputValue()
      })
    },
    handleFocus(event) {
      // 포커스 In
      this.$emit('focus', event)
    },
    handleBlur(event) {
      // 포커스 Out
      this.$emit('blur', event)
      if (this.validateEvent) {
        this.dispatch('airbnbFormItem', 'airbnb.form.blur', [this.value])
      }
    },
    // eslint-disable-next-line no-unused-vars
    handleChange(event) {
      // 포커스 Out 시 변경 여부
      // this.$emit('change', event.target.value)
    },
    handleEnter() {
      this.$emit('enter')
    },
    handleClick() {
      this.$emit('click')
    },
    clear() {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
    },
  },
}
</script>
