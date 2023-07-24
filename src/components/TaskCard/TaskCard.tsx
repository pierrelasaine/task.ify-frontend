import { ITask, IDashboardState } from '../../types'
import './TaskCard.css'

interface ITaskCardProps {
    key: number
    task: ITask
    dashboardState: IDashboardState
    setDashboardState: React.Dispatch<React.SetStateAction<IDashboardState>>
}

const TaskCard: React.FC<ITaskCardProps> = ({ task }) => {
    /**
     * @todo set up complete task button
     * @todo set up delete task button
     */
    const handleComplete = () => {
        console.log('complete task')
    }
    const handleDelete = () => {
        console.log('delete task')
    }
    const startTask = () => {
        console.log('start task')
    }
    return (
        <div className='task-card'>
            <button
                className='play-button'
                onClick={startTask}>
                <h1>&gt;</h1>
            </button>
            <section className='task-column'>
                {/**
                 * @todo add task name and task playlist name
                 */}
                <section className='task-row'>
                    <h2 className='task-name'>{task.title}</h2>
                    <h2 className='playlist-name'>{task.vibe}</h2>
                </section>
                <section className='task-row'>
                    <section className='time-box'>
                        <h1 className='time'>{task.duration}:00</h1>
                    </section>
                </section>
            </section>
            <button className='playlist-button'>
                <h1>&lt;</h1>
            </button>
        </div>
    )
}

export default TaskCard
