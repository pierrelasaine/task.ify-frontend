import AddTaskCardContents from '../AddTaskCardContents/AddTaskCardContents'

import AddTaskCardProps from '../../../interfaces/AddTaskCardProps'

import './AddTaskCard.css'

const AddTaskCard: React.FC<AddTaskCardProps> = ({
    dashboardState,
    setDashboardState
}) => {
    const addTaskCardClassName = dashboardState.formIsActive
        ? 'add-task-card activated'
        : 'add-task-card'
    return (
        <div className={addTaskCardClassName}>
            <AddTaskCardContents
                dashboardState={dashboardState}
                setDashboardState={setDashboardState}
            />
        </div>
    )
}

export default AddTaskCard
