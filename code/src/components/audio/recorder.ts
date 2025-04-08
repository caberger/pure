class Recorder {
    stream: MediaStream
    mediaRecorder: MediaRecorder
    chunks: Blob[] = []

    async connect() {
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const mediaRecorder = this.mediaRecorder = new MediaRecorder(this.stream)
        this.mediaRecorder = mediaRecorder
        mediaRecorder.onstart = () => this.chunks = []
        mediaRecorder.ondataavailable = e => this.chunks.push(e.data)
    }
    async disconnect() {
        if (this.mediaRecorder) {
            this.mediaRecorder.stop()
            delete this.mediaRecorder
        }
        if (this.stream) {
            this.stream?.getTracks().forEach(track => track.stop())
            delete this.stream
        }
    }
    start() {
        this.mediaRecorder.start()
    }
    stop() {
        this.mediaRecorder.stop()
    }
}
export { Recorder }
