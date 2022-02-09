<template>
  <div
    ref="select"
    class="select"
    :class="[size, addStyle, validateState, { show: optionView }, { scroll: isScroll }]"
  >
    <div class="select-input-wrap">
      <w-input
        v-model="selectedLabel"
        v-bind="$attrs"
        :size="size"
        :add-style="addStyle"
        readonly
        :disabled="disabled"
        @click="toggleOptionView"
      />
    </div>
    <div class="select-options-wrap">
      <ul class="select-options">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script>
import emitter from '@/mixins/emitter'

export default {
  name: 'ASelect',
  componentName: 'airbnbSelect',
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
      type: [String, Number, Object],
      required: true,
    },
    size: { type: String, default: 'large' },
    addStyle: { type: String, default: '' },
    validateEvent: {
      type: Boolean,
      default: true,
    },
    isScroll: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      close: true,
      optionView: false,
      selectedLabel: '',
      selectedValue: '',
      options: [],
    }
  },
  computed: {
    validateState() {
      return this.airbnbFormItem ? this.airbnbFormItem.validateState : ''
    },
  },
  watch: {
    value(val) {
      if (val !== this.selectedValue) {
        this.options.forEach((obj) => {
          if (obj.value === val) {
            this.setSelectOption(obj)
          }
        })
      }
      if (this.validateEvent) {
        this.dispatch('airbnbFormItem', 'airbnb.form.change', [val])
      }
    },
    optionView(val) {
      if (val) {
        this.close = false
        this.$nextTick(() => {
          document.body.addEventListener('click', this.toggleOptionView)
        })
      } else {
        document.body.removeEventListener('click', this.toggleOptionView)
      }
    },
  },
  created() {
    this.$on('airbnb.select.addOption', (option) => {
      if (option) {
        this.options.push(option)
        if (option.value === this.value) {
          this.setSelectOption(option)
        }
      }
    })
    this.$on('handleOptionClick', this.handleOptionSelect)
  },
  methods: {
    getSelect() {
      return this.$refs.select
    },
    clear() {
      this.selectedLabel = ''
      this.selectedValue = ''
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
    },
    focus() {
      // input 포커스 In
      this.getSelect().focus()
    },
    toggleOptionView(event) {
      if (this.$props.disabled) {
        this.optionView = false
        return
      }
      if (this.close && (!event || !this.$refs.select.contains(event.target))) {
        this.optionView = !this.optionView
      } else {
        this.close = true
      }
    },
    handleOptionSelect(option) {
      if (option.value !== this.selectedValue) {
        this.setSelectOption(option)
      }
      this.toggleOptionView()
    },
    setSelectOption(option) {
      this.selectedLabel = option.label
      this.selectedValue = option.value
      this.$emit('input', option.value)
      this.$emit('change', option.value)
    },
  },
}
</script>
