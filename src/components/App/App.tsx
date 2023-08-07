import { useState, useEffect } from "react";
import "./App.css";
import ApiClient from "../../../services/apiClient";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Navbar from "../Navbar/Navbar";
import LandingPage from "../LandingPage/LandingPage";
import Dashboard from "../Dashboard/Dashboard";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Do from "../Do/Do";
import AppState from "../../../interfaces/AppState";
import SessionResponse from "../../../interfaces/SessionResponse";
import Response from "../../../interfaces/Response";
import WebPlayback from "../WebPlayback/WebPlayback";

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>({
        isAuthenticated: false,
        doTask: null,
        checkSession: false
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        checkAuthenticationStatus()
    }, [appState.checkSession])

    const checkAuthenticationStatus = async () => {
        try {
            const response: Response<SessionResponse> =
                await ApiClient.checkSessionStatus()
            setAppState(prevState => ({
                ...prevState,
                isAuthenticated: response.data.isAuthenticated
            }))
            if (response.data.isAuthenticated)
                localStorage.setItem('token', response.data.token)
        } catch (error) {
            console.error('Failed to check authentication status:', error)
        } finally {
            setIsLoading(false)
        }
    }
  };
    const handleClick = async () => {
        try {
            await ApiClient.spotifyOAuth()
        } catch (error: any) {
            console.error('An error occurred during the OAuth process', error)
        } finally {
            setAppState(prevState => ({
                ...prevState,
                checkSession: !prevState.checkSession
            }))
        }
    }
  };

    return (
        <>
            <section className='App'>
                <BrowserRouter>
                    <Navbar
                        appState={appState}
                        setAppState={setAppState}
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
                                    element={
                                        <Dashboard
                                            appState={appState}
                                            setAppState={setAppState}
                                        />
                                    }
                                    appState={appState}
                                    isLoading={isLoading}
                                    fallback={'/'}
                                />
                            }
                        />
                        <Route
                            path='/do'
                            element={
                                <ProtectedRoute
                                    element={<Do appState={appState} />}
                                    appState={appState}
                                    isLoading={isLoading}
                                    fallback={'/'}
                                />
                            }
                        />
                        <Route
                            path='*'
                            element={
                                <ProtectedRoute
                                    element={
                                        <Dashboard
                                            appState={appState}
                                            setAppState={setAppState}
                                        />
                                    }
                                    appState={appState}
                                    isLoading={isLoading}
                                    fallback={'/'}
                                />
                            }
                        />
                        <Route
                            path='/fernsPlayer'
                            element={<WebPlayback />}
                        />
                    </Routes>
                </BrowserRouter>
            </section>
        </>
    )
}

export default App;
