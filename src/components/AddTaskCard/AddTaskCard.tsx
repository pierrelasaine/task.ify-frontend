import AddTaskCardContents from '../AddTaskCardContents/AddTaskCardContents'
import AddTaskCardProps from '../../../interfaces/AddTaskCardProps'
import './AddTaskCard.css'

// moving isActive up to parent element in order to 
// add a dependency on reh getTasks useEffect
const AddTaskCard: React.FC<AddTaskCardProps> = ({ dashboardState, setDashboardState }) => {
    /**
     * <>@todo useContext to pass dashboardState and setDashboardState to AddTaskCardForm
     */
    /**
     * <>@todo animate add-task-card section to expand when form isActive
     */
    const addTaskCardClassName = dashboardState.formIsActive ? 'add-task-card activated' : 'add-task-card'
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
