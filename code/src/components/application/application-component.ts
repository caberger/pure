import { html, render } from "lib/pure-html"
import "components/todo/table-component"
import { ToDo, fetchAllToDos } from "features/todo"

class ApplicationElement extends HTMLElement {
    connectedCallback() {
        document.title = "ToDos - Demo"
        this.addEventListener("todo-tick", (e: CustomEvent<ToDo>) => this.tick(e))
        render(this.template(), this)
        fetchAllToDos()        
    }
    tick(event: CustomEvent<ToDo>): void {
        const todo = event.detail
        console.log("todo chaned", todo)
    }
    template() {
        return html`<todo-table></todo-table>`
    }
}
customElements.define("application-component", ApplicationElement)