import { Navigate, Outlet } from 'react-router-dom';

const AdminPrivateRote = () => {

    const token = localStorage.getItem('adminAccessToken');
    const refreshToken = localStorage.getItem('adminRefreshToken');

    return token || refreshToken ? <Outlet /> : <Navigate to='/admin/login' />

}

export default AdminPrivateRote;