import { html, render } from "lib/pure-html"
import { ToDo, fetchAllToDos } from "features/todo"
import "components/todo"
import "components/menu"
import "components/user/user-component"
import { subscribe } from "features/model"


async function waitForElements() {
    [
        "application-menu",
        "todo-table",
        "user-table"
    ].forEach(el => customElements.whenDefined(el))
}
class ApplicationElement extends HTMLElement {
    async connectedCallback() {
        document.title = "ToDos - Demo"
        await waitForElements()
        subscribe(model => this.render(model.currentPane))
        this
            .querySelector("todo-table")
            .addEventListener("todo-selected", (e: CustomEvent<ToDo>) => this.tick(e))
        fetchAllToDos()        
    }
    render(pane: string) {
        const todoHidden = pane != "/todos" ? "hidden" : ""
        const userTableHidden = pane != "/users" ? "hidden" : ""
        const template = html`
            <application-menu></application-menu>
            <todo-table ${todoHidden}></todo-table>
            <user-table ${userTableHidden}></user-table>
        `
        render(template, this)
    }
    tick(event: CustomEvent<ToDo>): void {
        const todo = event.detail
        console.log("todo selected", todo)
    }
}
customElements.define("application-component", ApplicationElement)