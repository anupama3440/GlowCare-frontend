import React, { useState } from 'react';
import WishlistItem from '../../components/User/WishlistItem'; // Assuming the WishlistItem is in the same folder
import Header from '../../components/User/Header';
import { toast } from 'react-toastify';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([
        {
            id: 1,
            name: 'Smart Watch',
            price: 2999.99,
            image: 'https://static.horiba.com/fileadmin/Horiba/_processed_/0/0/csm_cosmetics-1-definition-margin_c6cdd9b6ae.jpg',
        },
        {
            id: 2,
            name: 'Wireless Headphones',
            price: 1999.99,
            image: 'https://static.horiba.com/fileadmin/Horiba/_processed_/0/0/csm_cosmetics-1-definition-margin_c6cdd9b6ae.jpg',
        },
        {
            id: 3,
            name: 'Laptop Bag',
            price: 1499.99,
            image: 'https://static.horiba.com/fileadmin/Horiba/_processed_/0/0/csm_cosmetics-1-definition-margin_c6cdd9b6ae.jpg',
        },
    ]);

    const addToCart = (item) => {
        console.log(`Added to cart: ${item.name}`);
        toast.success('Item added to cart')
        // Handle adding the item to cart logic here
    };

    const removeItem = (id) => {
        setWishlistItems(wishlistItems.filter((item) => item.id !== id));
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-semibold text-center mb-6">Your Wishlist</h1>

                {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 p-4 m-10 ">
                        {wishlistItems.map((item) => (
                            <WishlistItem
                                key={item.id}
                                item={item}
                                addToCart={addToCart}
                                removeItem={removeItem}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-lg text-gray-600 text-center">
                            Your wishlist is empty.
                        </p>
                    </div>
                )}
            </div>
        </>

    );
};

export default Wishlist;
