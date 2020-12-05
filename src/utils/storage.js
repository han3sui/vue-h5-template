export function get (key) {
  return window.localStorage.getItem(key)
}

export function set (key, val) {
  window.localStorage.setItem(
    key,
    typeof val !== 'string' ? JSON.stringify(val) : val
  )
}

export function del (key) {
  window.localStorage.removeItem(key)
}

export function clear () {
  window.localStorage.clear()
}
