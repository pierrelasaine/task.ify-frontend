import AppState from "./AppState"

export default interface NavProps {
    appState: AppState
    handleClick: () => void
}