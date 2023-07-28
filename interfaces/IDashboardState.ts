import Task from './Task'

export default interface IDashboardState {
    categories: string[]
    tasks: Task[]
    currentCategory: string
}