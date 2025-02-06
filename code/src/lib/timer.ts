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
    return { start, stop }
}
function milliSeconds(ms: number) {
    return ms
}
function seconds(seconds: number) {
    return 1000 * milliSeconds(seconds)
}

export { timer, seconds, milliSeconds }