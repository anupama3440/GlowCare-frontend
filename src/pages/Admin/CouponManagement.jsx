import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';

const CouponManagement = () => {
    const [coupons, setCoupons] = useState([
        { id: 1, code: 'SUMMER2025', discount: 20, expiry: '2025-07-01', minAmount: 100 },
        { id: 2, code: 'WINTER2025', discount: 15, expiry: '2025-12-01', minAmount: 150 },
    ]);
    const [showCouponModal, setShowCouponModal] = useState(false);
    const [couponToEdit, setCouponToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [couponToDelete, setCouponToDelete] = useState(null);

    const handleSaveCoupon = (couponData) => {
        if (couponToEdit) {
            setCoupons(coupons.map(coupon =>
                coupon.id === couponToEdit.id ? { ...coupon, ...couponData } : coupon
            ));
        } else {
            const newCoupon = { id: Date.now(), ...couponData };
            setCoupons([...coupons, newCoupon]);
        }
        setShowCouponModal(false);
        setCouponToEdit(null);
    };

    const handleEditCoupon = (coupon) => {
        setCouponToEdit(coupon);
        setShowCouponModal(true);
    };

    const handleDeleteCoupon = (id) => {
        setCoupons(coupons.filter(coupon => coupon.id !== id));
        setShowDeleteConfirm(false);
    };

    const filteredCoupons = coupons.filter(coupon =>
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Coupons Management</h2>

            {/* Search bar */}

            <div className="mb-8">
                <div className="flex justify-between items-center bg-white p-5 rounded-lg shadow-md border border-gray-200">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by Coupon Code"
                        className="border border-gray-300 p-3 w-2/3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <button
                        onClick={() => setShowCouponModal(true)}
                        className="flex items-center bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-200"
                    >
                        <MdAdd size={20} className="mr-2" /> Add New Coupon
                    </button>
                </div>
            </div>

            <table className="min-w-full bg-white shadow-md rounded-md">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-4 text-left text-sm font-semibold text-gray-700">Coupon Code</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-700">Discount (%)</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-700">Expiration Date</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-700">Min. Amount</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCoupons.map((coupon) => (
                        <tr key={coupon.id} className="border-t hover:bg-gray-50">
                            <td className="p-4 text-sm text-gray-700">{coupon.code}</td>
                            <td className="p-4 text-sm text-gray-700">{coupon.discount}%</td>
                            <td className="p-4 text-sm text-gray-700">{coupon.expiry}</td>
                            <td className="p-4 text-sm text-gray-700">Rs. {coupon.minAmount}</td>
                            <td className="p-4 text-sm text-gray-700">
                                <button
                                    onClick={() => handleEditCoupon(coupon)}
                                    className="text-blue-500 hover:text-blue-700 mr-2"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => {
                                        setCouponToDelete(coupon);
                                        setShowDeleteConfirm(true);
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4 text-center">Confirm Deletion</h3>
                        <p className="text-center mb-6">Are you sure you want to delete the coupon "{couponToDelete?.code}"?</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="bg-gray-400 text-white p-3 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteCoupon(couponToDelete.id)}
                                className="bg-red-500 text-white p-3 rounded-md"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Adding/Editing Coupon */}
            {showCouponModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-96">
                        <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">{couponToEdit ? 'Edit Coupon' : 'Add New Coupon'}</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSaveCoupon({
                                    code: e.target.code.value,
                                    discount: e.target.discount.value,
                                    expiry: e.target.expiry.value,
                                    minAmount: e.target.minAmount.value,
                                });
                            }}
                        >
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2 text-gray-700">Coupon Code</label>
                                <input
                                    type="text"
                                    name="code"
                                    defaultValue={couponToEdit?.code || ''}
                                    className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2 text-gray-700">Discount (%)</label>
                                <input
                                    type="number"
                                    name="discount"
                                    defaultValue={couponToEdit?.discount || ''}
                                    className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2 text-gray-700">Expiration Date</label>
                                <input
                                    type="date"
                                    name="expiry"
                                    defaultValue={couponToEdit?.expiry || ''}
                                    className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2 text-gray-700">Minimum Amount</label>
                                <input
                                    type="number"
                                    name="minAmount"
                                    defaultValue={couponToEdit?.minAmount || ''}
                                    className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCouponModal(false)}
                                    className="bg-gray-400 hover:bg-gray-500 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all duration-200"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CouponManagement;
