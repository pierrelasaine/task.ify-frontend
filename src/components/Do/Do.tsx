import React, { useState, useEffect } from 'react'
import AppState from '../../../interfaces/AppState'
import TaskBar from '../TaskBar/TaskBar'
import WebPlayback from '../WebPlayback/WebPlayback'

import './Do.css'

export interface IAppStateProp {
    appState: AppState
}

const Do: React.FC<IAppStateProp> = ({ appState }) => {
    const task = appState.doTask!

    const [timeLeft, setTimeLeft] = useState<number>(task.timer * 60)
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
            <h2 className='do-task-name'>{task.task_name}</h2>
            <section className='timer-box'>
                <h1 className='time-value'>{formatTime(timeLeft)}</h1>
            </section>
            <TaskBar
                task={task}
                togglePlayPause={togglePlayPause}
                isPlaying={isPlaying}
            />
            <WebPlayback 
                appState={appState} 
                task={task} 
            />
        </section>
    )
}

export default Do
