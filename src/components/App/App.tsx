import { useState, useEffect } from 'react'
import './App.css'
import ApiClient from '../../../services/apiClient'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from '../Navbar/Navbar'
import LandingPage from '../LandingPage/LandingPage'
import Dashboard from '../Dashboard/Dashboard'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

const App: React.FC = () => {
    const [appState, setAppState] = useState({
        isAuthenticated: false,
        doMode: false
    })

    useEffect(() => {
        checkAuthenticationStatus()
    }, [])

    const checkAuthenticationStatus = async () => {
        try {
            const response = await ApiClient.checkSessionStatus()
            setAppState(prevState => ({
                ...prevState,
                isAuthenticated: response.data.isAuthenticated
            }))
        } catch (error) {
            console.error('Failed to check authentication status:', error)
        }
    }

    const handleClick = async () => {
        try {
            await ApiClient.spotifyOAuth()
        } catch (error: any) {
            console.error('An error occurred during the OAuth process', error)
        }
    }

    return (
        <>
            <section className='App'>
                <BrowserRouter>
                    <Navbar
                        appState={appState}
                    />
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <LandingPage
                                    appState={appState}
                                    handleClick={handleClick}
                                />
                            }
                        />
                        <Route
                            path='/dashboard'
                            element={
                                <ProtectedRoute
                                    element={<Dashboard />}
                                    appState={appState}
                                    fallback={'/'}
                                />
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </section>
        </>
    )
}

export default App
