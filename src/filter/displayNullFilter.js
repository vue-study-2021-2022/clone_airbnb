import Vue from 'vue'

Vue.filter('displayNullFilter', (value) => {
  return !value || value === 'Invalid date' ? '-' : value
})

Vue.filter('displayUseYnNullFilter', (value) => {
  if (!value || value === 'Invalid date') {
    return '-'
  }
  return value === 'Y' ? '사용' : '미사용'
})
