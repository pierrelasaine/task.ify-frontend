import Task from './Task'

export default interface AppState {
    isAuthenticated: boolean
    doTask: Task | null
}