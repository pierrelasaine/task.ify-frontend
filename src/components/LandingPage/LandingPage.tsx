import triangle from '../../../public/triangle.png'

import NavProps from '../../../interfaces/NavProps'
import './LandingPage.css'

const LandingPage: React.FC<NavProps> = ({ handleClick }) => {
    return (
        <>
            <section className='landing-page'>
                <div className='tertiary-logo-box'>
                    <img src={triangle} />
                </div>
                <h1 className='primary-taskName'>Task.ify</h1>
            </section>
            <button className='spotify-login' onClick={handleClick}>
                Log in with Spotify
            </button>

        </>
        )
    }

export default LandingPage
