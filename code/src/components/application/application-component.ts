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

        fetchAllToDos()        
    }
    render(pane: string) {
        const template = html`
            <application-menu></application-menu>
            <todo-table hidden data-pane="/todos"></todo-table>
            <user-table hidden data-pane="/users"></user-table>
        `
        if (!this.firstChild) {
            render(template, this)
            this
                .querySelector("todo-table")
                .addEventListener("todo-selected", (e: CustomEvent<ToDo>) => this.tick(e))
        } else {
            this.update(pane)
        }
    }
    update(pane: string) {
        const panes = ["todo-table", "user-table"]
        panes.forEach(el => {
            const element = this.querySelector(el) as HTMLElement
            const elementPane = element.dataset.pane
            if (elementPane == pane) {
                element.removeAttribute("hidden")
            } else {
                element.setAttribute("hidden", "")
            }
        })
    }
    tick(event: CustomEvent<ToDo>): void {
        const todo = event.detail
        console.log("todo selected", todo)
    }
}
customElements.define("application-component", ApplicationElement)