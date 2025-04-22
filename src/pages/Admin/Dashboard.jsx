import React, { useEffect } from 'react';
import { FaUsers, FaBox, FaTags, FaClipboardList } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import { FaCloudDownloadAlt } from "react-icons/fa";
import 'chart.js/auto';
import { toast } from 'react-toastify';

const Dashboard = () => {
  // Dummy data for cards
  const stats = [
    { icon: <FaUsers />, label: 'Users', value: '1,234' },
    { icon: <FaBox />, label: 'Products', value: '567' },
    { icon: <FaTags />, label: 'Coupons', value: '89' },
    { icon: <FaClipboardList />, label: 'Orders', value: '45' },
  ];

  // Dummy data for the chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Orders',
        data: [30, 50, 40, 60, 80, 70],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
      },
    ],
  };

  // Dummy data for the bar chart
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [300, 500, 400, 600, 800, 700],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  // Dummy data for the table
  const tableData = [
    {
      id: 1,
      user: 'John Doe',
      product: 'Watch A',
      coupon: 'DISCOUNT10',
      category: 'Watches',
    },
    {
      id: 2,
      user: 'Jane Smith',
      product: 'Smartphone B',
      coupon: 'SALE20',
      category: 'Electronics',
    },
    {
      id: 3,
      user: 'Sam Green',
      product: 'Headphones C',
      coupon: 'OFFER30',
      category: 'Accessories',
    },
    {
      id: 4,
      user: 'Alice Brown',
      product: 'Laptop D',
      coupon: 'SAVE15',
      category: 'Computers',
    },
  ];

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // const response = await a
      } catch (error) {
        console.log(error, 'error in fetchingCounts in adminDashboard');
        toast.error('Something went wrong.')
      }
    }
    fetchCounts();
  }, []);

  return (
    <div className="p-6">
      <div className='flex justify-between'>

        <h2 className="text-3xl font-bold mb-6">Welcome Admin ✨</h2>
        <button className='text-xl font-bold border p-2 mb-4 bg-blue-200 rounded-xl pl-6 pr-6 flex gap-4'>Sales Report <FaCloudDownloadAlt /> </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
            <div className="text-4xl text-blue-500">{stat.icon}</div>
            <div>
              <h3 className="text-lg font-medium">{stat.label}</h3>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Graphs (Line and Bar) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Order Growth (Line Chart)</h3>
          <Line data={chartData} options={chartOptions} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Revenue Growth (Bar Chart)</h3>
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>

      {/* Table to display Users, Products, Coupons, and Category */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Users, Products, Coupons, and Categories</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Coupon</th>
                <th className="px-4 py-2">Category</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id} className="bg-white border-b">
                  <td className="px-4 py-2">{row.user}</td>
                  <td className="px-4 py-2">{row.product}</td>
                  <td className="px-4 py-2">{row.coupon}</td>
                  <td className="px-4 py-2">{row.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Example Detail 1 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">Recent Orders</h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Order #1234</span>
              <span className="font-medium text-green-600">Completed</span>
            </li>
            <li className="flex justify-between">
              <span>Order #1235</span>
              <span className="font-medium text-yellow-600">Pending</span>
            </li>
            <li className="flex justify-between">
              <span>Order #1236</span>
              <span className="font-medium text-red-600">Canceled</span>
            </li>
          </ul>
        </div>

        {/* Example Detail 2 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">Product Inventory</h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Product A</span>
              <span>120 units</span>
            </li>
            <li className="flex justify-between">
              <span>Product B</span>
              <span>80 units</span>
            </li>
            <li className="flex justify-between">
              <span>Product C</span>
              <span>45 units</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
