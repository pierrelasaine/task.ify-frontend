import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import ApiClient from '../../../services/apiClient'

import Task from '../../../interfaces/Task'
import AppState from '../../../interfaces/AppState'
import IDashboardState from '../../../interfaces/DashboardState'

import './TaskCard.css'

interface ITaskCardProps {
    key: number
    task: Task
    dashboardState: IDashboardState
    setDashboardState: React.Dispatch<React.SetStateAction<IDashboardState>>
    appState: AppState
    setAppState: React.Dispatch<React.SetStateAction<AppState>>
}

const TaskCard: React.FC<ITaskCardProps> = ({
    task,
    setDashboardState,
    setAppState
}) => {
    const [playlistCoverUrl, setPlaylistCoverUrl] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        fetchPlaylistCover()
    }, [task.playlist_id])

    const startTask = () => {
        setAppState(prevState => ({
            ...prevState,
            doTask: task
        }))
        navigate('/do')
    }

    const fetchPlaylistCover = async () => {
        try {
            const { data: playlistCover } = await ApiClient.getPlaylistCover(
                task.playlist_id
            )
            setPlaylistCoverUrl(playlistCover.url)
        } catch (error: any) {
            console.error('Failed to get playlist cover:', error.message)
        }
    }

    const deleteTask = async () => {
        try {
            await ApiClient.deleteTask(task.playlist_id)
            setDashboardState(prevState => ({
                ...prevState,
                tasks: prevState.tasks.filter(
                    (currentTask: Task) => currentTask.task_id !== task.task_id
                )
            }))
        } catch (error: any) {
            console.error('Failed to delete task:', error.message)
        }
    }

    return (
        <div className='task-card'>
            <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{
                    type: 'tween',
                    duration: 0.05
                }}
                className='play-button'
                onClick={() => startTask()}>
                <motion.section
                    whileHover={{ scale: 1.05 }}
                    transition={{
                        type: 'tween',
                        duration: 0.7
                    }}>
                    <FontAwesomeIcon
                        icon={faPlay}
                        color='#ffffff'
                        size='2xl'
                    />
                </motion.section>
            </motion.button>
            <section className='task-column'>
                <section className='task-row'>
                    <h2 className='task-name'>{task.task_name}</h2>
                    <h2 className='playlist-name'>{task.vibe}</h2>
                </section>
                <section className='task-row'>
                    <span className='delete-spacer'></span>
                    <section className='time-box'>
                        <h1 className='time'>{task.timer}:00</h1>
                    </section>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        transition={{
                            type: 'tween',
                            duration: 0.05
                        }}
                        className='delete-button'
                        onClick={deleteTask}>
                        <motion.section
                            whileHover={{ scale: 1.05 }}
                            transition={{
                                type: 'tween',
                                duration: 0.7
                            }}>
                            {' '}
                            X{' '}
                        </motion.section>
                    </motion.button>
                </section>
            </section>
            <img
                className='playlist-button'
                src={playlistCoverUrl}
                alt='Spotify playlist cover'
            />
        </div>
    )
}

export default TaskCard
