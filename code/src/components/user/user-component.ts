import { render } from "lib/pure-html"
import user from "./user-component-template.html"

class UserElement extends HTMLElement {
    connectedCallback() {
        render(user(), this)
    }
}

customElements.define("user-table", UserElement)