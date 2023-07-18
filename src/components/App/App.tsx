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
        const getMe = async () => {
            const token = localStorage.getItem('token')
            if (token) {
                ApiClient.setToken(token)
                const { data } = await ApiClient.spotifyGetMe()
                if (data) {
                    setAppState(prevState => ({
                        ...prevState,
                        isAuthenticated: true
                    }))
                }
            }
            getMe()
        }
    }, [appState.isAuthenticated])

    const handleClick = async () => {
        try {
            const {
                data: { token: token }
            } = await ApiClient.spotifyOAuth()

            if (token) {
                localStorage.setItem('token', token)
                setAppState(prevState => ({
                    ...prevState,
                    isAuthenticated: true
                }))
            }
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
                        handleClick={handleClick}
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
