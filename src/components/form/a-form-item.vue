<template>
  <div class="form-item">
    <div class="layout-left">
      <slot name="layout-left"></slot>
    </div>
    <div class="layout-center">
      <slot></slot>
      <div v-if="validateState === 'error' && validateMessage && validateMessage !== ''">
        <p class="error-text">{{ validateMessage }}</p>
      </div>
      <slot name="text"></slot>
    </div>
    <div class="layout-right">
      <slot name="layout-right"></slot>
    </div>
  </div>
</template>

<script>
import emitter from '@/mixins/emitter'

export default {
  name: 'AFormItem',
  componentName: 'airbnbFormItem',
  provide() {
    return {
      airbnbFormItem: this,
    }
  },
  inject: ['airbnbForm'],
  mixins: [emitter],
  props: {
    // eslint-disable-next-line vue/require-default-prop
    prop: String,
    // eslint-disable-next-line vue/require-default-prop
    rules: [Object, Array],
  },
  data() {
    return {
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      isNested: false,
    }
  },
  computed: {
    form() {
      let parent = this.$parent
      let parentName = parent.$options.componentName
      while (parentName !== 'airbnbForm') {
        if (parentName === 'airbnbFormItem') {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.isNested = true
        }
        parent = parent.$parent
        parentName = parent.$options.componentName
      }
      return parent
    },
    fieldValue() {
      const model = this.form.model
      if (!model || !this.prop) {
        return
      }

      let path = this.prop
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }

      return this.getPropByPath(model, path, true).v
    },
  },
  mounted() {
    if (this.prop) {
      this.dispatch('airbnbForm', 'airbnb.form.addField', [this])

      let initialValue = this.fieldValue
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue)
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue,
      })

      this.addValidateEvents()
    }
  },
  beforeDestroy() {
    this.dispatch('airbnbForm', 'airbnb.form.removeField', [this])
  },
  methods: {
    validate(trigger, callback) {
      this.validateDisabled = false
      const rules = this.getFilteredRule(trigger)
      if (!rules || rules.length === 0) {
        if (callback) {
          if (typeof callback === 'function') {
            callback()
          } else {
            return callback
          }
        } else {
          return
        }
      }

      const value = this.fieldValue
      let validateResult = {
        result: true,
        message: '',
      }
      rules.some((object) => {
        if (object.validator && typeof object.validator === 'function') {
          validateResult = object.validator(value)
        } else if (object.error_msg) {
          if (
            (typeof value === 'string' && (value.length === 0 || value.trim().length === 0)) ||
            (typeof value === 'boolean' && !value)
          ) {
            validateResult = {
              result: false,
              message: object.error_msg,
            }
          } else if (object.success_msg) {
            validateResult = {
              result: true,
              message: object.success_msg,
            }
          }
        }
        return !validateResult.result
      })

      this.validateState = validateResult.result ? 'success' : 'error'
      this.validateMessage = validateResult.message

      if (callback) {
        if (typeof callback === 'function') {
          callback(this.validateState, this.validateMessage)
        } else {
          return callback
        }
      }
    },
    resetField() {
      this.validateState = ''
      this.validateMessage = ''

      const model = this.form.model
      const value = this.fieldValue
      let path = this.prop
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }

      const prop = this.getPropByPath(model, path, true)

      this.validateDisabled = true
      if (Array.isArray(value)) {
        prop.o[prop.k] = [].concat(this.initialValue)
      } else {
        prop.o[prop.k] = this.initialValue
      }

      this.$nextTick(() => {
        this.validateDisabled = false
      })
    },
    clearValidate() {
      this.validateState = ''
      this.validateMessage = ''
      this.validateDisabled = false
    },
    getRules() {
      let formRules = this.form.rules
      const selfRules = this.rules

      const prop = this.getPropByPath(formRules, this.prop || '')
      formRules = formRules ? prop.o[this.prop || ''] || prop.v : []

      return [].concat(selfRules || formRules || [])
    },
    getFilteredRule(trigger) {
      const rules = this.getRules()

      return rules.filter((rule) => {
        if (!rule.trigger || trigger === '') {
          return true
        }
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1
        } else {
          return rule.trigger === trigger
        }
      })
    },
    addValidateEvents() {
      const rules = this.getRules()
      if (rules.length) {
        this.$on('airbnb.form.blur', this.onFieldBlur)
        this.$on('airbnb.form.change', this.onFieldChange)
      }
    },
    removeValidateEvents() {
      this.$off()
    },
    onFieldBlur() {
      this.validate('blur')
    },
    onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false
        return
      }
      this.validate('change')
    },
    getPropByPath(obj, path, strict) {
      let tempObj = obj
      path = path.replace(/\[(\w+)\]/g, '.$1')
      path = path.replace(/^\./, '')

      let keyArr = path.split('.')
      let i = 0
      for (let len = keyArr.length; i < len - 1; ++i) {
        if (!tempObj && !strict) {
          break
        }
        let key = keyArr[i]
        if (key in tempObj) {
          tempObj = tempObj[key]
        } else {
          if (strict) {
            throw new Error('please transfer a valid prop path to form item!')
          }
          break
        }
      }
      return {
        o: tempObj,
        k: keyArr[i],
        v: tempObj ? tempObj[keyArr[i]] : null,
      }
    },
  },
}
</script>
