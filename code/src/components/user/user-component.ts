import { html, render } from "lib/pure-html"

class UserElement extends HTMLElement {
    connectedCallback() {
        const template = html`
            <style>
                div {
                    display: flex;
                    justify-content: center;
                }
            </style>
            <div>
                <h3>TODO: implement a user table</h3>
            </div>
        `
        render(template, this)
    }
}

customElements.define("user-table", UserElement)