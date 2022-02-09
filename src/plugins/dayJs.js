import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import Vue from 'vue'

dayjs.locale('ko')

const dayjsPlugins = {
  install(Vue, options) {
    Vue.prototype.$dayjs = dayjs
  },
}
Vue.use(dayjsPlugins)
