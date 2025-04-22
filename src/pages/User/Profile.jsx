import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Header from '../../components/User/Header';
import Footer from '../../components/Common/Footer';

const ProfilePage = () => {
  const [selectedOption, setSelectedOption] = useState('about');
  const [user, setUser] = useState({
    name: 'Darsan',
    email: 'darsan@example.com',
    phone: '123-456-7890',
    address: '123 Main Street, Springfield, IL',
    walletBalance: '100.00',
    imageUrl: 'https://via.placeholder.com/150',
  });

  // Form state for editing profile and adding address
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser({ ...user, ...formData });
    setSelectedOption('about'); // Redirect to 'about' after saving
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'about':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Profile Information</h2>
            <div className="space-y-2">
              <div>
                <strong className="text-gray-700">Name: </strong>
                <span className="text-gray-600">{user.name}</span>
              </div>
              <div>
                <strong className="text-gray-700">Email: </strong>
                <span className="text-gray-600">{user.email}</span>
              </div>
              <div>
                <strong className="text-gray-700">Phone: </strong>
                <span className="text-gray-600">{user.phone}</span>
              </div>
              <div>
                <strong className="text-gray-700">Address: </strong>
                <span className="text-gray-600">{user.address}</span>
              </div>
            </div>
          </div>
        );
      case 'wallet':
        return (
          <>
            <div className="w-96 mx-auto bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 rounded-lg shadow-lg relative overflow-hidden">
              {/* Card Background Design */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center" style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZsL6PVn0SNiabAKz7js0QknS2ilJam19QQ&s')` }}>
              </div>

              {/* Card Content */}
              <div className="relative z-10 text-white">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">Your Wallet</h2>
                  <p className="mt-2">Name: <span className="font-bold">{user.name}</span></p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-lg">Wallet Balance</p>
                  <span className="text-3xl font-bold">Rs. {user.walletBalance}</span>
                </div>

                {/* Card Number and Valid Thru */}
                <div className="mt-4 text-sm text-white/70">
                  <span className="block">**** **** **** 1234</span>
                  <span className="block">Valid Thru: 12/25</span>
                </div>

                {/* Barcode */}
                <div className="mt-6">
                  <svg className="barcode w-full h-12" viewBox="0 0 150 50">
                    {/* Barcode Bars */}
                    <rect x="10" y="10" width="2" height="40" fill="white" />
                    <rect x="15" y="10" width="3" height="40" fill="black" />
                    <rect x="20" y="10" width="2" height="40" fill="white" />
                    <rect x="25" y="10" width="4" height="40" fill="black" />
                    <rect x="30" y="10" width="2" height="40" fill="white" />
                    <rect x="35" y="10" width="3" height="40" fill="black" />
                    <rect x="40" y="10" width="2" height="40" fill="white" />
                    <rect x="45" y="10" width="3" height="40" fill="black" />
                    <rect x="50" y="10" width="2" height="40" fill="white" />
                    <rect x="55" y="10" width="4" height="40" fill="black" />
                    <rect x="60" y="10" width="2" height="40" fill="white" />
                    <rect x="65" y="10" width="3" height="40" fill="black" />
                    <rect x="70" y="10" width="2" height="40" fill="white" />
                    <rect x="75" y="10" width="4" height="40" fill="black" />
                    <rect x="10" y="10" width="2" height="40" fill="white" />
                    <rect x="80" y="10" width="3" height="40" fill="black" />
                    <rect x="85" y="10" width="2" height="40" fill="white" />
                    <rect x="90" y="10" width="4" height="40" fill="black" />
                    <rect x="95" y="10" width="2" height="40" fill="white" />
                    <rect x="100" y="10" width="3" height="40" fill="black" />
                    <rect x="105" y="10" width="2" height="40" fill="white" />
                    <rect x="110" y="10" width="3" height="40" fill="black" />
                    <rect x="115" y="10" width="2" height="40" fill="white" />
                    <rect x="120" y="10" width="4" height="40" fill="black" />
                    <rect x="125" y="10" width="2" height="40" fill="white" />
                    <rect x="130" y="10" width="3" height="40" fill="black" />
                    <rect x="135" y="10" width="2" height="40" fill="white" />
                    <rect x="140" y="10" width="4" height="40" fill="black" />
                  </svg>
                </div>
              </div>
            </div>
          </>
        );

      case 'resetpassword':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Reset Password</h2>
            <p className="text-gray-500 mt-2">You can reset your password here.</p>
            <div className="space-y-2 mt-4">
              <input type="password" placeholder="Current Password" className="border p-2 rounded w-full" />
              <input type="password" placeholder="New Password" className="border p-2 rounded w-full" />
              <input type="password" placeholder="Confirm New Password" className="border p-2 rounded w-full" />
              <button className="bg-yellow-500 text-white px-4 py-2 rounded">Update Password</button>
            </div>
          </div>
        );
      case 'addaddress':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Add New Address</h2>
            <div className="mt-4 space-y-2">
              <input
                type="text"
                name="address"
                placeholder="New Address"
                className="border p-2 rounded w-full"
                value={formData.address}
                onChange={handleInputChange}
              />
              <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={handleSave}>
                Save Address
              </button>
            </div>
          </div>
        );
      case 'showaddress':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-10">
              {[1, 2,3,4,].map(() => (
                <div className="bg-white shadow-md rounded-lg p-12  relative" key={Math.random()}>
                  <h2 className="text-2xl font-semibold text-gray-800">Saved Address</h2>
                  <div className="mt-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">Name: </span>
                      <span className="text-gray-600">{user.name}</span>
                    </div>
                    <div className="flex flex-col mt-2">
                      <span className="font-medium text-gray-700">Place: </span>
                      <span className="text-gray-600">{user.place}</span>
                    </div>
                    <div className="flex flex-col mt-2">
                      <span className="font-medium text-gray-700">City: </span>
                      <span className="text-gray-600">{user.city}</span>
                    </div>
                    <div className="flex flex-col mt-2">
                      <span className="font-medium text-gray-700">Country: </span>
                      <span className="text-gray-600">{user.country}</span>
                    </div>
                    <div className="flex flex-col mt-2">
                      <span className="font-medium text-gray-700">Pincode: </span>
                      <span className="text-gray-600">{user.pincode}</span>
                    </div>
                  </div>
                  {/* Edit and Delete buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrashAlt className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      case 'editprofile':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Edit Profile</h2>
            <div className="mt-4 space-y-2">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="border p-2 rounded w-full"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border p-2 rounded w-full"
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="border p-2 rounded w-full"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="border p-2 rounded w-full"
                value={formData.address}
                onChange={handleInputChange}
              />
              <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={handleSave}>
                Save Profile
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg flex justify-center mt-10 pb-10">
        <div className="flex flex-col md:flex-row w-full md:w-2/3">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg mb-6 md:mb-0">
            <div className="text-center">
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZsL6PVn0SNiabAKz7js0QknS2ilJam19QQ&s' alt="Profile" className="w-32 h-32 mx-auto rounded-full mb-4" />
              <h2 className="text-lg font-semibold">{user.name}</h2>
            </div>
            <ul className="mt-6 space-y-2">
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${selectedOption === 'about' ? 'bg-yellow-300 text-black' : 'hover:bg-gray-200'
                    }`}
                  onClick={() => setSelectedOption('about')}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${selectedOption === 'wallet' ? 'bg-yellow-300 text-black' : 'hover:bg-gray-200'
                    }`}
                  onClick={() => setSelectedOption('wallet')}
                >
                  Wallet
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${selectedOption === 'resetpassword' ? 'bg-yellow-300 text-black' : 'hover:bg-gray-200'
                    }`}
                  onClick={() => setSelectedOption('resetpassword')}
                >
                  Reset Password
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${selectedOption === 'addaddress' ? 'bg-yellow-300 text-black' : 'hover:bg-gray-200'
                    }`}
                  onClick={() => setSelectedOption('addaddress')}
                >
                  Add Address
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${selectedOption === 'showaddress' ? 'bg-yellow-300 text-black' : 'hover:bg-gray-200'
                    }`}
                  onClick={() => setSelectedOption('showaddress')}
                >
                  Show Address
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${selectedOption === 'editprofile' ? 'bg-yellow-300 text-black' : 'hover:bg-gray-200'
                    }`}
                  onClick={() => setSelectedOption('editprofile')}
                >
                  Edit Profile
                </button>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 bg-white p-10 rounded-lg shadow-lg flex items-center ">
            {renderContent()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
