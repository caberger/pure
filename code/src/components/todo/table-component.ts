import { produce } from "lib/immer"
import { subscribe, set } from "features/model"

import toDoTableWithHeader from "./table-template.html"

import { ToDo } from "features/todo"
import { html, render } from "lib/pure-html"
import { seconds, timer } from "lib/timer"
import { addOrRemoveElementClass, clear } from "lib/util"

class ToDoTable extends HTMLElement {
    static observedAttributes = ["hidden"]
    clock = timer(changeTheCompletedValueOfARandomToDo, seconds(1), true)

    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    attributeChangedCallback(name: string, old: string, value: string) {
        addOrRemoveElementClass("fadein", this.shadowRoot.querySelector("div"), this.getAttribute("hidden") === null)
    }
    connectedCallback() {
        render(toDoTableWithHeader(""), this.shadowRoot)
        subscribe(model => this.renderATableOf(model.todos))
    }
    disconnectedCallback() {
        this.clock.stop()
    }
    renderATableOf(todos: ToDo[]) {
        const bodyOfTable = this.shadowRoot.querySelector("tbody")
        clear(bodyOfTable)
        todos.forEach(todo => {
            const insertedTableRowElement = bodyOfTable.insertRow()
            insertedTableRowElement.onclick = () => this.aTableRowHasBeenClickedFor(todo)
            render(todoRowContentsOf(todo), insertedTableRowElement)
        })
        const table = this.shadowRoot.querySelector("table")
    }
    aTableRowHasBeenClickedFor(toDo: ToDo) {
        this.clock.stop()
        this.dispatchEvent(new CustomEvent("todo-selected", { detail: toDo })) // please explain: why do we not reveive this ?

        const youHaveConfirmedToStartATimer = confirm(`toDo #${toDo.id}: "${toDo.title}" ... do you want to start a timer?`)
        if (youHaveConfirmedToStartATimer) {
            this.clock.start()
        }
    }
}
customElements.define("todo-table", ToDoTable)

const todoRowContentsOf = (todo: ToDo) => html`
    <td class="right">${todo.id}</td>
    <td>${todo.title}</td>
    <td>${todo.completed}</td>
`
/** play around with changes
 * Using a timer we choose a random todo near the top of the view and change the "completed" state.
 * Let's see what happens :)
 */
function changeTheCompletedValueOfARandomToDo() {
    set(model => {
        const todos = model.todos
        const randomIndex = (Math.floor(todos.length * Math.random()) % 10) % todos.length
        const randomToDo = todos[randomIndex]
        model.todos = produce(todos, todos => todos[randomIndex] = { ...todos[randomIndex], completed: !randomToDo.completed })
    })
}
