/** small replacement for RxJs
 * @see https://reactivex.io/
 * @author Christian Aberger
 * (c) Christian Aberger (2025)
 * https://www.aberger.at
 */

/** A function that is called by a subject when something
 */
type Callback<T> = (model: T) => void

/** a function that works on a result */
interface Operator<T> {
    process: (t: T) => T
}

interface Subscription<T> {
    callback: Callback<T>
    operators: Operator<T>[]
}
abstract class Observable<T> {
    abstract subscribe(callback: Callback<T>) : void 
}
/** an Observable that can be subscribed by multiple observers
*/
class Subject<T extends object> extends Observable<T> implements ProxyHandler<T> {
    protected subscriptions: Subscription<T>[] = []
    protected operators: Operator<T>[] = []
    protected proxy: T
    model: T
    lastValue?: T

    /**
     * 
     * @param model the single source of truth model that is observed
     */
    constructor(model: T) {
        super()
        this.model = model
        this.proxy = new Proxy(model, this)
    }
    get(target: T, property: string | symbol, receiver: any): any {
        return Reflect.get(target, property, receiver)
    }
    set(target: T, property: string | symbol, newValue: any, receiver: any) {
        const wasSet = Reflect.set(target, property, newValue, receiver)
        if (wasSet) {
            this.emit(target)
            this.lastValue = target
        }
        return wasSet
    }
    protected emit(t: T) {
        this.subscriptions.forEach(subscription => {
            let result = t
            for (const op of subscription.operators) {
                if (result) {
                    const fn = op.process.bind(this)
                    result = fn(result)
                }
            }
            if (result) {
                subscription.callback(result)
            }
        })
    }
    /** register a function that is called when our model changes */
    subscribe(callback: Callback<T>) {
        const subscription: Subscription<T> = {
            callback: callback,
            operators: [...this.operators]
        }
        this.subscriptions.push(subscription)
        this.emit(this.proxy)
    }
    get value() {
        return this.proxy
    }
    /** add operators that are processed before the callback function is called
    */
    pipe(...operators: Operator<T>[]) {
        operators.forEach(operator => this.operators.push(operator))
        return this
    }
}
/** only do callbackes when the comparator does not say that it is the same.
*/
function distinctUntilChanged<T extends object>(comparator: (prev: T, cur: T) => boolean) {
    const op: Operator<T> = {
        process: function (t: T): T {
            let result = t
            if (this.lastValue) {
                const changed = comparator(this.lastValue!, t)
                if (!changed) {
                    result = undefined
                }
            }
            return result
        }
    }
    return op
}
function filter<T extends object>(filter: (t: T) => boolean) {
    const op: Operator<T> = {
        process: function (t: T): T {
            let result = filter(t) ? t : undefined
            return result
        }
    }
    return op
}
function peek<T extends object>(sideEffekt: (t: T) => void) {
    const op: Operator<T> = {
        process: function (t: T): T {
            const value = this.model
            sideEffekt(value)
            return t
        }
    }
    return op
}
export { Subject, distinctUntilChanged, filter, peek }
