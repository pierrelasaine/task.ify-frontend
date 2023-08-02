import { useNavigate } from 'react-router-dom'
import IDashboardState from '../../../interfaces/DashboardState'
import './TaskCard.css'
import ApiClient from '../../../services/apiClient'
import { useEffect, useState } from 'react'
import Task from '../../../interfaces/Task'
import AppState from '../../../interfaces/AppState'

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
        } catch (error) {
            console.error('Failed to get playlist cover:', error)
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
        } catch (error) {
            console.error('Failed to delete task:', error)
        }
    }

    return (
        <div className='task-card'>
            <button
                className='play-button'
                onClick={()=>{
                    startTask;
                    }}>
                <h1>&gt;</h1>
            </button>
            <section className='task-column'>
                {/**
                 * <>@todo add task name and task playlist name
                 */}
                <section className='task-row'>
                    <h2 className='task-name'>{task.task_name}</h2>
                    <h2 className='playlist-name'>{task.vibe}</h2>
                </section>
                <section className='task-row'>
                    <span className='delete-spacer'></span>
                    <section className='time-box'>
                        <h1 className='time'>{task.timer}:00</h1>
                    </section>
                    <button
                        className='delete-button'
                        onClick={deleteTask}>
                        {' '}
                        X{' '}
                    </button>
                </section>
            </section>
            <img
                className='playlist-button'
                src={playlistCoverUrl}
            />
        </div>
    )
}

export default TaskCard
