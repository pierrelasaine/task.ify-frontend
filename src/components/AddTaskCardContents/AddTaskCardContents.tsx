import AddTaskCardForm from '../AddTaskCardForm/AddTaskCardForm'
import './AddTaskCardContents.css'
import { Skeleton } from '@mui/material'

interface AddTaskCardContentsProps {
    isActive: boolean
    toggleActive: React.Dispatch<React.SetStateAction<boolean>>
}

const AddTaskCardContents: React.FC<AddTaskCardContentsProps> = ({
    isActive,
    toggleActive
}): JSX.Element => {
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        toggleActive(true)
    }

    return isActive ? (
        <AddTaskCardForm toggleActive={toggleActive}/>
    ) : (
        <>
            <button
                className='add-button'
                onClick={handleClick}>
                <h1>+</h1>
            </button>
            <Skeleton
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
            />
        </>
    )
}

export default AddTaskCardContents
