import { produce } from "lib/immer"
import { subscribe, set } from "features/model"

import toDoTableWithHeader from "./table-template.html"

import { ToDo } from "./todo"
import { html, render } from "lib/pure-html"
import { seconds, timer } from "lib/timer"

class ToDoTable extends HTMLElement {
    clock = timer(changeTheCompletedValueOfARandomToDo, seconds(1))

    constructor() {
        super()
        this.attachShadow({ mode: "open"})
    }
    connectedCallback() {
        subscribe(model => this.renderATableOf(model.todos))
    }
    renderATableOf(todos: ToDo[]) {
        render(toDoTableWithHeader("ToDos"), this.shadowRoot)
        const bodyOfTable = this.shadowRoot.querySelector("tbody")
        todos.forEach(todo => {
            const insertedTableRowElement = bodyOfTable.insertRow()
            render(todoRowContentsOf(todo), insertedTableRowElement)
            insertedTableRowElement.onclick = () => this.aTableRowHasBeenClickedFor(todo)
        })
    }
    aTableRowHasBeenClickedFor(toDo: ToDo) {
        this.clock.stop()
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
        model.todos = produce(todos, todos => todos[randomIndex] = {...todos[randomIndex], completed: !randomToDo.completed})   
    })
}
