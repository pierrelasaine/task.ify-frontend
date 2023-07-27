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
        vibe: '',
        duration: '',
        category: ''
    })
    /**
     * @todo add default field for vibe
     * @todo error handling for form
     */

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')!
            const response = await ApiClient.addTask({
                task: {
                    title: formData.taskName,
                    vibe: formData.vibe,
                    duration: Number(formData.duration),
                    category: formData.category
                },
                token: token
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
