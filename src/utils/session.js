export function get (key) {
  return window.sessionStorage.getItem(key)
}

export function set (key, val) {
  window.sessionStorage.setItem(
    key,
    typeof val !== 'string' ? JSON.stringify(val) : val
  )
}

export function del (key) {
  window.sessionStorage.removeItem(key)
}

export function clear () {
  window.sessionStorage.clear()
}
