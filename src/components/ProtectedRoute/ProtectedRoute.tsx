import ProtectedRouteProps from '../../../interfaces/ProtectedRouteProps'
import { Navigate } from 'react-router-dom'
import Loading from '../Loading/Loading'

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    element,
    appState,
    setAppState,
    isLoading,
    fallback
}) => {
    setAppState(prevState => ({
        ...prevState,
        checkSession: !prevState.checkSession
    }))

    const isAuthenticated = appState.isAuthenticated

    if (isLoading) return <Loading />

    return isAuthenticated ? (
        element
    ) : (
        <Navigate
            to={fallback}
            replace
        />
    )
}

export default ProtectedRoute
