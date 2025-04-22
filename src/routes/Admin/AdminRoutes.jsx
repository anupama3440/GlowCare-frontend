import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../../pages/Admin/Login';
import Dashboard from '../../pages/Admin/Dashboard';
import UserManagement from '../../pages/Admin/UserManagement';
import ProductManagement from '../../pages/Admin/ProductManagement';
import CouponManagement from '../../pages/Admin/CouponManagement';
import CategoryManagement from '../../pages/Admin/CategoryManagement';
import AdminLayout from '../../pages/Admin/AdminLayout';
import OrderManagement from '../../pages/Admin/OrderManagement';
import NotFoundPage from '../../components/Common/404';
import AddProducts from '../../components/Admin/AddProducts';
import AdminPublicRoute from './AdminPublicRoutes';
import AdminPrivateRote from './AdminPrivateRoutes';

const AdminRoutes = () => {
  return (
    <Routes>
      {/* public route of admin */}
      <Route element={<AdminPublicRoute />}>
        <Route path='/login' element={<Login />} />
      </Route>

      {/* all the private routes are here of admin   */}
      <Route element={<AdminPrivateRote />}>
        <Route path='/' element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path='products/add' element={<AddProducts />} />
          <Route path="coupons" element={<CouponManagement />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="orders" element={<OrderManagement />} />
        </Route>
      </Route>
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AdminRoutes;
