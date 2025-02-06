import { render } from "lib/pure-html"
import menu from "./menu-template.html"
import { addLinks } from "lib/router"

class MenuElement extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        this.render()        
    }
    render() {
        render(menu(), this.shadowRoot)
        addLinks(this.shadowRoot)
    }
}
customElements.define("application-menu", MenuElement)