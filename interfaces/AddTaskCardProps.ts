import DashboardState from "./DashboardState"

export default interface AddTaskCardProps {
    dashboardState: DashboardState
    setDashboardState: React.Dispatch<React.SetStateAction<DashboardState>>
}