import { Navigate, Outlet } from 'react-router-dom';

const UserPublicRoute = () => {

    const token = localStorage.getItem('userAccessToken');
    const refreshToken = localStorage.getItem('userRefreshToken');

    return token || refreshToken ? <Navigate to='/home' /> : <Outlet />
}

export default UserPublicRoute