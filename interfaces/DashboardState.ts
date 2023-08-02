import Task from './Task'

export default interface DashboardState {
    categories: string[]
    tasks: Task[]
    currentCategory: string
    formIsActive: boolean
}