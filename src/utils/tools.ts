/**
 * sleep
 * @param ms time
 */
export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
