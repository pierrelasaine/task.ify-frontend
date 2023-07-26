import { ReactElement } from "react"
import AppState from '../interfaces/AppState'
import Task from '../interfaces/Task'

export interface IAppStateProp {
    appState: AppState
}

export interface NavProps {
    appState: AppState
    handleClick: () => void
}

export interface INavLinks {
    appState: AppState
}

export interface ProtectedRouteProps {
    element: ReactElement
    appState: AppState
    isLoading: boolean
    fallback: string
}


export interface IDashboardState {
    categories: string[]
    tasks: Task[]
    currentCategory: string
}

export interface ICategoryBarProps {
    dashboardState: IDashboardState
    setDashboardState: React.Dispatch<React.SetStateAction<IDashboardState>>
}

export interface AddTaskCardContentsProps {
    isActive: boolean
    toggleActive: React.Dispatch<React.SetStateAction<boolean>>
}