/** small replacement for lit-html
 * @see https://github.com/lit/lit/tree/main/packages/lit-html
 * (c) Christian Aberger (2025)
 * @author Christian Aberger
 * https://www.aberger.at
 */
const html = (strings: TemplateStringsArray, ...values: any[]) => {
    const template = document.createElement("template")
    template.innerHTML = String.raw({ raw: strings }, ...values)
    return template
}

function render(template: HTMLTemplateElement, at: HTMLElement | ShadowRoot) {
    while(at.firstChild) {
        at.firstChild.remove()
    }
    const content = template.content.cloneNode(true)
    at.appendChild(content)
}
export { html, render }