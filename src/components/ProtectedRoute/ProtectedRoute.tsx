import { ProtectedRouteProps } from '../../types'   
import { Navigate } from 'react-router-dom'
import Loading from '../Loading/Loading'

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, appState, isLoading, fallback }) => {
    const isAuthenticated = appState.isAuthenticated

    if (isLoading) return <Loading />

    return isAuthenticated ? element : <Navigate to={fallback} replace />
}

export default ProtectedRoute