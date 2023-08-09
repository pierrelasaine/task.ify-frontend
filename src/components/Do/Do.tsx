import React, { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import { motion } from 'framer-motion'

import DoProps from '../../../interfaces/DoProps'
import WebPlayback from '../WebPlayback/WebPlayback'

import './Do.css'

const Do: React.FC<DoProps> = ({ appState }) => {
    const task = appState.doTask!

    const [timeLeft, setTimeLeft] = useState<number>(task.timer * 60)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isComplete, setComplete] = useState(false)

    const { width, height } = useWindowSize()

    useEffect(() => {
        if (!isPlaying) return

        const timer = setInterval(() => {
            setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0))
        }, 1000)

        return () => clearInterval(timer)
    }, [isPlaying])

    useEffect(() => {
        if (timeLeft === 0) {
            setComplete(true)
        }
    }, [timeLeft])

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`
    }

    if (isComplete) {
        return (
            <section className='do'>
                <Confetti
                    width={width}
                    height={height}
                    recycle={true}
                />
                <h2 className='do-task-name'>{task.task_name}</h2>
                <motion.section
                    className='timer-box'
                    initial={{ scale: 1 }}
                        animate={{ scale: 1.5 }}

                    transition={{
                        duration: 1,
                        repeatType: 'reverse',
                        repeat: Infinity,
                    }}>
                    <h1 className='time-value'>{formatTime(timeLeft)}</h1>
                </motion.section>
                <WebPlayback task={task} />
            </section>
        )
    } else {
        return (
            <section className='do'>
                <h2 className='do-task-name'>{task.task_name}</h2>
                <section className='timer-box'>
                    <h1 className='time-value'>{formatTime(timeLeft)}</h1>
                </section>
                <WebPlayback task={task} />
            </section>
        )
    }
}

export default Do
