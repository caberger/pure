/** a webpack loader to load html-templates.
 * Do not use in production.
 * For educational purposes only.
 * (c) Christian Aberger (2025)
 * @author Christian Aberger
 * https://www.aberger.at
 */

function styleLoader(content: string) {
    const code = `
        function css() {
            const cssStyleSheet = new CSSStyleSheet()
            cssStyleSheet.replaceSync(\`${content}\`)
            return cssStyleSheet
        }
    `
    const exportString = "module.exports = " + code
    return exportString
}
export default styleLoader
