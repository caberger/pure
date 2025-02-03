import { fetchAllToDos } from "features/todo/todo-service"
import "features/todo/table-component"

window.addEventListener("DOMContentLoaded", start)

function start() {
    document.body.innerHTML = "<todo-table></todo-table>"
    document.title = "ToDos - Demo"
    fetchAllToDos()
}

