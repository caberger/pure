import { ToDo } from "./todo"
import { Subject } from "lib/observable"

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
const store = new Subject(state)

function set(recipe: (model: Model) => void) {
    recipe(store.value)
}
export { Model, store, set }