import React, { useState, useEffect } from 'react'
import { IAppStateProp } from '../../types'
import TaskBar from '../TaskBar/TaskBar'

import './Do.css'

const Do: React.FC<IAppStateProp> = ({ appState }) => {
    const task = appState.doTask!

    const [timeLeft, setTimeLeft] = useState<number>(task.duration * 60)
    const [isPlaying, setIsPlaying] = useState(true)

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
            <h2 className='do-task-name'>{task?.title}</h2>
            <section className='timer'>
                <h1 className='time-value'>{formatTime(timeLeft)}</h1>
            </section>
            <TaskBar
                task={task}
                togglePlayPause={togglePlayPause}
                isPlaying={isPlaying}
            />
        </section>
    )
}

export default Do
