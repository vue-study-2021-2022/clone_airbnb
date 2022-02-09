<template>
  <div :class="[addClass]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AForm',
  componentName: 'airbnbForm',
  provide() {
    return {
      airbnbForm: this,
    }
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      default: null,
    },
    addClass: {
      type: String,
      default: 'a-form',
    },
  },
  data() {
    return {
      fields: [],
    }
  },
  created() {
    this.$on('airbnb.form.addField', (field) => {
      if (field) {
        this.fields.push(field)
      }
    })
    this.$on('airbnb.form.removeField', (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1)
      }
    })
  },
  methods: {
    resetFields() {
      if (!this.model) {
        console.warn('[airbnb Element Warn][Form]model is required for resetFields to work.')
        return
      }
      this.fields.forEach((field) => {
        field.resetField()
      })
    },
    clearValidate() {
      this.fields.forEach((field) => {
        field.clearValidate()
      })
    },
    validate(callback) {
      if (!this.model) {
        console.warn('[airbnb Element Warn][Form]model is required for validate to work!')
        return
      }
      let promise
      if (typeof callback !== 'function' && window.Promise) {
        promise = new window.Promise((resolve, reject) => {
          callback = function (value) {
            value ? resolve(value) : reject(value)
          }
        })
      }
      let valid = true
      let count = 0
      let firstValid
      if (this.fields.length === 0 && callback) {
        callback(true)
      }
      let invalidFields = {}
      this.fields.forEach((field) => {
        let prop = field.prop
        field.validate('', (message, value) => {
          if (message === 'error') {
            valid = false
            if (!firstValid) {
              firstValid = prop
            }
          }
          invalidFields = this.objectAssign({}, invalidFields, value)
          if (typeof callback === 'function' && ++count === this.fields.length) {
            // callback(valid, invalidFields)
            callback(valid, firstValid)
          }
        })
      })

      if (promise) {
        return promise
      }
    },
    validateField(props, cb) {
      props = [].concat(props)
      const fields = this.fields.filter((field) => props.indexOf(field.prop) !== -1)
      if (!fields.length) {
        console.warn('[airbnb Element Warn]please pass correct props!')
        return
      }

      fields.forEach((field) => {
        field.validate('', cb)
      })
    },
    objectAssign(target) {
      for (let i = 1, j = arguments.length; i < j; i++) {
        let source = arguments[i] || {}
        for (let prop in source) {
          if (source.hasOwnProperty(prop)) {
            let value = source[prop]
            if (value !== undefined) {
              target[prop] = value
            }
          }
        }
      }
      return target
    },
  },
}
</script>
