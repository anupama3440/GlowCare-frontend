import React, { useState } from 'react';
import {
    Package,
    Truck,
    CheckCircle,
    Clock,
    MapPin
} from 'lucide-react';
import Footer from '../../components/Common/Footer';
import Header from '../../components/User/Header';

const sampleOrders = [
    {
        id: 'ORD789012',
        products: [
            { name: 'Smartphone', quantity: 1, price: 799.99 },
            { name: 'Phone Case', quantity: 1, price: 19.99 },
        ],
        totalAmount: 819.98,
        date: '2024-02-20',
        status: 'Placed',
        trackingNumber: 'TRK123456789',
        address: {
            name: 'Jane Smith',
            street: '456 Innovation Road',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA'
        }
    },
    {
        id: 'ORD123456',
        products: [
            { name: 'Laptop', quantity: 1, price: 999.99 },
            { name: 'Wireless Mouse', quantity: 2, price: 49.99 },
        ],
        totalAmount: 1099.97,
        date: '2024-02-15',
        status: 'Shipped',
        trackingNumber: 'TRK987654321',
        address: {
            name: 'John Doe',
            street: '123 Tech Lane',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94105',
            country: 'USA'
        }
    },
    {
        id: 'ORD789012',
        products: [
            { name: 'Smartphone', quantity: 1, price: 799.99 },
            { name: 'Phone Case', quantity: 1, price: 19.99 },
        ],
        totalAmount: 819.98,
        date: '2024-02-20',
        status: 'Out for Delivery',
        trackingNumber: 'TRK123456789',
        address: {
            name: 'Jane Smith',
            street: '456 Innovation Road',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA'
        }
    },
    {
        id: 'ORD123456',
        products: [
            { name: 'Laptop', quantity: 1, price: 999.99 },
            { name: 'Wireless Mouse', quantity: 2, price: 49.99 },
        ],
        totalAmount: 1099.97,
        date: '2024-02-15',
        status: 'Delivered',
        trackingNumber: 'TRK987654321',
        address: {
            name: 'John Doe',
            street: '123 Tech Lane',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94105',
            country: 'USA'
        }
    }
];

const OrderHistory = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);

    const getStatusDetails = (status) => {
        const statusMap = {
            'Placed': {
                color: 'bg-blue-500',
                icon: <Clock className="text-blue-500" />,
                progress: 25,
                animation: 'animate-pulse'
            },
            'Shipped': {
                color: 'bg-yellow-500',
                icon: <Package className="text-yellow-500" />,
                progress: 50,
                animation: 'animate-bounce'
            },
            'Out for Delivery': {
                color: 'bg-orange-500',
                icon: <Truck className="text-orange-500" />,
                progress: 75,
                animation: 'animate-bounce'
            },
            'Delivered': {
                color: 'bg-green-500',
                icon: <CheckCircle className="text-green-500" />,
                progress: 100,
                animation: 'animate-none'
            }
        };
        return statusMap[status] || statusMap['Placed'];
    };

    const openOrderDetails = (order) => {
        setSelectedOrder(order);
    };

    const closeOrderDetails = () => {
        setSelectedOrder(null);
    };

    return (
        <>
            <Header />
            <div className="container mx-auto   bg-gray-100 min-h-screen p-20">
                <h1 className="text-3xl font-bold mb-6 text-center">Order History</h1>

                <div className="space-y-6">
                    {sampleOrders.map((order) => {
                        const statusDetails = getStatusDetails(order.status);

                        return (
                            <div
                                key={order.id}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800">Order #{order.id}</h2>
                                    <div className={`flex items-center ${statusDetails.animation}`}>
                                        <span className="text-xl">{statusDetails.icon}</span>
                                        <span className="ml-2 font-medium text-gray-700">{order.status}</span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className={`${statusDetails.color} h-2.5 rounded-full`}
                                            style={{ width: `${statusDetails.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Order Details</h3>
                                        {order.products.map((product, index) => (
                                            <div key={index} className="flex justify-between text-gray-600">
                                                <span>{product.name}</span>
                                                <span>{product.quantity} x Rs. {product.price.toFixed(2)}</span>
                                            </div>
                                        ))}
                                        <p className="font-bold mt-2 text-gray-800">
                                            Total: Rs. {order.totalAmount.toFixed(2)}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Tracking Info</h3>
                                        <p className="text-gray-600">Tracking Number: {order.trackingNumber}</p>
                                        <p className="text-gray-600">Order Date: {order.date}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => openOrderDetails(order)}
                                    className="mt-4 w-full md:w-1/4 bg-yellow-300 text-black py-2 rounded-lg hover:bg-yellow-400 transition duration-300 ease-in-out"
                                >
                                    View Full Details
                                </button>
                            </div>
                        );
                    })}
                </div>


                {selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
                        <div className="bg-white rounded-lg p-8 max-w-4xl w-full shadow-xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-gray-800">Order Details</h2>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="text-gray-600 hover:text-gray-900 text-2xl"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Customer Info */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-gray-800">Customer Information</h3>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-600">Name: <span className="font-semibold text-gray-800">{selectedOrder.customerName}</span></p>
                                        <p className="text-sm text-gray-600">Address: <span className="font-semibold text-gray-800">{selectedOrder.shippingAddress}</span></p>
                                        <p className="text-sm text-gray-600">Payment Method: <span className="font-semibold text-gray-800">{selectedOrder.paymentMethod}</span></p>
                                    </div>
                                </div>

                                {/* Product Details */}
                                {selectedOrder.products.map((product, index) => (
                                    <div key={index} className="flex items-center space-x-6">
                                        <img
                                            src="https://static.vecteezy.com/system/resources/thumbnails/023/460/015/small_2x/luxury-cosmetic-products-illustration-ai-generative-free-photo.jpg"
                                            alt={product.name}
                                            className="w-24 h-24 object-cover rounded-lg shadow-md"
                                        />
                                        <div>
                                            <p className="font-semibold text-lg text-gray-800">{product.name}</p>
                                            <p className="text-sm text-gray-600">
                                                Quantity: {product.quantity} | Price: ${product.price.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {/* Order Summary */}
                                <div className="mt-6 border-t pt-6 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg font-bold text-gray-800">Total Amount:</p>
                                        <p className="text-xl font-semibold text-gray-800">${selectedOrder.totalAmount.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-600">Order Date:</p>
                                        <p className="text-sm font-semibold text-gray-800">{selectedOrder.date}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-600">Status:</p>
                                        <p className="text-sm font-semibold text-gray-800">{selectedOrder.status}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default OrderHistory;