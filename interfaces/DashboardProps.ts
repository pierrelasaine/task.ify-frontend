import AppState from './AppState'

export default interface DashboardProps {
    appState: AppState
    setAppState: React.Dispatch<React.SetStateAction<AppState>>
}
