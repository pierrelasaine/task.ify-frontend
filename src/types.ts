import { ReactElement } from "react"

export interface IAppStateProp {
    appState: AppState
}

export interface AppState {
    isAuthenticated: boolean
    doTask: ITask | null
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
    tasks: ITask[]
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

export interface ITask {
    id: string
    title: string
    category: string
    vibe: string
    duration: number
    playlistId: string
}