import { html, render } from "lib/pure-html"
import template from "./user-component-template.html"

class UserElement extends HTMLElement {
    connectedCallback() {
        render(template(""), this)
    }
}

customElements.define("user-table", UserElement)