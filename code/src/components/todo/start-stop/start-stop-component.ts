import { render } from "lib/pure-html"
import { Timer, timer } from "lib/timer"
import { DEFAULT_INTERVAL, set, store } from "features/model"

import template from "./form-template.html"
import { distinctUntilChanged } from "lib/observable"

class StartStopComponent extends HTMLElement {
    clock: Timer
    connectedCallback() {
        store
            .pipe(distinctUntilChanged((prev, cur) => prev.timerInterval == cur.timerInterval && prev.timerIsActive == cur.timerIsActive))
            .subscribe(model => {
                this.clock?.stop()
                this.clock = undefined
                if (model.timerIsActive) {
                    this.clock = timer(changeTheCompletedValueOfARandomToDo, timer.milliseconds(model.timerInterval), true)
                    this.clock.start()
                } else {
                    console.log("no timer")
                }
                this.render(model.timerInterval, model.timerIsActive)
            })
        this.render(DEFAULT_INTERVAL, false)
    }
    render(interval: number, timerIsActive: boolean) {
        const startButtonDisabled = timerIsActive ? "disabled" : ""
        const stopButtonDisabled = timerIsActive ? "" : "disabled"
        render(template({ startButtonDisabled, stopButtonDisabled }), this)
        const intervalControl = this.querySelector("input")
        intervalControl.value = interval.toString()
        const startButton = this.querySelector("button[id='start']") as HTMLButtonElement
        const stopButton = this.querySelector("button[id='stop']") as HTMLButtonElement

        const dialog = this.querySelector("dialog")
        startButton.onclick = () => dialog.showModal()
        stopButton.onclick = () => {
            set(model => model.timerIsActive = false)
        }
        const form = dialog.querySelector("form")
        form.onformdata = (event: FormDataEvent) => {
            const formData = event.formData
            const starts = formData.getAll("start")
            const interval = parseInt(formData.getAll("interval")[0] as string)
            console.log("interval is", interval)
            if (starts.length > 0) {
                set(model => {
                    model.timerIsActive = true
                    model.timerInterval = interval
                })
            }
        }
        function close(e: Event) {
            e.preventDefault()
            dialog.close()
        }
        function keyDown(e: KeyboardEvent) {
            if (e.key.toLowerCase() == "Enter".toLowerCase()) {
                close(e)
            }
        }
        const cancelButton = dialog.querySelector("button[name='cancel']") as HTMLButtonElement
        cancelButton.onclick = close
        dialog.onclose = close
        dialog.onkeydown = keyDown
    }
    disconnectedCallback() {
        this.clock?.stop()
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
        //model.todos = produce(todos, todos => todos[randomIndex] = { ...todos[randomIndex], completed: !randomToDo.completed })
        const changedToDo = { ...randomToDo, completed: !randomToDo.completed }
        const changedToDos = [...todos]
        changedToDos[randomIndex] = changedToDo
        model.todos = [...changedToDos]
    })
}
