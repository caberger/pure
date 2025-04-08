import css from "./audio.css"
import template from "./audio-recorder-template.html"
import { render } from "lib/pure-html"
import { addDocumentStyles } from "lib/css"
import { Recorder } from "./recorder"

type Action = "record" | "stop" | "close"
type Operator = (this: AudioRecorderDialog, event: Event) => void

const actions = new Map<Action, Operator>
actions.set("record", startRecording)
actions.set("close", close)
actions.set("stop", stopRecording)

class AudioRecorderDialog extends HTMLElement {
    static is = "audio-recorder"
    root: ShadowRoot
    recorder = new Recorder()

    constructor() {
        super()
        this.root = this.attachShadow({ mode: "open" })
    }
    connectedCallback() {
        console.log("AudioRecorder connected")
        render(template(), this.shadowRoot)
        addDocumentStyles(this.shadowRoot, [css()])
        this.updateControls(false)
        this.form.onsubmit = e => {
            const submitter = e.submitter as HTMLButtonElement
            const value = submitter.value as Action
            actions.get(value).bind(this)(e)
        }
        this.link.onclick = () => this.dialog.showModal()
    }
    get form() {
        return this.root.querySelector("form")!
    }
    get dialog() {
        return this.root.querySelector("dialog")!
    }
    get link() {
        return this.shadowRoot.querySelector(("a"))!
    }
    get micOn() {
        return this.root.getElementById("mic-on")
    }
    get micOff() {
        return this.root.getElementById("mic-off")
    }
    get audio() {
        return this.root.querySelector("audio")!
    }
    button(value: Action) {
        return this.root.querySelector(`button[value="${value}"]`) as HTMLButtonElement
    }
    updateControls(playing: boolean) {
        this.micOn.hidden = !playing
        this.button("record").disabled = playing
        this.button("stop").disabled = !playing
        this.button("close").disabled = playing

        this.micOff.hidden = !this.micOn.hidden
    }
    recordingDone(e: Event) {
        const blob = new Blob(this.recorder.chunks, { type: "audio/ogg; codecs=opus" });
        const audioURL = URL.createObjectURL(blob);
        this.audio.src = audioURL
        this.audio.play()
    }
}
async function startRecording(this: AudioRecorderDialog, event: SubmitEvent) {
    event.preventDefault()
    await this.recorder.connect()
    this.recorder.mediaRecorder.onstop = e => this.recordingDone(e)
    this.recorder.start()
    this.updateControls(true)
}
function stopRecording(this: AudioRecorderDialog, event: SubmitEvent) {
    event.preventDefault()
    this.updateControls(false)
    event.preventDefault()
    this.recorder.stop()
    this.recorder.disconnect()
}
function close(this: AudioRecorderDialog, event: FormDataEvent) {
    console.log("cancel recording")
}

customElements.define(AudioRecorderDialog.is, AudioRecorderDialog)
