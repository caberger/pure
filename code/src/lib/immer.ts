/** small replacement for immer.js
 * @see https://immerjs.github.io/immer/
 * (c) Christian Aberger (2025)
 * @author Christian Aberger
 * https://www.aberger.at
 */

function produce<T>(baseState: T, recipe: (draft: T) => void) {
    const clone = structuredClone(baseState)
    recipe(clone)
    return clone
}
export { produce }