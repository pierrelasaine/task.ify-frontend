import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import INavLinks from '../../../interfaces/NavLinks'
import ApiClient from '../../../services/apiClient'

import './NavLinks.css'

const NavLinks: React.FC<INavLinks> = ({ appState, setAppState }) => {
    const navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            await ApiClient.logout()
            setAppState(prevState => ({
                ...prevState,
                checkSession: !prevState.checkSession,
                isAuthenticated: false
            }))
            localStorage.removeItem('token')
        } catch (error: any) {
            console.error('An error occurred during the log out process', error)
        } finally {
            navigate('/')
        }
    }

    const handleReturn = () => {
        navigate('/dashboard')
    }

    if (location.pathname === '/do') {
        return (
            <section className='nav-links'>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    transition={{
                        type: 'tween'
                    }}
                    className='logout-button'
                    onClick={handleReturn}>
                    Return to Dashboard
                </motion.button>
            </section>
        )
    } else if (appState.isAuthenticated) {
        return (
            <section className='nav-links'>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    transition={{
                        type: 'tween'
                    }}
                    className='logout-button'
                    onClick={handleLogOut}>
                    Log Out
                </motion.button>
            </section>
        )
    }
}

export default NavLinks
