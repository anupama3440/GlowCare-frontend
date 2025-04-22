import React, { useState } from 'react';
import Chip from '@mui/material/Chip';

const WishlistItem = ({ item, addToCart, removeItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle moving item to cart
  const handleAddToCart = () => {
    addToCart(item);
    removeItem(item.id); // Remove item from wishlist after adding to cart
  };

  return (
    <>
      <div className="flex justify-between items-center bg-white p-6 shadow-lg rounded-lg mb-4">
        {/* Product Image */}
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg"
        />

        {/* Product Details */}
        <div className="ml-6 flex-1">
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <p className="text-gray-600 text-lg">Rs. {item.price.toFixed(2)}</p>
        </div>

        <div className="ml-6 flex-1">
          <Chip variant="filled"  label="Out Of Stock" color="error" />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 mr-2 bg-green-600 text-white rounded-lg text-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            Add to Cart
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg text-lg shadow-md hover:bg-red-700 transition duration-300"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Modal for Remove Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Remove</h2>
            <p>Are you sure you want to remove this item from your wishlist?</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 mr-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
              >
                No
              </button>
              <button
                onClick={() => {
                  removeItem(item.id);
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg"
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

export default WishlistItem;
