import { useLocation } from 'react-router-dom'
import Logo from '../Logo/Logo'
import NavLinks from '../NavLinks/NavLinks'
import NavbarProps from '../../../interfaces/NavLinks'
import './Navbar.css'

const Navbar: React.FC<NavbarProps> = ({ appState }) => {
    const location = useLocation()
    return (
        <nav className='navbar'>
            {(location.pathname !== '/' && appState.isAuthenticated) && <Logo />}
            <NavLinks
                appState={appState}
            />
        </nav>
    )
}

export default Navbar
