import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ApiClient from '../services/ApiClient'

function App() {
    const [appState, setAppState] = useState({
        isAuthenticated: false
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
    }

    return (
        <>
            <div>
                <a
                    href='https://vitejs.dev'
                    target='_blank'>
                    <img
                        src={viteLogo}
                        className='logo'
                        alt='Vite logo'
                    />
                </a>
                <a
                    href='https://react.dev'
                    target='_blank'>
                    <img
                        src={reactLogo}
                        className='logo react'
                        alt='React logo'
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className='card'>
                <button onClick={handleClick}>Logged In: {appState.isAuthenticated}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className='read-the-docs'>
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
