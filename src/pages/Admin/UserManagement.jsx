import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Importing pagination icons
import { toast } from 'react-toastify';
import { getUsers } from '../../services/adminService';

const UserManagement = () => {
    // Dummy user data
    const usersData = [
        { id: 1, name: 'John Doe', email: 'johndoe@example.com', phone: '123-456-7890', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', phone: '987-654-3210', status: 'Blocked' },
        { id: 3, name: 'Michael Johnson', email: 'michaelj@example.com', phone: '555-123-4567', status: 'Active' },
        { id: 4, name: 'Emily Davis', email: 'emilyd@example.com', phone: '444-222-8888', status: 'Active' },
        { id: 5, name: 'James Wilson', email: 'jamesw@example.com', phone: '333-444-5555', status: 'Blocked' },
        { id: 6, name: 'Sophia Brown', email: 'sophiab@example.com', phone: '222-555-6666', status: 'Active' },
        { id: 7, name: 'David Lee', email: 'davidl@example.com', phone: '888-999-7777', status: 'Blocked' },
        { id: 8, name: 'Olivia Martinez', email: 'oliviam@example.com', phone: '111-333-4444', status: 'Active' },
    ];

    // State variables
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 4;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUsers({ page: currentPage });
                console.log(response.users,'------------response in userManagement page')
                setUsers(response.users)
            } catch (error) {
                console.log(error);
                toast.error('Internal server error');
            }
        }
        fetchData()
    }, []);

    // Handle blocking/unblocking user
    const toggleUserStatus = (id) => {
        setUsers(users.map(user =>
            user._id === id ? { ...user, status: user.status  ? 'Blocked' : 'Active' } : user
        ));
    };

    // Handle search filter
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>

            {/* Search Bar */}
            <div className="mb-4 flex justify-center">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="border px-4 py-2 rounded-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* User Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left">S.No</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Phone</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user,index) => (
                            <tr key={user.id} className="border-b">
                                <td className="px-4 py-2">{index+1}</td>
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.phone}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`px-3 py-1 rounded-full ${user.status ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}
                                    >
                                        {user.status ? 'Active' : 'Blocked'}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => toggleUserStatus(user._id)}
                                        className={`text-white px-4 py-2 rounded-md ${user.status  ? 'bg-red-500' : 'bg-green-500'}`}
                                    >
                                        {user.status  ? 'Block' : 'Unblock'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center">
                {/* Previous Button with Icon */}
                <button
                    onClick={() => paginate(currentPage - 1)}
                    className="px-4 py-2 mx-2 bg-gray-200 rounded-md disabled:opacity-50"
                    disabled={currentPage === 1}
                >
                    <FaChevronLeft className="h-5 w-5 text-gray-600" />
                </button>

                {/* Page Number */}
                <span className="px-4 py-2 text-lg text-gray-600">
                    {currentPage} of {Math.ceil(filteredUsers.length / usersPerPage)}
                </span>

                {/* Next Button with Icon */}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    className="px-4 py-2 mx-2 bg-gray-200 rounded-md disabled:opacity-50"
                    disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
                >
                    <FaChevronRight className="h-5 w-5 text-gray-600" />
                </button>
            </div>
        </div>
    );
};

export default UserManagement;