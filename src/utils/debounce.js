export const debounce = (callback, wait, leading = false) => {
  let inDebounce
  return function () {
    const context = this
    const args = arguments

    // leading 일때 inDebounce 값 선 저장을 위해 사용
    let callNow = leading && !inDebounce

    // leading이 아닌 경우에만 wait 이후 func가 실행되도록 함
    const later = () => {
      inDebounce = null
      if (!leading) callback.apply(context, args)
    }

    // setTimeout이 실행된 Timeout의 ID를 반환하고, clearTimeout()으로 이를 해제
    clearTimeout(inDebounce)
    inDebounce = setTimeout(later, wait)

    // 만약 leading=true이고 inDebounce가 없으면 func를 실행
    if (callNow) callback.apply(context, args)
  }
}
