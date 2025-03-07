import { ToDo } from "./todo"
import { Subject } from "lib/observable"

const DEFAULT_INTERVAL = 100
interface Model {
    todos: ToDo[]
    currentPane: string
    timerInterval: number
    timerIsActive: boolean
}
const state: Model = {
    todos: [],
    currentPane: "/",
    timerInterval: DEFAULT_INTERVAL,
    timerIsActive: false,
}
const store = new Subject(state)

function set(recipe: (model: Model) => void) {
    recipe(store.value)
}
export { Model, store, set, DEFAULT_INTERVAL }