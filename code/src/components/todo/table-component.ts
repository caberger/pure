import { store } from "features/model"

import { ToDo } from "features/todo"
import { html, render } from "lib/pure-html"
import { addOrRemoveElementClass, truncate } from "lib/util"
import "./start-stop/start-stop-component"
import { addDocumentStyles } from "lib/css"

import toDoTableWithHeader from "./table-template.html"
import css from "./table.css"

class ToDoTable extends HTMLElement {
    static observedAttributes = ["hidden"]
    root: ShadowRoot

    constructor() {
        super()
        this.root = this.attachShadow({ mode: "closed" })
    }
    attributeChangedCallback(name: string) {
        name == "hidden" ?
            addOrRemoveElementClass("fadein", this.root.querySelector("div"), this.getAttribute("hidden") === null) :
            console.error("unknown attr", name)
    }
    connectedCallback() {
        this.renderTable()
        addDocumentStyles(this.root, [css()])
        store
            //.pipe(distinctUntilChanged((prev, cur) => prev.todos == cur.todos))
            .subscribe(model => this.renderBodyOfTableFor(model.todos))
    }
    get table() {
        return this.root.querySelector("table")
    }
    renderTable() {
        render(toDoTableWithHeader(), this.root)
        this.table.onclick = (e: PointerEvent) => {
            const target = e.target as HTMLElement
            const tr = target.closest("tr")
            if (tr) {
                const id = parseInt(tr.getAttribute("id"))
                this.aTableRowHasBeenClickedFor(id)
            }
        }
    }
    renderBodyOfTableFor(todos: ToDo[]) {
        //console.log("render body")
        const bodyOfTable = this.root.querySelector("tbody")
        const caption = this.table.querySelector("caption")
        const incompletedCount = todos.reduce((sum, todo) => todo.completed ? sum : sum + 1, 0)
        caption.innerText = `Number of open tasks: ${incompletedCount}`
        bodyOfTable.innerHTML = ""
        todos.forEach(todo => {
            const id = todo.id.toString()
            const row = bodyOfTable.insertRow()
            row.setAttribute("id", id)
            row.append(todoRowTemplate.content.cloneNode(true))
            const cols = Array.from(row.querySelectorAll("td"))
            cols[0].innerText = id
            cols[1].innerHTML = truncate(todo.title, 80)
            cols[2].innerText = todo.completed.toString()
            bodyOfTable.appendChild(row)
        })
    }
    aTableRowHasBeenClickedFor(id: number) {
        this.dispatchEvent(new CustomEvent("todo-selected", { detail: id })) // please explain: why do we not reveive this ?
    }
}
customElements.define("todo-table", ToDoTable)

const todoRowTemplate = html`
    <td class="right"></td>
    <td></td>
    <td></td>
`
