import { set } from "features/model"

const BASE_URL = "/data"

export async function fetchAllToDos() {
    const response = await fetch(`${BASE_URL}/todos.json`)
    const todos = await response.json()
    console.log("todos loaded", todos)
    set(model => model.todos = todos)
}