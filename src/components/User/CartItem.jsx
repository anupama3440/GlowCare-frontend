import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartItem = ({ item, updateQuantity, removeItem }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle Quantity Decrease
  const handleDecrease = () => {
    if (item.quantity === 1) {
      setIsModalOpen(true);
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  // Handle Quantity Increase with limit to 5
  const handleIncrease = () => {
    if (item.quantity < 5) {
      updateQuantity(item.id, item.quantity + 1);
    } else {
      toast.error('You can only purchase up to 5 items at a time.');
    }
  };

  return (
    <>
      <div className="flex justify-between items-center bg-white p-6 shadow-md rounded-xl mb-6">
        {/* Product Image */}
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-xl" // Increased image size
        />

        {/* Product Details */}
        <div className="ml-6 flex-1">
          <h2 className="text-2xl font-semibold">{item.name}</h2> {/* Increased font size */}
          <p className="text-xl text-gray-600">Rs. {item.price.toFixed(2)}</p> {/* Increased font size */}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center">
          <button
            onClick={handleDecrease}
            className="px-4 py-2 text-white bg-gray-600 rounded-lg text-lg" // Increased button size
          >
            -
          </button>
          <input
            type="text"
            value={item.quantity}
            readOnly
            className="w-16 mx-4 border text-center text-lg" // Increased input size
          />
          <button
            onClick={handleIncrease}
            className="px-4 py-2 text-white bg-gray-600 rounded-lg text-lg" // Increased button size
          >
            +
          </button>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-6 px-6 py-3 bg-red-500 hover:bg-red-700 text-white rounded-xl text-lg" // Increased button size
        >
          Remove
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Confirm Remove</h2> {/* Increased font size */}
            <p className="text-lg mb-4">Are you sure you want to remove this item from your cart?</p> {/* Increased font size */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 mr-4 bg-gray-300 hover:bg-gray-400 rounded-lg text-lg" 
              >
                No
              </button>
              <button
                onClick={() => {
                  removeItem(item.id);
                  setIsModalOpen(false);
                }}
                className="px-6 py-3 bg-red-500 hover:bg-red-700 text-white rounded-lg text-lg" 
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;
