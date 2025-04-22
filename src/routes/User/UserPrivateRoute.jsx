import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserPrivateRoute = () => {

    const messageFunction = () => {
        toast.error('Please Login!!')
    }

    const token = localStorage.getItem('userAccessTokne');
    const refreshToken = localStorage.getItem('userRefreshToken');

    if (token || refreshToken) {
        return <Outlet />;
    } else {
        messageFunction();
        return <Navigate to="/login" />;
    }
}

export default UserPrivateRoute;