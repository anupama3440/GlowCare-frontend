import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  // Maintain state for cart and wishlist
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleAddToCart = () => {
    setIsInCart(!isInCart); // Toggle cart status
  };

  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist); // Toggle wishlist status
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`); // Navigate to the product details page
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        {/* Product Tag */}
        {product.tag && (
          <span
            className={`absolute top-2 left-2 px-3 py-1 text-sm font-semibold rounded-full ${product.tag === 'Newly Arrived' ? 'bg-green-500 text-white' : ''
              } ${product.tag === 'Expensive' ? 'bg-red-500 text-white' : ''} ${product.tag === 'Best Seller' ? 'bg-yellow-500 text-white' : ''}`}
          >
            {product.tag}
          </span>
        )}
        <img
          src={product.images[0]} // Fetch the first image from the array
          alt={product.name}
          className="w-full h-48 object-cover mb-4 rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.brand}</p>
        <div className="flex items-center mt-2">
          <img src={product.category?.image} alt="cat_img" className="w-8 h-8 object-cover rounded-full mr-2" />
          <p className='text-gray-600'>{product.category?.name}</p>
        </div>
        <p className="text-lg font-bold text-purple-600 mt-2">Rs. {product.price}</p>

        {/* View Details using useNavigate */}
        <button
          onClick={handleViewDetails}
          className="text-purple-600 hover:text-purple-800 mt-4 inline-block"
        >
          View Details
        </button>

        <div className="mt-4 flex justify-between items-center">
          {/* Add to Cart Icon */}
          <div
            onClick={handleAddToCart}
            className={`p-3 rounded-full cursor-pointer transition-all duration-300 
              ${isInCart ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-800'} 
              hover:bg-green-400 hover:text-white`}
          >
            <FaShoppingCart size={24} />
          </div>

          {/* Add to Wishlist Icon */}
          <div
            onClick={handleAddToWishlist}
            className={`p-3 rounded-full cursor-pointer transition-all duration-300 
              ${isInWishlist ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-800'} 
              hover:bg-red-400 hover:text-white`}
          >
            <FaHeart size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;