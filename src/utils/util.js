import store from '../store/index'

/**
 * 获取URL的Key值
 * @param name
 * @returns {string | null}
 */
export function getUrlKey (name) {
  // eslint-disable-next-line no-sparse-arrays
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(
    /\+/g, '').replace(/%20/g, '')) || null
}

/**
 * 微信浏览器判断
 * @returns {boolean}
 */
export function isWeiXin () {
  const ua = window.navigator.userAgent.toLowerCase()
  return ua.indexOf('micromessenger') !== -1
}

/**
 * 计算适配px值
 * @param px，传入750宽度下px值
 * @returns {number}
 */
export function getRealPx (px = 60) {
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  return ((screenWidth * 2) / 750) * px
}

/**
 * 修复部分机型(已知：华为Mate10 Pro)rem失效的问题
 */
export function fixFontSize () {
  const ua = navigator.userAgent
  const isIOS = /(iPhone|iPad|iPod)/.test(ua)
  // 非苹果设备，均进行检测
  if (!isIOS) {
    const win = window
    // html根元素
    const HTML_ELEMENT = document.documentElement
    // 屏幕宽度
    const SCREEN_WIDTH = HTML_ELEMENT.clientWidth
    let REAL_BASE_FONT_SIZE = 0
    const BASE_FONT_SIZE = SCREEN_WIDTH / 10
    const div = win.document.createElement('div')
    div.style.width = '10rem'
    win.document.body.appendChild(div)
    win.setTimeout(function () {
      const getWidth = parseFloat(win.getComputedStyle(div).width)
      if (getWidth !== SCREEN_WIDTH) {
        const ratio = getWidth / SCREEN_WIDTH
        REAL_BASE_FONT_SIZE = (BASE_FONT_SIZE / ratio).toFixed(4)
        HTML_ELEMENT.style.fontSize = REAL_BASE_FONT_SIZE + 'px'
      }
      div.remove()
    }, 100)
  }
}

/**
 * 格式化毫秒为mm:ss格式
 * @param timeRemain，剩余秒
 * @returns {string}
 */
export function formatToMMSS (timeRemain) {
  if (timeRemain >= 60) {
    const minutes = Math.floor(timeRemain / 60) >= 10 ? Math.floor(timeRemain / 60) : '0' + Math.floor(timeRemain /
      60)
    const seconds = (timeRemain - minutes * 60) >= 10 ? (timeRemain - minutes * 60) : '0' + (timeRemain - minutes *
      60)
    return `${minutes}:${seconds}`
  } else if (timeRemain > 0) {
    const seconds = timeRemain >= 10 ? timeRemain : '0' + timeRemain
    return `00:${seconds}`
  } else {
    return '00:00'
  }
}

/**
 * 检查微信是否支持开放标签
 */
export function checkWxOpenTagSupport () {
  const wechat = navigator.userAgent.match(/MicroMessenger\/([\d.]+)/i)
  const judgewechat = wechat[1].split('.')
  const v1 = parseInt(judgewechat[0])
  const v2 = parseInt(judgewechat[1])
  const v3 = parseInt(judgewechat[2])
  if (v1 > 7 || (v1 === 7 && v2 > 0) || (v1 === 7 && v2 === 0 && v3 >= 12)) {
    store.commit('SET_WXOPENTAG', true)
  }
}

/**
 * 检查参数是否存在
 * @param value
 * @returns {boolean}
 */
export function paramNotExist (value) {
  return value === null || value === 'null' || value === undefined || value === 'undefined'
}

/**
 * 生成随机数
 * @returns {string}
 */
export function random () {
  return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5)
}

/**
 * 生成区间整数
 * @param Min，最小值
 * @param Max，最大值
 * @returns {*}
 * @constructor
 */
export function randomNumBoth (Min, Max) {
  const Range = Max - Min
  const Rand = Math.random()
  // 四舍五入
  return Min + Math.round(Rand * Range)
}

/**
 * 数字补零
 * @param num，整型数字
 * @param length，长度
 */
export function numFixZero (num, length = 3) {
  return (Array(length).join('0') + num).slice(-length)
}
