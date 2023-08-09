import { Waveform } from '@uiball/loaders'
import { motion } from 'framer-motion'

const Loading: React.FC = () => {
    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
            }}>
            <Waveform color='#ffffff' />
        </motion.section>
    )
}

export default Loading
