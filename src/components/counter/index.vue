<template>
  <div class="counter">
    <a-button :disabled="is_disabled_left_button" @click="handleClickDecrease(step_number)">
      -
    </a-button>
    <a-input
      v-model="native_value"
      type="number"
      :min="min_number"
      :max="max_number"
      :readonly="readonly"
      :disabled="disabled"
      @blur="handleBlur"
    />
    <a-button :disabled="is_disabled_right_button" @click="handleClickIncrease(step_number)">
      +
    </a-button>
  </div>
</template>

<script>
export default {
  name: 'ACounter',
  props: {
    value: {
      type: Number,
      required: true,
    },
    min: {
      type: [String, Number],
      default: 0,
    },
    max: {
      type: [String, Number],
      default: Infinity,
    },
    step: {
      type: [String, Number],
      default: 0,
    },
    readonly: {
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
      native_value: 0,
    }
  },
  computed: {
    count: {
      get() {
        return this.value
      },
      set(val) {
        this.native_value = val
        this.$emit('input', val)
      },
    },
    step_number() {
      const step = typeof step !== 'number' ? parseInt(this.step) : this.step
      return step > 0 ? step : 1
    },
    min_number() {
      return typeof this.min !== 'number' ? parseInt(this.min) : this.min
    },
    max_number() {
      return typeof this.max !== 'number' ? parseInt(this.max) : this.max
    },
    is_disabled_left_button() {
      return (
        this.disabled ||
        this.readonly ||
        this.native_value <= this.min_number ||
        (isNaN(this.native_value) && this.count <= this.min_number)
      )
    },
    is_disabled_right_button() {
      return (
        this.disabled ||
        this.readonly ||
        this.native_value >= this.max_number ||
        (isNaN(this.native_value) && this.count >= this.max_number)
      )
    },
  },
  mounted() {
    this.native_value = this.value
    this.handleBlur()
  },
  methods: {
    handleBlur() {
      this.native_value = isNaN(this.native_value) ? this.count : this.native_value
      this.$emit('input', this.native_value)
    },
    handleClickDecrease(step) {
      if (this.native_value - step < this.min_number) {
        this.count = this.min_number
      } else {
        this.count = this.count - step
      }
      this.handleBlur()
    },
    handleClickIncrease(step) {
      if (this.native_value + step > this.max_number) {
        this.count = this.max_number
      } else {
        this.count = this.count + step
      }
      this.handleBlur()
    },
  },
}
</script>
