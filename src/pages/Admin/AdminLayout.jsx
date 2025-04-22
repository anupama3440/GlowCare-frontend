import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBox, FaTags, FaClipboardList, FaBell, FaUserCircle, FaBars, FaSignOutAlt, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const AdminLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [showProductDropdown, setShowProductDropdown] = useState(false);
    const [showCouponDropdown, setShowCouponDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100 max-h-auto">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 w-64 bg-gray-800 text-white p-6 transition-transform duration-200 ease-in-out z-50`}>
                {/* Close Button (only visible when sidebar is open) */}
                <button
                    onClick={toggleSidebar}
                    className="absolute top-4 right-4 text-white text-2xl md:hidden"
                >
                    <FaTimes />
                </button>

                <h2 className="text-2xl font-bold text-center mb-6">Admin Panel</h2>
                <nav className="space-y-4 max-h-auto">
                    <NavLink to="/admin/dashboard" className={({ isActive }) => `flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md ${isActive ? 'bg-gray-700 text-white' : ''}`}>
                        <FaTachometerAlt className="mr-3" /> Dashboard
                    </NavLink>
                    <NavLink to="/admin/users" className={({ isActive }) => `flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md ${isActive ? 'bg-gray-700 text-white' : ''}`}>
                        <FaUsers className="mr-3" /> User Management
                    </NavLink>

                    {/* Product Management with Dropdown */}
                    <div className="relative">
                        <div
                            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer"
                            onClick={() => setShowProductDropdown(!showProductDropdown)}
                        >
                            <FaBox className="mr-3" /> Product Management
                            {showProductDropdown ? <FaChevronUp className="ml-auto" /> : <FaChevronDown className="ml-auto" />}
                        </div>
                        {showProductDropdown && (
                            <div className="pl-6 mt-2 space-y-2">
                                <NavLink
                                    to="/admin/products"
                                    className="block text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-md"
                                >
                                    View Products
                                </NavLink>
                                <NavLink
                                    to="/admin/products/add"
                                    className="block text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-md"
                                >
                                    Add Product
                                </NavLink>
                            </div>
                        )}
                    </div>

                    {/* Coupon Management with Dropdown */}
                    <div className="relative">
                        <div
                            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer"
                            onClick={() => setShowCouponDropdown(!showCouponDropdown)}
                        >
                            <FaTags className="mr-3" /> Coupons
                            {showCouponDropdown ? <FaChevronUp className="ml-auto" /> : <FaChevronDown className="ml-auto" />}
                        </div>
                        {showCouponDropdown && (
                            <div className="pl-6 mt-2 space-y-2">
                                <NavLink
                                    to="/admin/coupons"
                                    className="block text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-md"
                                >
                                    View Coupons
                                </NavLink>
                                <NavLink
                                    to="/admin/coupons/add"
                                    className="block text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-md"
                                >
                                    Add Coupon
                                </NavLink>
                            </div>
                        )}
                    </div>

                    {/* Category Management with Dropdown */}
                    <div className="relative">
                        <div
                            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer"
                            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                        >
                            <FaClipboardList className="mr-3" /> Categories
                            {showCategoryDropdown ? <FaChevronUp className="ml-auto" /> : <FaChevronDown className="ml-auto" />}

                        </div>
                        {showCategoryDropdown && (
                            <div className="pl-6 mt-2 space-y-2">
                                <NavLink
                                    to="/admin/categories"
                                    className="block text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-md"
                                >
                                    View Categories
                                </NavLink>
                                <NavLink
                                    to="/admin/categories/add"
                                    className="block text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-md"
                                >
                                    Add Category
                                </NavLink>
                            </div>
                        )}
                    </div>

                    <NavLink to="/admin/orders" className={({ isActive }) => `flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md ${isActive ? 'bg-gray-700 text-white' : ''}`}>
                        <FaClipboardList className="mr-3" /> Orders
                    </NavLink>
                    <NavLink to="/logout" className="flex items-center px-4 py-2 text-gray-300 hover:bg-red-600 hover:text-white rounded-md">
                        <FaSignOutAlt className="mr-3" /> Logout
                    </NavLink>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    {/* Sidebar Toggle Button (Small Screen) */}
                    <button onClick={toggleSidebar} className="md:hidden text-gray-600">
                        <FaBars className="text-2xl" />
                    </button>

                    {/* Admin Panel Title (Centered) */}
                    <h1 className="text-xl font-semibold mx-auto">Admin Panel</h1>

                    {/* Profile and Notification */}
                    <div className="flex space-x-6 items-center">
                        {/* Profile Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center space-x-2 focus:outline-none">
                                <FaUserCircle className="text-gray-600 text-2xl" />
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg py-2 z-10 hidden group-hover:block">
                                <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Profile
                                </NavLink>
                                <NavLink to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Settings
                                </NavLink>
                                <NavLink to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Logout
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                    <Outlet /> {/* Renders the current route's component */}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
