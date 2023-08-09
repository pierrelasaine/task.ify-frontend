import AddTaskCardForm from '../AddTaskCardForm/AddTaskCardForm'
import { motion } from 'framer-motion'

import AddTaskCardContentsProps from '../../../interfaces/AddTaskCardContentsProps.ts'

import './AddTaskCardContents.css'

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
            <motion.button
                className='add-button'
                onClick={handleClick}
                whileHover={{ scale: 1.025 }}
                transition={{
                    type: 'tween'
                }}>
                <h1>+</h1>
            </motion.button>
        </>
    )
}

export default AddTaskCardContents
