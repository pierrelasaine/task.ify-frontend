import { useEffect, useState } from 'react'
import CategoryBar from '../CategoryBar/CategoryBar'
import AddTaskCard from '../AddTaskCard/AddTaskCard'
import TaskCard from '../TaskCard/TaskCard'
import './Dashboard.css'
import { IResponse } from '../../../services/apiClient'
import { IDashboardState, ITask } from '../../types'
import ApiClient from '../../../services/apiClient'

const Dashboard: React.FC = () => {
    const [dashboardState, setDashboardState] = useState<IDashboardState>({
        categories: ['Home', 'Chores', 'Work', 'School'],
        tasks: [
            {
                id: 'me',
                title: 'Task Name',
                vibe: 'Playlist Name',
                category: 'Category',
                duration: 10,
                playlistId: 'me'
            },
            {
                id: 'me',
                title: 'Task Name',
                vibe: 'Playlist Name',
                category: 'Category',
                duration: 10,
                playlistId: 'me'
            },
            {
                id: 'me',
                title: 'Task Name',
                vibe: 'Playlist Name',
                category: 'Category',
                duration: 10,
                playlistId: 'me'
            }
        ],
        currentCategory: 'Home'
    })

    useEffect(() => {
        getTasks()
    }, [dashboardState.currentCategory, dashboardState.tasks.length])

    /**
     * <>@todo Implement getTasks() in ApiClient.ts
     */

    const getTasks = async () => {
        try {
            const response: IResponse = await ApiClient.getTasks()
            setDashboardState(prevState => ({
                ...prevState,
                tasks: response.data.tasks
            }))
        } catch (error) {
            console.error('Failed to get tasks:', error)
        }
    }

    let selectedTasks =
        dashboardState.currentCategory === 'Home'
            ? dashboardState.tasks
            : dashboardState.tasks.filter(
                  task => task.category === dashboardState.currentCategory
              )

    return (
        <>
            <section className='dashboard'>
                <CategoryBar
                    dashboardState={dashboardState}
                    setDashboardState={setDashboardState}
                />
                <AddTaskCard
                    dashboardState={dashboardState}
                    setDashboardState={setDashboardState}
                />
                {selectedTasks.map((task: ITask, index) => (
                    <TaskCard
                        key={index}
                        task={task}
                        dashboardState={dashboardState}
                        setDashboardState={setDashboardState}
                    />
                ))}
            </section>
        </>
    )
}

export default Dashboard
