import { Navigate, Outlet } from 'react-router-dom';

const AdminPublicRoute = () => {

    const token = localStorage.getItem('adminAccessToken');
    const refreshToken = localStorage.getItem('adminRefreshToken');

    return token || refreshToken ? <Navigate to="/admin/dashboard" /> : <Outlet />
}

export default AdminPublicRoute;