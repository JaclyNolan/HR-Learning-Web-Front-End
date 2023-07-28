import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ allowedRoles = [] }) => {
    const { user } = useAuth();
    const location = useLocation();

    return (
        (user?.role && allowedRoles.includes(user.role))
            ? <Outlet />
            : user
                ? <Navigate to="/unauthorize" replace />
                : <Navigate to="/login" replace />
    )
}

export default RequireAuth;