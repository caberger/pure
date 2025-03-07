import { set } from "features/model"

const START_PANE = "/todos"

interface NavigationState {
    pane: string
}

handleInitialPageLoad()

function handleInitialPageLoad() {
    window.addEventListener("popstate", (event: PopStateEvent) => {
        const state = event.state as NavigationState
        console.log("pop state")
        set(model => model.currentPane = state.pane)
    })
    const state = createNavigationStateWith(document.location.href)
    console.log("replace state", state)
    history.replaceState(state, "")
    set(model => model.currentPane = state.pane)
}
function createNavigationStateWith(location: string) {
    const url = new URL(location)
    let pane = url.pathname
    if (pane == "/") {
        pane = START_PANE
    }
    const state: NavigationState = {
        pane
    }
    return state
}

function addLinks(element: HTMLElement | ShadowRoot) {
    const linksList = element.querySelectorAll("a")
    const links = Array.from(linksList)
    links.forEach(a => {
        a.onclick = (e: MouseEvent) => {
            e.preventDefault()
            const state = createNavigationStateWith(a.href)
            console.log("push state=", state,)
            history.pushState(state, "", state.pane)
            set(model => model.currentPane = state.pane)
        }
    })
}

export { addLinks }

