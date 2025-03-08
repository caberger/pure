import { beforeEach } from "node:test"
import { assert, describe, it } from "./node"
import { distinctUntilChanged, Subject } from "lib/observable"

interface Model {
    greeting: string
}
const HELLO = "hello"

describe("subject", () => {
    let greeting = ""
    let store: Subject<Model>
    let state: Model
    function set(recipe: (model: Model) => void) {
        recipe(store.value)
    }
    beforeEach(() => {
        state = {
            greeting: "initial"
        }
        store = new Subject(state)
    })
    /*
    it("subscribe should get change of model", () => {
        store.subscribe(model => {
            greeting = model.greeting
        })
        set(model => model.greeting = HELLO)
        assert.equal(HELLO, greeting)
    })*/
    it("should get only changes", () => {
        let greeting = ""
        let numberOfCallbacksReceived = 0
        store
            .pipe(distinctUntilChanged((previous, current) => previous.greeting == current.greeting))
            .subscribe(model => {
                console.log(`greeting changes from '${greeting}' to`, model.greeting)
                greeting = model.greeting
                numberOfCallbacksReceived++
            })
        set(model => model.greeting = HELLO)
        set(model => model.greeting = HELLO)
        assert.equal(greeting, HELLO, "the greeting should be the same es submitted")
        assert.equal(numberOfCallbacksReceived, 2, "should not repeat unchanged")
    })
})

