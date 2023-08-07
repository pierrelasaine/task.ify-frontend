import AddTaskCardForm from '../AddTaskCardForm/AddTaskCardForm'
import './AddTaskCardContents.css'
import { Skeleton } from '@mui/material'
import AddTaskCardContentsProps from '../../../interfaces/AddTaskCardContentsProps.ts'

const AddTaskCardContents: React.FC<AddTaskCardContentsProps> = ({
    dashboardState,
    setDashboardState
}): JSX.Element => {
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        setDashboardState(prev => ({
            ...prev,
            formIsActive: true
        }))
    }

    return dashboardState.formIsActive ? (
        <AddTaskCardForm setDashboardState={setDashboardState} />
    ) : (
        <>
            <button
                className='add-button'
                onClick={handleClick}>
                <h1>+</h1>
            </button>
            {/* <Skeleton
                variant='rounded'
                animation={false}
                width='80%'
                height={100}
            />
            <section className='spacer'></section>
            <Skeleton
                variant='rounded'
                animation={false}
                width={100}
                height={100}
            /> */}
        </>
    )
}

export default AddTaskCardContents
