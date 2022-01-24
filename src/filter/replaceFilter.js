import Vue from 'vue'

Vue.filter('phoneFilter', (value) => {
  return !value ? '-' : value.replace(/([0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3')
})

Vue.filter('phoneAllFilter', (value) => {
  if (value) {
    if (value.length >= 10) {
      return value.replace(/([0-9]+)([0-9]{4})([0-9]{4})/, '$1-$2-$3')
    } else {
      return value.replace(/([0-9]{2})([0-9]+)([0-9]{4})/, '$1-$2-$3')
    }
  } else {
    return '-'
  }
})

Vue.filter('timeFilter', (value) => {
  return !value || value.length !== 4 ? '-' : `${value.substr(0, 2)}:${value.substr(2, 2)}`
})

Vue.filter('phoneMaskedFilter', (value) => {
  return !value ? '-' : value.replace(/([0-9]{3})([0-9*]+)([0-9]{4})/, '$1-$2-$3')
})

Vue.filter('replaceAllNullFilter', (text, org, res) => {
  const re = new RegExp(org, 'gi')
  return !text ? '-' : text.replace(re, res)
})

Vue.filter('minSecTimerFilter', (value) => {
  let min = parseInt(`${value / 60}`, 10)
  let sec = parseInt(`${value % 60}`, 10)
  min = min < 10 ? '0' + min : min
  sec = sec < 10 ? '0' + sec : sec
  return !value ? `${min}:${sec}` : `${min}:${sec}`
})

Vue.filter('replaceNewLineFilter', (value) => {
  return !value ? '-' : value.replace(/(?:\r\n|\r|\n)/g, '<br />')
})
