/**
 * sleep
 * @param ms time
 */
export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 将 16 进制颜色转成 rgb 或 rgba
 * @param {string} hex
 * @param {number} opacity
 */
export function hexToRgba(hex: string, opacity: number): string {
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
