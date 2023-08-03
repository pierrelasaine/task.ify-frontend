import Task from '../../../interfaces/Task'
import './TaskBar.css'

interface ITaskProp {
    task: Task | null
    togglePlayPause: () => void
    isPlaying: boolean
}

const TaskBar: React.FC<ITaskProp> = ({ togglePlayPause, isPlaying }) => {
    return (
        <section className='task-bar'>
            <button
                className='play-pause-button'
                onClick={togglePlayPause}>
                <h1>{isPlaying ? '||' : '>'}</h1>
            </button>
            <section className='do-task-column'>
                {/**
                 * <>@todo add task name and task playlist name
                 * @todo remove the '?'s
                 */}
                <section className='do-task-row1'>Song Name - Artist</section>
                <section className='do-task-row2'>
                    ----------------------------------------------------------------------------------------------------------------
                </section>
            </section>
            <button className='playlist-button'>
                <h1>&lt;</h1>
            </button>
        </section>
    )
}

export default TaskBar
