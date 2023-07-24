import { useState } from 'react'
import AddTaskCardContents from '../AddTaskCardContents/AddTaskCardContents'
import { ICategoryBarProps } from '../../types'
import './AddTaskCard.css'

const AddTaskCard: React.FC<ICategoryBarProps> = () => {
    const [isActive, toggleActive] = useState(false)
    /**
     * @todo useContext to pass dashboardState and setDashboardState to AddTaskCardForm
     */
    /**
     * @todo animate add-task-card section to expand when form isActive
     */
    return (
        <div className='add-task-card'>
            <AddTaskCardContents
                isActive={isActive}
                toggleActive={toggleActive}
            />
        </div>
    )
}

export default AddTaskCard
