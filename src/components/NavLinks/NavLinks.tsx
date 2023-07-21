import { useNavigate } from 'react-router-dom'
import { INavLinks } from '../../types'
import ApiClient from '../../../services/apiClient'
import './NavLinks.css'

const NavLinks: React.FC<INavLinks> = ({ appState }) => {
    const navigate = useNavigate()
    const handleLogOut = async () => {
        try {
            await ApiClient.logout()
            location.reload()
        } catch (error: any) {
            console.error('An error occurred during the log out process', error)
        }
        navigate('/')
    }

    if (appState.doMode) {
        return <></>
    } else if (appState.isAuthenticated) {
        return (
            <section className='nav-links'>
                <button className='logout-button' onClick={handleLogOut}>Log Out</button>
            </section>
        )
    }
}

export default NavLinks
