/** small timer utility
 * (c) Christian Aberger (2025)
 * @author Christian Aberger
 * https://www.aberger.at
 */

function timer(callback: () => void, ms: number, repeat: boolean = false) {
    let timer: NodeJS.Timeout

    function start() {
        const tick = repeat ? setInterval : setTimeout
        timer = tick(callback, ms)
    }
    function stop() {
        if (timer) {
            clearInterval(timer)
        }
        timer = undefined
    }
    function active() {
        return !!timer
    }
    function milliSeconds(ms: number) {
        return ms
    }
    const seconds = (seconds: number) => 1000 * seconds
    return { start, stop, active }
}
function milliSeconds(ms: number) {
    return ms
}
timer.milliseconds = milliSeconds
timer.seconds = (seconds: number) => 1000 * milliSeconds(seconds)

type Callback = (...args: any[]) => void

const debounce = (callback: Callback, wait: number) => {
    let timeoutId: number
    return (...args: any[]) => {
        window.clearTimeout(timeoutId)
        timeoutId = window.setTimeout(() => callback(...args), wait)
    }
}
function throttle(callback: Callback, delay = 1000) {
    let shouldWait = false

    return (...args: any[]) => {
        if (!shouldWait) {
            callback(...args)
            shouldWait = true
            setTimeout(() => shouldWait = false, delay)
        }
    }
}
export { timer, debounce, throttle }