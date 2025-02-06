function clear(element: HTMLElement | ShadowRoot) {
    while(element.firstChild) {
        element.firstChild.remove()
    }
}
function addOrRemoveElementClass(forClass: string, element: HTMLElement, add: boolean) {
    function addRemove() {
        if (element) {
            if (add) {
                element.classList.add(forClass)
            } else {
                element.classList.remove(forClass)
            }
        }
    }
    setTimeout(addRemove, 0)
}

export { clear, addOrRemoveElementClass }