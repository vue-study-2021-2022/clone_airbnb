<template>
  <div
    class="textarea"
    :class="{ 'length-counter': isUseCounter && $attrs.maxlength }"
    :style="`height: ${height}px`"
  >
    <textarea
      ref="textarea"
      v-bind="$attrs"
      :class="[validateState]"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    />
    <div v-if="isUseCounter && $attrs.maxlength" class="length-counter">
      {{ lengthCounter }}/{{ $attrs.maxlength }}
    </div>
  </div>
</template>

<script>
import emitter from '@/mixins/emitter'
export default {
  name: 'ATextarea',
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
      type: [String, Number],
      required: true,
    },
    height: {
      type: Number,
      default: 100,
    },
    validateEvent: {
      type: Boolean,
      default: true,
    },
    isUseCounter: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    nativeTextareaValue() {
      return this.value === null || this.value === undefined ? '' : String(this.value)
    },
    validateState() {
      return this.airbnbFormItem ? this.airbnbFormItem.validateState : ''
    },
    lengthCounter() {
      return this.nativeTextareaValue.length
    },
  },
  watch: {
    nativeTextareaValue() {
      this.setNativeTextareaValue()
    },
    value(val) {
      if (this.validateEvent) {
        this.dispatch('airbnbFormItem', 'airbnb.form.change', [val])
      }
    },
  },
  mounted() {
    this.setNativeTextareaValue()
  },
  methods: {
    getTextarea() {
      return this.$refs.textarea
    },
    setNativeTextareaValue() {
      // value 데이터  textarea 에 삽입
      const textarea = this.getTextarea()
      if (!textarea) {
        return
      }
      if (textarea.value === this.nativeTextareaValue) {
        return
      }
      textarea.value = this.nativeTextareaValue
    },
    focus() {
      // select 포커스 In
      this.getTextarea().focus()
    },
    select() {
      // select 내용 전체 선택 & 포커스 In
      this.getTextarea().index()
    },
    blur() {
      // select 포커스 Out
      this.getTextarea().blur()
    },
    handleInput(event) {
      // 실시간 감시
      if (event.target.value === this.nativeTextareaValue) {
        return
      }

      this.$emit('input', event.target.value)

      this.$nextTick(() => {
        if (event.target.value.length > this.$attrs.maxlength) {
          return
        }
        this.setNativeTextareaValue()
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
    handleChange() {
      // 포커스 Out 시 변경 여부
      // this.$emit('change', event.target.value)
    },
    clear() {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
    },
    getTextByteToLength(str) {
      let len = 0

      for (let i = 0; i < str.length; i++) {
        if (escape(str.charAt(i)).length === 6) {
          len++
        }
        len++
      }
      return len
    },
  },
}
</script>
