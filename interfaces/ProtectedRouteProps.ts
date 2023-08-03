import { ReactElement } from "react"
import AppState from './AppState'

export default interface ProtectedRouteProps {
    element: ReactElement
    appState: AppState
    isLoading: boolean
    fallback: string
}