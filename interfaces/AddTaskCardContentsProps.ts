import DashboardState from "./DashboardState";

export default interface AddTaskCardContentsProps {
    dashboardState: DashboardState
    setDashboardState: React.Dispatch<React.SetStateAction<DashboardState>>
}