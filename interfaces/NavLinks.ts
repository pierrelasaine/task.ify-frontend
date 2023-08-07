import React from 'react'
import AppState from './AppState'

export default interface NavBarProps {
    appState: AppState
    setAppState: React.Dispatch<React.SetStateAction<AppState>>
}