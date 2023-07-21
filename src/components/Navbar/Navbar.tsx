import { useLocation } from 'react-router-dom'
import Logo from '../Logo/Logo'
import NavLinks from '../NavLinks/NavLinks'
import { INavLinks } from '../../types'

const Navbar: React.FC<INavLinks> = ({ appState }) => {
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
