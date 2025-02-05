import { set } from "features/model"

const BASE_URL = "/data"

export async function fetchAllToDos() {
    const response = await fetch(`${BASE_URL}/todos.json`)
    const todos = await response.json()
    set(model => model.todos = todos)
}