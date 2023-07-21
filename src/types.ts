import { ReactElement } from "react"

export interface AppState {
    isAuthenticated: boolean
    doMode: boolean
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
    tasks: never[]
    currentCategory: string
    currentTask: string
}

export interface IDCategoryBarProps {
    dashboardState: IDashboardState
    setDashboardState: React.Dispatch<React.SetStateAction<IDashboardState>>
}