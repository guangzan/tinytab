import { EngineItem } from '@/types'
import { useStorage } from '@vueuse/core'

/**
 * sleep
 * @param ms time
 */
export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 将 16 进制颜色转成 rgb 或 rgba
 * @param {string} hex
 * @param {number} opacity
 */
export function hexToRgba(hex: string, opacity: number): string {
    if (hex.length === 9) hex = hex.substring(0, 7)
    const rgbReg = /^rgb\(/
    if (rgbReg.test(hex)) return hex
    const hexReg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    if (!hexReg.test(hex)) return hex
    const red = parseInt('0x' + hex.slice(1, 3))
    const green = parseInt('0x' + hex.slice(3, 5))
    const blue = parseInt('0x' + hex.slice(5, 7))
    const rgb = `rgb(${red},${green},${blue})`
    if (!opacity) return rgb
    return `rgba(${red},${green},${blue},${opacity})`
}

/**
 * 判断一个属性及其值是否存在引擎列表中
 * @param attr
 * @param value
 * @returns
 */
export function isEngineAttrValue(attr: keyof EngineItem, value: any): boolean {
    const enginesData = JSON.parse(localStorage.enginesData)
    const arr = enginesData.filter(
        (engine: EngineItem) => engine[attr] === value
    )
    const res = arr.length ? true : false
    return res
}

/**
 * 删除数组中指定元素
 * @param arr
 * @param item
 */
export function removeArrItem(arr: any[], item: any) {
    var index = arr.indexOf(item)
    if (index > -1) {
        arr.splice(index, 1)
    }
}

/**
 * 获取更亮和更暗的颜色
 * @param col
 * @param amt
 */
export function lightenDarkenColor(col: string, amt: number) {
    var usePound = false

    if (col[0] == '#') {
        col = col.slice(1)
        usePound = true
    }

    var num = parseInt(col, 16)
    var r = (num >> 16) + amt

    if (r > 255) r = 255
    else if (r < 0) r = 0

    var b = ((num >> 8) & 0x00ff) + amt

    if (b > 255) b = 255
    else if (b < 0) b = 0

    var g = (num & 0x0000ff) + amt

    if (g > 255) g = 255
    else if (g < 0) g = 0

    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
}
