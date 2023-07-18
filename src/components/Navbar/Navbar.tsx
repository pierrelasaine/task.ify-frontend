import { useLocation } from 'react-router-dom'
import Logo from '../Logo/Logo'
import NavLinks from '../NavLinks/NavLinks'
import { NavProps } from '../../types'

const Navbar: React.FC<NavProps> = ({ appState, handleClick }) => {
    const location = useLocation()
    return (
        <nav className='navbar'>
            {(location.pathname !== '/' && appState.isAuthenticated) && <Logo />}
            <NavLinks
                appState={appState}
                handleClick={handleClick}
            />
        </nav>
    )
}

export default Navbar
