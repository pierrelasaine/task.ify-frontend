import { useState } from 'react'
import AddTaskCardContents from '../AddTaskCardContents/AddTaskCardContents'
import IDashboardState from '../../../interfaces/IDashboardState'
import './AddTaskCard.css'

export interface IAddTaskCardProps {
    dashboardState: IDashboardState
    setDashboardState: React.Dispatch<React.SetStateAction<IDashboardState>>
}

const AddTaskCard: React.FC<IAddTaskCardProps> = () => {
    const [isActive, toggleActive] = useState(false)
    /**
     * <>@todo useContext to pass dashboardState and setDashboardState to AddTaskCardForm
     */
    /**
     * <>@todo animate add-task-card section to expand when form isActive
     */
    const addTaskCardClassName = isActive ? 'add-task-card activated' : 'add-task-card'
    return (
        <div className={addTaskCardClassName}>
            <AddTaskCardContents
                isActive={isActive}
                toggleActive={toggleActive}
            />
        </div>
    )
}

export default AddTaskCard
