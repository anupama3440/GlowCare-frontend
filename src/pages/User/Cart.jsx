import React, { useState } from 'react';
import CartItem from '../../components/User/CartItem';
import Header from '../../components/User/Header';

// Static data for demonstration purposes
const initialCart = [
  {
    id: 1,
    name: 'Moisturizer',
    price: 499,
    quantity: 1,
    image: 'https://m.media-amazon.com/images/I/61xPqnsI09L._SX522_.jpg',
  },
  // {
  //   id: 2,
  //   name: 'Facial Moisturizer',
  //   price: 35.50,
  //   quantity: 2,
  //   image: 'https://www.kazima.in/wp-content/uploads/2024/03/cosmetics.jpg',
  // },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);

  // Update quantity of item
  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(updatedCart);
  };

  // Remove item from cart
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  // Calculate total price
  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <>
      <Header />
      <div className="bg-gray-100 py-12 h-screen">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                ))}
              </div>

              {/* Cart Summary */}
              <OrderSummary totalItems={cart.length} totalPrice={getTotalPrice()} />
            </div>
          ) : (
            // Empty Cart Message
            <div className="text-center">
              <p className="text-lg font-semibold mb-4">Your cart is currently empty.</p>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}


const OrderSummary = ({ totalItems, totalPrice }) => {
  return (
    <div className="bg-white p-8 shadow-lg rounded-xl border border-gray-200">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Order Summary</h2>
      
      {/* Item and Price Details */}
      <div className="mb-6">
        <p className="text-lg text-gray-700">Total Items: <span className="font-medium">{totalItems}</span></p>
        <p className="text-lg text-gray-700">Total Price: <span className="font-medium">Rs. {totalPrice}</span></p>
      </div>
      
      {/* Proceed to Checkout Button */}
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
        Proceed to Checkout
      </button>
      
      {/* Continue Shopping Button */}
      <button className="w-full mt-4 bg-gray-600 text-white py-3 rounded-lg text-lg font-medium shadow-md hover:bg-gray-700 transition duration-300 ease-in-out">
        Continue Shopping
      </button>
    </div>
  );
};
