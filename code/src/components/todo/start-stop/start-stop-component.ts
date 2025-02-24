import { render } from "lib/pure-html"
import { timer } from "lib/timer"
import { set, subscribe } from "features/model"
import { produce } from "lib/immer"

import template from "./form-template.html"

class StartStopComponent extends HTMLElement {
    clock = timer(changeTheCompletedValueOfARandomToDo, timer.milliseconds(100), true)
    connectedCallback() {
        let previousActive: boolean
        subscribe(model => {
            const isActive = model.timerIsActive
            if (previousActive != isActive) {
                previousActive = isActive
                if (isActive && !this.clock.active()) {
                    this.clock.start()
                }
                if (!isActive && this.clock.active()) {
                    this.clock.stop()
                }
                this.render(isActive)    
            }
        })
    }
    render(timerIsActive: boolean) {
        console.log("render start stop")
        const startButtonDisabled = timerIsActive ? "disabled" : ""
        const stopButtonDisabled = timerIsActive ? "" : "disabled"
        render(template({startButtonDisabled, stopButtonDisabled}), this)
        const startButton = this.querySelector("button[id='start']") as HTMLButtonElement
        startButton.onclick = () => dialog.showModal()
        const stopButton = this.querySelector("button[id='stop']") as HTMLButtonElement

        const dialog = this.querySelector("dialog")
        stopButton.onclick = () => {
            console.log("stop clicked")
            set(model => model.timerIsActive = false)
        }
        const form = dialog.querySelector("form")
        form.onformdata = (event: FormDataEvent) => {
            console.log("dialog submitted", event)
            const data = event.formData
            if (event.formData.getAll("start")) {
                set(model => model.timerIsActive = true)
            } else {
                console.log("not started")
            }
        }
    }
    disconnectedCallback() {
        this.clock.stop()
    }
}
customElements.define("start-stop", StartStopComponent)

/** play around with changes
 * Using a timer we choose a random todo near the top of the view and change the "completed" state.
 * Let's see what happens :)
 */
function changeTheCompletedValueOfARandomToDo() {
    set(model => {
        const todos = model.todos
        const randomIndex = (Math.floor(todos.length * Math.random()) % 20) % todos.length
        const randomToDo = todos[randomIndex]
        model.todos = produce(todos, todos => todos[randomIndex] = { ...todos[randomIndex], completed: !randomToDo.completed })
    })
}
