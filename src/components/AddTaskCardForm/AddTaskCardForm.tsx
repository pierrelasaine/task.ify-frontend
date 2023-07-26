import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './AddTaskCardForm.css'
import { useState } from 'react'
import ApiClient from '../../../services/apiClient'

interface IAddTaskCardFormProps {
    toggleActive: React.Dispatch<React.SetStateAction<boolean>>
}

const AddTaskCardForm: React.FC<IAddTaskCardFormProps> = ({ toggleActive }) => {
    const [formData, setFormData] = useState({
        taskName: '',
        /**
         * @supportqueue vibe is running on empty
         */
        vibe: 'Chill',
        duration: '',
        category: ''
    })
    /**
     * <>@todo add a task form that adds a task to the database
     */
    /**
     * <>@todo animate dashboard to slide down when switching modes.
     * <>@todo animate add-task-card section to expand when form isActive
     * <>@todo animate tertiary selection on the form
     * <>@todo animate fade in for new card on feed
     * <>@todo animate task card to lift on hover
     * <>@todo animate play button to lift on hover/ press on click
     * <>@todo animate transition in from spotify redirect
     * <>@todo animate fade in for form components when form isActive
     * <>@todo vertically center category bar
     * <>@todo add hover effect to category bar
     * <>@todo add delete task button
     * <>@todo add short tour feature fab to stretch backlog.
     */

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await ApiClient.addTask({
                taskName: formData.taskName,
                vibe: formData.vibe,
                duration: Number(formData.duration),
                category: formData.category
            })
            if (response) toggleActive(false)
        } catch (error) {
            console.error('Failed to add task:', error)
        }
    }

    const handleBack = () => {
        console.log('back')
        toggleActive(false)
    }
    return (
        <form onSubmit={handleSubmit}>
            <section className='form-row'>
                <section className='form-col'>
                    <h2 className='taskifier-title'>Task.ifier</h2>
                    <section className='generate-square'></section>
                </section>
                <section className='inputs-col'>
                    <label
                        htmlFor='task-name'
                        className='task-name'>
                        Task Name
                    </label>
                    <input
                        type='text'
                        className='input-field'
                        id='task-name'
                        name='task-name'
                        value={formData.taskName}
                        onChange={e =>
                            setFormData({
                                ...formData,
                                taskName: e.target.value
                            })
                        }
                    />
                    <label
                        htmlFor='vibe'
                        className='vibe'>
                        Vibe
                    </label>
                    <select
                        className='input-field'
                        id='vibe'
                        name='vibe'
                        value={formData.vibe}
                        onChange={e =>
                            setFormData({ ...formData, vibe: e.target.value })
                        }>
                        <option value='Chill'>Chill</option>
                        <option value='Happy'>Happy</option>
                        <option value='Sad'>Sad</option>
                        <option value='Angry'>Angry</option>
                        <option value='Party'>Party</option>
                    </select>
                    <label
                        htmlFor='duration'
                        className='duration'>
                        Duration (in minutes)
                    </label>
                    <input
                        type='number'
                        className='input-field'
                        id='duration'
                        name='duration'
                        value={formData.duration}
                        onChange={e =>
                            setFormData({
                                ...formData,
                                duration: e.target.value
                            })
                        }
                    />
                    <label
                        htmlFor='category'
                        className='category'>
                        Category
                    </label>
                    <input
                        type='text'
                        className='input-field'
                        id='category'
                        name='category'
                        value={formData.category}
                        onChange={e =>
                            setFormData({
                                ...formData,
                                category: e.target.value
                            })
                        }
                    />
                </section>
            </section>
            <section className='form-row button-row'>
                <button
                    className='back'
                    onClick={handleBack}
                    type='button'>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        size='xl'
                        style={{ color: '#58624e' }}
                    />
                </button>
                <button
                    className='generate-button'
                    type='submit'>
                    Generate Playlist
                </button>
            </section>
        </form>
    )
}

export default AddTaskCardForm
