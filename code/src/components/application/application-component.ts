import { render } from "lib/pure-html"
import { fetchAllToDos } from "features/todo"
import "components/todo"
import "components/menu"
import "components/user/user-component"
import { Model, store } from "features/model"
import application from "./application-component-template.html"
import { distinctUntilChanged } from "lib/observable"


class ApplicationElement extends HTMLElement {
    async connectedCallback() {
        this.render()

        document.title = "ToDos - Demo"
        function paneIsEqual(prev: Model, cur: Model) {
            return prev.currentPane == cur.currentPane
        }
        store
            .pipe(distinctUntilChanged(paneIsEqual))
            .subscribe(model => this.show(model.currentPane))
        fetchAllToDos()
        //this.show(store.model.currentPane)
    }
    render() {
        render(application(), this)

        this
            .querySelector("todo-table")
            .addEventListener("todo-selected", (e: CustomEvent<number>) => this.toDoSelected(e))
    }
    show(pane: string) {
        const tab = pane == "/" ? "/todos" : pane
        const panes = ["todo-table", "user-table"]
        panes.forEach(el => {
            const element = this.querySelector(el) as HTMLElement
            if (element.dataset.pane == tab) {
                element.removeAttribute("hidden")
            } else {
                element.setAttribute("hidden", "")
            }
        })
    }
    toDoSelected(event: CustomEvent<number>): void {
        const id = event.detail
        alert(`todo ${id} has been selected`)
    }
}
customElements.define("application-component", ApplicationElement)
