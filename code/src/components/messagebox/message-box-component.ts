class MessageBox extends HTMLDialogElement {
    static is = "message-box"
    connectedCallback() {
        console.log("message box connected")
    }
}
customElements.define(MessageBox.is, MessageBox)