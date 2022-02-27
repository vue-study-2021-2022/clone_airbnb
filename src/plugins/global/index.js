import Vue from 'vue'
import Button from '@/components/elements/button'
import Input from '@/components/elements/input'
import Checkbox from '@/components/elements/checkbox'
import CheckboxGroup from '@/components/elements/checkbox/a-check-group'
import Radio from '@/components/elements/radio'
import Select from '@/components/elements/selectCustom/a-select.vue'
import Option from '@/components/elements/selectCustom/a-option.vue'
import Textarea from '@/components/elements/textarea'
import Form from '@/components/form/a-form.vue'
import FormItem from '@/components/form/a-form-item.vue'
import Dialog from '@/components/dialog'
import Switch from '@/components/elements/switch'

const components = [
  Button,
  Input,
  Checkbox,
  CheckboxGroup,
  Radio,
  Select,
  Option,
  Textarea,
  Dialog,
  Form,
  FormItem,
  Switch,
]

components.forEach((component) => {
  Vue.component(component.name, component)
})
