import { ToDo } from "./todo"
import { apply, Subject } from "lib/observable"
import { WriteableDraft } from "../lib/immer"

const DEFAULT_INTERVAL = 100

interface Model {
    readonly todos: ToDo[]
    readonly currentPane: string
    readonly timerInterval: number
    readonly timerIsActive: boolean
}
const state: Model = {
    todos: [],
    currentPane: "/",
    timerInterval: DEFAULT_INTERVAL,
    timerIsActive: false,
}

const store = new Subject(state)

function set(recipe: (model: WriteableDraft<Model>) => void) {
    apply(store, recipe)
}
export { Model, store, set, DEFAULT_INTERVAL }