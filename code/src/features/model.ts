import { ToDo } from "./todo"
import { Observable } from "lib/observable"

interface Model {
    todos: ToDo[]
    currentPane: string
    timerIsActive: boolean
}
const state: Model = {
    todos: [],
    currentPane: "/todos",
    timerIsActive: false
}
const store = new Observable(state)

function set(recipe: (model: Model) => void) {
    recipe(store.value)
}
function subscribe(observer: (model: Model) => void) {
    store.subscribe(observer)
}
export { Model, subscribe, set }