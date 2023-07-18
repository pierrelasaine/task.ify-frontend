import { ProtectedRouteProps } from '../../types'   
import { Navigate } from 'react-router-dom'

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, appState, fallback }) => {
    const isAuthenticated = appState.isAuthenticated

    return isAuthenticated ? element : <Navigate to={fallback} replace />
}

export default ProtectedRoute