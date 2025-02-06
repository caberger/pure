//const Jabber = import("jabber")
import JabberPkg from "jabber"
//const { Jabber } = JabberPkg
const Jabber = JabberPkg.default
import { writeFileSync } from "node:fs"

const OUTPUT_FILE_NAME = "./data/todos.json"

const themeWords = [
    "vanilla",
    "javascript",
    "DOM",
    "callback",
    "Custom-Element",
    "History-Api",
    "CustomEvent",
    "ShadowDom",
    "ShadowRoot",
    "attributeChangedCallback",
    "ObservedAttributes"
]
const jabber = new Jabber(themeWords, 5)

const todos = []
let userId = 0
for (let index = 1; index <= 100; index++) {
    if (0 == index % 10) {
        userId++
    }
    const todo = {
        userId,
        id: index,
        title: jabber.createParagraph(30),
        completed: false
    }
    todos.push(todo)
}
const contents = JSON.stringify(todos, undefined, 4)
writeFileSync(OUTPUT_FILE_NAME, contents)
