import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireGuest = () => {
    const { user } = useAuth();
    const location = useLocation;

    console.log(user);

    return (
        !user
            ? <Outlet />
            : <Navigate to="/" replace />
    )
}

export default RequireGuest;