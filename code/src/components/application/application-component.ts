import { render } from "lib/pure-html"
import { ToDo, fetchAllToDos } from "features/todo"
import "components/todo"
import "components/menu"
import "components/user/user-component"
import { subscribe } from "features/model"
import application from "./application-component-template.html"

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
        this.render()

        subscribe(model => this.show(model.currentPane))

        fetchAllToDos()        
    }
    render() {
        render(application(), this)

        this
            .querySelector("todo-table")
            .addEventListener("todo-selected", (e: CustomEvent<ToDo>) => this.tick(e))
    }
    show(pane: string) {
        const panes = ["todo-table", "user-table"]
        panes.forEach(el => {
            const element = this.querySelector(el) as HTMLElement
            if (element.dataset.pane == pane) {
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
