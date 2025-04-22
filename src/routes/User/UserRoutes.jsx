import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/User/Home';
import ProductDetail from '../../pages/User/ProductDetail';
import Cart from '../../pages/User/Cart';
import Profile from '../../pages/User/Profile';
import Wishlist from '../../pages/User/Wishlist';
import ShopPage from '../../pages/User/ShopPage';
import Login from '../../pages/User/auth/Login';
import Register from '../../pages/User/auth/Register';
import OrderHistory from '../../pages/User/OrderHistory';
import OtpPage from '../../pages/User/auth/OtpPage';
import NotFoundPage from '../../components/Common/404';
import UserPublicRoute from './UserPublicRoutes';
import UserPrivateRoute from './UserPrivateRoute';

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserPublicRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orderHistory" element={<OrderHistory />} />
      </Route>

      {/* <Route element={<UserPrivateRoute />}> */}
        <Route path="/product/:productId" element={<ProductDetail />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/orderHistory" element={<OrderHistory />} /> */}
      {/* </Route> */}
      <Route path="/*" element={<NotFoundPage />} />


    </Routes>
  );
};

export default UserRoutes;
