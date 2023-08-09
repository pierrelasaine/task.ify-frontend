import React, { useState, useEffect } from 'react'

import DoProps from '../../../interfaces/DoProps'
import WebPlayback from '../WebPlayback/WebPlayback'

import './Do.css'

const Do: React.FC<DoProps> = ({ appState }) => {
    const task = appState.doTask!

    const [timeLeft, setTimeLeft] = useState<number>(task.timer * 60)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        if (!isPlaying) return

        const timer = setInterval(() => {
            setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0))
        }, 1000)

        return () => clearInterval(timer)
    }, [isPlaying])

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

    return (
        <section className='do'>
            <h2 className='do-task-name'>{task.task_name}</h2>
            <section className='timer-box'>
                <h1 className='time-value'>{formatTime(timeLeft)}</h1>
            </section>
            <WebPlayback 
                task={task} 
            />
        </section>
    )
}

export default Do
