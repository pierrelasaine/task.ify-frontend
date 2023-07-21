import { useState } from 'react'
import CategoryBar from '../CategoryBar/CategoryBar'
import './Dashboard.css'

const Dashboard: React.FC = () => {
    const [dashboardState, setDashboardState] = useState({
        categories: ['Home', 'Chores', 'Work', 'School'],
        tasks: [],
        currentCategory: '',
        currentTask: ''
    })
    return (
        <>
            <section className='dashboard'>
                <CategoryBar
                    dashboardState={dashboardState}
                    setDashboardState={setDashboardState}
                />
            </section>
        </>
    )
}

export default Dashboard
