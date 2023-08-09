import { useEffect, useState } from 'react'
import CategoryBar from '../CategoryBar/CategoryBar'
import AddTaskCard from '../AddTaskCard/AddTaskCard'
import TaskCard from '../TaskCard/TaskCard'

import ApiClient from '../../../services/apiClient'
import IDashboardState from '../../../interfaces/DashboardState'
import Task from '../../../interfaces/Task'
import Response from '../../../interfaces/Response'
import DashboardProps from '../../../interfaces/DashboardProps'

import './Dashboard.css'

const Dashboard: React.FC<DashboardProps> = ({ appState, setAppState }) => {
    const [dashboardState, setDashboardState] = useState<IDashboardState>({
        categories: [],
        tasks: [],
        currentCategory: '',
        formIsActive: false
    })

    useEffect(() => {
        getTasks()
    }, [dashboardState.formIsActive])

    useEffect(() => {
        getCategories()
    })

    const getTasks = async () => {
        if (localStorage.getItem('token')) {
            try {
                const token = localStorage.getItem('token')!
                const response: Response<Task[]> = await ApiClient.getTasks(
                    token
                )
                setDashboardState(prevState => ({
                    ...prevState,
                    tasks: response.data
                }))
            } catch (error) {
                console.error('Failed to get tasks:', error)
            }
        } else {
            setDashboardState(prevState => ({
                ...prevState,
                tasks: []
            }))
        }
    }

    const getCategories = () => {
        const categories: string[] = dashboardState.tasks?.map(
            task => task.category
        )
        let uniqueCategories = [...new Set(categories)]
        if ('Home' in uniqueCategories) {
            const homeIndex = uniqueCategories.indexOf('Home')
            uniqueCategories.splice(homeIndex, 1)
        }

        setDashboardState(prevState => ({
            ...prevState,
            categories: ['Home', ...uniqueCategories]
        }))
    }

    /**
     * @todo add placeholder for if task list is empty
     */

    let selectedTasks =
        dashboardState.currentCategory === 'Home' || ''
            ? dashboardState.tasks
            : dashboardState.tasks?.filter(
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
                {selectedTasks?.map((task: Task, index) => (
                    <TaskCard
                        key={index}
                        task={task}
                        dashboardState={dashboardState}
                        setDashboardState={setDashboardState}
                        appState={appState}
                        setAppState={setAppState}
                    />
                ))}
            </section>
        </>
    )
}

export default Dashboard
