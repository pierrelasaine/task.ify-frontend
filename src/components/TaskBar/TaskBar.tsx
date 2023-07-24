import { useState } from 'react'
import { ITask } from '../../types'
import './TaskBar.css'

interface ITaskProp {
    task: ITask | null /* remove null? */
}

const TaskBar: React.FC<ITaskProp> = ({ task }) => {
    /**
     * @todo how do we get the current song and song progress?
     * @todo add playlist photo to task state?
     */
    const [barIsPlaying, setBarIsPlaying] = useState(true)
    const pause = () => {
        console.log('pause')
        setBarIsPlaying(false)
    }
    const play = () => {
        console.log('play')
        setBarIsPlaying(true)
    }

    return (
        <section className='task-bar'>
            {barIsPlaying ? (
                <button
                    className='play-pause-button'
                    onClick={pause}>
                    <h1>&gt;</h1>
                </button>
            ) : (
                <button
                    className='play-pause-button'
                    onClick={play}>
                    <h1>||</h1>
                </button>
            )}
            <section className='do-task-column'>
                {/**
                 * <>@todo add task name and task playlist name
                 * @todo remove the '?'s
                 */}
                <section className='do-task-row1'>
                    Song Name - Artist
                </section>
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
