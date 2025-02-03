import { ToDo } from "./todo/todo"
import { Observable } from "lib/observable"

interface Model {
    todos: ToDo[]
}
const state: Model = {
    todos: []
}
const store = new Observable(state)

function set(recipe: (model: Model) => void) {
    recipe(store.value)
}
function subscribe(observer: (model: Model) => void) {
    store.subscribe(observer)
}
export { Model, subscribe, set }