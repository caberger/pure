import { html, render } from "lib/pure-html"
import "components/todo/table-component"
import { ToDo, fetchAllToDos } from "features/todo"

class ApplicationElement extends HTMLElement {
    connectedCallback() {
        document.title = "ToDos - Demo"
        render(this.template(), this)
        this
            .querySelector("todo-table")
            .addEventListener("todo-tick", (e: CustomEvent<ToDo>) => this.tick(e))
        fetchAllToDos()        
    }
    tick(event: CustomEvent<ToDo>): void {
        const todo = event.detail
        console.log("todo changed", todo)
    }
    template() {
        return html`<todo-table></todo-table>`
    }
}
customElements.define("application-component", ApplicationElement)