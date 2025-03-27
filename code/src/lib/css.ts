import { deprecate } from "node:util"

/** small replacement for RxJs.
 * Do not use in production.
 * For educational purposes only.
 * @see https://reactivex.io/
 * @author Christian Aberger
 * (c) Christian Aberger (2025)
 * https://www.aberger.at
 */

/** adopt all styles from the document to the shadow root
@param shadowRoot the shadow root of the custom element to add styles to
@param styles additional styles to adopt
*/
function addDocumentStyles(shadowRoot: ShadowRoot, styles?: CSSStyleSheet[]) {
    document.head.querySelectorAll<HTMLLinkElement>("link[rel='stylesheet']").forEach(link => {
        const clone = link.cloneNode()
        shadowRoot.appendChild(clone)
    })
    if (styles) {
        shadowRoot.adoptedStyleSheets.push(...styles)
    }
}
export { addDocumentStyles }
