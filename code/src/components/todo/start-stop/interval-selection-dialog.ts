
import { render } from "lib/pure-html"
import template from "./dialog-template.html"

class IntervalSelectionDialog extends HTMLElement {
    connectedCallback() {
        console.log("int sel selected")
        render(template(), this)
    }
}
customElements.define("interval-select", IntervalSelectionDialog)