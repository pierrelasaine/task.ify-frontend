import DashboardState from './DashboardState'

export default interface CategoryBarProps {
    dashboardState: DashboardState
    setDashboardState: React.Dispatch<React.SetStateAction<DashboardState>>
}