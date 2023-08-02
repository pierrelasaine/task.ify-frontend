import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './AddTaskCardForm.css'
import { useState } from 'react'
import ApiClient from '../../../services/apiClient'
import AddTaskCardFormProps from '../../../interfaces/AddTaskCardFormProps'

const AddTaskCardForm: React.FC<AddTaskCardFormProps> = ({
    setDashboardState
}) => {
    const [formData, setFormData] = useState({
        taskName: '',
        vibe: '',
        timer: '',
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
            await ApiClient.addTask({
                task: {
                    taskName: formData.taskName,
                    vibe: formData.vibe,
                    timer: Number(formData.timer),
                    category: formData.category
                },
                token: token
            })

            setDashboardState(prev => ({
                ...prev,
                formIsActive: false
            }))
        } catch (error) {
            console.error('Failed to add task:', error)
        }
    }

    const handleBack = () => {
        setDashboardState(prev => ({
            ...prev,
            formIsActive: false
        }))
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
                        htmlFor='timer'
                        className='timer'>
                        timer (in minutes)
                    </label>
                    <input
                        type='number'
                        className='input-field'
                        id='timer'
                        name='timer'
                        value={formData.timer}
                        onChange={e =>
                            setFormData({
                                ...formData,
                                timer: e.target.value
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
