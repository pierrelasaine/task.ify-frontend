export default interface TaskFormData {
    task: {
        taskName: string
        category: string
        vibe: string
        timer: number
    }
    token: string
}