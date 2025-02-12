import JabberPkg from "jabber"
const Jabber = JabberPkg.default
import { writeFileSync } from "node:fs"

const NUMBER_OF_ENTRIES = 50
const OUTPUT_FILE_NAME = "./data/todos.json"

const themeWords = [
    "vanilla",
    "javascript",
    "DOM",
    "callback",
    "CustomElement",
    "History-Api",
    "CustomEvent",
    "ShadowDom",
    "ShadowRoot",
    "attributeChangedCallback",
    "ObservedAttributes",
    "TemplateLiteral-String",
    "Proxy",
    "CanIUse",
    "Module",
    "Node",
    "alert",
    "confirm",
    "document",
    "window",
    "typescript",
    "gitignore",
    "html",
    "folder",
    "stylesheet",
    "link",
    "this",
    "href",
    "css",
    "get",
    "set",
    "connectedCallback",
    "disconnectedCallback",
    "constructor",
    "super",
    "attributeChanged",
    "extends",
    "implements",
    "const",
    "let",
    "var",
    "type",
    "for",
    "template",
    "customElements",
    "undefined",
    "null",
    "class",
    "interface",
    "forEach",
    "Reflect",
    "Generic",
    "function",
    "while",
    "return",
    "export",
    "import",
    "default",
    "try",
    "catch",
    "encodeURI",
    "encodeURIComponent",
    "Uint8Array",
    "Array",
    "static",
    "string",
    "number",
    "boolean"
]
const jabber = new Jabber(themeWords, 3, "öäü", "ß")

const todos = []
let userId = 0
for (let id = 1; id <= NUMBER_OF_ENTRIES; id++) {
    if (0 == id % 10) {
        userId++
    }
    const completed = Math.random() > 0.5
    const title = jabber.createParagraph(40)
    const todo = {
        userId,
        id,
        title,
        completed
    }
    todos.push(todo)
}
const contents = JSON.stringify(todos, undefined, 4)
writeFileSync(OUTPUT_FILE_NAME, contents)
