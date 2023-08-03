import { useNavigate } from 'react-router-dom'
import NavLinks from '../../../interfaces/NavLinks'
import ApiClient from '../../../services/apiClient'
import './NavLinks.css'

const NavLinks: React.FC<NavLinks> = ({ appState, setAppState }) => {
    const navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            await ApiClient.logout()
            setAppState(prevState => ({
                ...prevState,
                checkSession: prevState.checkSession,
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
                <button className='logout-button' onClick={handleReturn}>Return to Dashboard</button>
            </section>
        )
    } else if (appState.isAuthenticated) {
        return (
            <section className='nav-links'>
                <button className='logout-button' onClick={handleLogOut}>Log Out</button>
            </section>
        )
    }
}

export default NavLinks
