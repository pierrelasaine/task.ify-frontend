import { IAppStateProp } from '../../types'
import TaskBar from '../TaskBar/TaskBar'

import './Do.css'

const Do: React.FC<IAppStateProp> = ({ appState }) => {
    const task = appState.doTask
    /**
     * @todo add timer logic based on playtime
     * duration - playtime = time remaining
     */
    return (
        <section className='do'>
            <h2 className='do-task-name'>Task Name</h2>
            <section className='timer'>
                <h1 className='time-value'>10:00</h1>
            </section>
            <TaskBar task={appState.doTask} />
        </section>
    )
}

export default Do
