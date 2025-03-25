/** Map files ending with -template.html to your loader.
 * (c) Christian Aberger (2025)
 * Do not use in production.
 * For educational purposes only.
 * @author Christian Aberger
 * https://www.aberger.at
 */

declare module "*.css" {
    const value: () => CSSStyleSheet
    export default value
}
