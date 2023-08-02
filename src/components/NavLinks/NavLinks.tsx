import { useNavigate } from 'react-router-dom'
import { NavLinks } from '../../../interfaces/NavLinks'
import ApiClient from '../../../services/apiClient'
import './NavLinks.css'

const NavLinks: React.FC<NavLinks> = ({ appState }) => {
    const navigate = useNavigate()
    const handleLogOut = async () => {
        try {
            await ApiClient.logout()
        } catch (error: any) {
            console.error('An error occurred during the log out process', error)
        }
        navigate('/')
    }

    const handleReturn = () => {
        /**
         * @todo handle return logic
         */
        navigate('/dashboard')
    }

    /**
     * @todo add link to dashboard
     */
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
