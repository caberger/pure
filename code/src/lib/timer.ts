/** small timer utility
 * (c) Christian Aberger (2025)
 * @author Christian Aberger
 * https://www.aberger.at
 */

function timer(callback: () => void, ms: number) {
    let timer: NodeJS.Timeout

    function start() {
        timer = setInterval(callback, ms)
    }
    function stop() {
        if (timer) {
            clearInterval(timer)
        }
        timer = undefined
    }
    return { start, stop }
}
function milliSeconds(ms: number) {
    return ms
}
function seconds(seconds: number) {
    return 1000 * milliSeconds(seconds)
}

function fadeOut(element: HTMLElement) {
    let opacity = 100  // initial opacity
    var timer = setInterval(() => {
        if (opacity <= 10){
            clearInterval(timer)
            element.style.display = 'none'
        }
        element.style.opacity = opacity.toString()
        element.style.filter = `alpha(opacity=${opacity})`
        opacity -= opacity * 0.1
    }, 50)
}

export { timer, seconds, milliSeconds }