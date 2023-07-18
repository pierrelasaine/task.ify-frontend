import { ReactElement } from "react"

export interface AppState {
    isAuthenticated: boolean
    doMode: boolean
}

export interface NavProps {
    appState: AppState
    handleClick: () => void
}

export interface ProtectedRouteProps {
    element: ReactElement
    appState: AppState
    fallback: string
}