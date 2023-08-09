import { motion } from 'framer-motion'
import triangle from '../../../public/triangle.png'

import NavProps from '../../../interfaces/NavProps'

import './LandingPage.css'

const LandingPage: React.FC<NavProps> = ({ handleClick }) => {
    return (
        <motion.section exit={{ opacity: 0 }}>
            <motion.section
                className='landing-page'
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]
                }}>
                <div className='tertiary-logo-box'>
                    <img
                        src={triangle}
                        alt='Taskify Logo'
                    />
                </div>
                <h1 className='primary-taskName'>Task.ify</h1>
            </motion.section>
            <motion.button
                className='spotify-login'
                onClick={handleClick}
                initial={{ x: 700 }}
                animate={{ x: 0 }}
                transition={{ delay: 1.5 }}>
                <motion.section
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1 }}
                    transition={{
                        type: 'tween'
                    }}>
                    Log in with Spotify
                </motion.section>
            </motion.button>
        </motion.section>
    )
}

export default LandingPage
