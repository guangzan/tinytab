import type * as TT from '@/types'

/**
 * sleep
 */
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 将 16 进制颜色转成 rgb 或 rgba
 */
export function hexToRgba(hex: string, opacity: number): string {
  if (hex.length === 9)
    hex = hex.substring(0, 7)
  const rgbReg = /^rgb\(/
  if (rgbReg.test(hex))
    return hex
  const hexReg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  if (!hexReg.test(hex))
    return hex
  const red = Number.parseInt(`0x${hex.slice(1, 3)}`)
  const green = Number.parseInt(`0x${hex.slice(3, 5)}`)
  const blue = Number.parseInt(`0x${hex.slice(5, 7)}`)
  const rgb = `rgb(${red},${green},${blue})`
  if (!opacity)
    return rgb
  return `rgba(${red},${green},${blue},${opacity})`
}

/**
 * 删除数组中指定元素
 */
export function removeArrItem(arr: TT.TTVisibleElements[], item: TT.TTVisibleElements[][number]): TT.TTVisibleElements[] {
  const index = arr.indexOf(item)
  if (index > -1)
    arr.splice(index, 1)

  return arr
}

/**
 * 获取更亮和更暗的颜色
 */
export function lightenDarkenColor(col: string, amt: number) {
  let usePound = false

  if (col[0] === '#') {
    col = col.slice(1)
    usePound = true
  }

  const num = Number.parseInt(col, 16)
  let r = (num >> 16) + amt

  if (r > 255)
    r = 255
  else if (r < 0)
    r = 0

  let b = ((num >> 8) & 0x00FF) + amt

  if (b > 255)
    b = 255
  else if (b < 0)
    b = 0

  let g = (num & 0x0000FF) + amt

  if (g > 255)
    g = 255
  else if (g < 0)
    g = 0

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
}

export function getStringBetween(str: string, start: string, end: string) {
  const startIndex = str.indexOf(start) + start.length
  const endIndex = str.indexOf(end)
  return str.substring(startIndex, endIndex)
}

export function updateObject<T extends object, K extends keyof T>(obj: T, key: K, value: T[K]): void {
  obj[key] = value
}
