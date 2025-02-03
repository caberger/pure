import { set } from "features/model"

const BASE_URL = "https://jsonplaceholder.typicode.com"

export async function fetchAllToDos() {
    const response = await fetch(`${BASE_URL}/todos`)
    const todos = await response.json()
    set(model => model.todos = todos)
}