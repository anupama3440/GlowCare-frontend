import React, { useEffect, useState } from 'react';
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import Header from '../../components/User/Header';
import Footer from '../../components/Common/Footer';
import { getProducts } from '../../services/userService';

// const products = [
//     { id: 1, name: 'Lipstick - Rouge Red', price: 500, category: 'Lipstick', image: 'https://media.istockphoto.com/id/1428709516/photo/shopping-online-woman-hand-online-shopping-on-laptop-computer-with-virtual-graphic-icon.jpg?s=612x612&w=0&k=20&c=ROAncmFL4lbSQdU4VOhyXu-43ngzfEqHE5ZZAw5FtYk=' },
//     { id: 2, name: 'Lip Gloss - Shimmer Pink', price: 300, category: 'Lip Gloss', image: 'https://media.istockphoto.com/id/1428709516/photo/shopping-online-woman-hand-online-shopping-on-laptop-computer-with-virtual-graphic-icon.jpg?s=612x612&w=0&k=20&c=ROAncmFL4lbSQdU4VOhyXu-43ngzfEqHE5ZZAw5FtYk=' },
//     { id: 3, name: 'Foundation - Natural Beige', price: 800, category: 'Foundation', image: 'https://media.istockphoto.com/id/1428709516/photo/shopping-online-woman-hand-online-shopping-on-laptop-computer-with-virtual-graphic-icon.jpg?s=612x612&w=0&k=20&c=ROAncmFL4lbSQdU4VOhyXu-43ngzfEqHE5ZZAw5FtYk=' },
//     { id: 4, name: 'Eyeliner - Jet Black', price: 350, category: 'Eyeliner', image: 'https://media.istockphoto.com/id/1428709516/photo/shopping-online-woman-hand-online-shopping-on-laptop-computer-with-virtual-graphic-icon.jpg?s=612x612&w=0&k=20&c=ROAncmFL4lbSQdU4VOhyXu-43ngzfEqHE5ZZAw5FtYk=' },
//     { id: 5, name: 'Mascara - Volume Boost', price: 600, category: 'Mascara', image: 'https://media.istockphoto.com/id/1428709516/photo/shopping-online-woman-hand-online-shopping-on-laptop-computer-with-virtual-graphic-icon.jpg?s=612x612&w=0&k=20&c=ROAncmFL4lbSQdU4VOhyXu-43ngzfEqHE5ZZAw5FtYk=' },
//     { id: 6, name: 'Blush - Peach Glow', price: 450, category: 'Blush', image: 'https://media.istockphoto.com/id/1428709516/photo/shopping-online-woman-hand-online-shopping-on-laptop-computer-with-virtual-graphic-icon.jpg?s=612x612&w=0&k=20&c=ROAncmFL4lbSQdU4VOhyXu-43ngzfEqHE5ZZAw5FtYk=' },
//     { id: 7, name: 'Nail Polish - Coral Crush', price: 150, category: 'Nail Polish', image: 'https://media.istockphoto.com/id/1428709516/photo/shopping-online-woman-hand-online-shopping-on-laptop-computer-with-virtual-graphic-icon.jpg?s=612x612&w=0&k=20&c=ROAncmFL4lbSQdU4VOhyXu-43ngzfEqHE5ZZAw5FtYk=' },
//     { id: 8, name: 'Eyeshadow Palette - Nude Shades', price: 1200, category: 'Eyeshadow', image: 'https://media.istockphoto.com/id/1428709516/photo/shopping-online-woman-hand-online-shopping-on-laptop-computer-with-virtual-graphic-icon.jpg?s=612x612&w=0&k=20&c=ROAncmFL4lbSQdU4VOhyXu-43ngzfEqHE5ZZAw5FtYk=' },
//     { id: 9, name: 'Concealer - Fair Ivory', price: 400, category: 'Concealer', image: 'https://media.istockphoto.com/id/1428709516/photo/shopping-online-woman-hand-online-shopping-on-laptop-computer-with-virtual-graphic-icon.jpg?s=612x612&w=0&k=20&c=ROAncmFL4lbSQdU4VOhyXu-43ngzfEqHE5ZZAw5FtYk=' },
//     { id: 10, name: 'Highlighter - Golden Glow', price: 700, category: 'Highlighter', image: 'https://media.istockphoto.com/id/1428709516/photo/shopping-online-woman-hand-online-shopping-on-laptop-computer-with-virtual-graphic-icon.jpg?s=612x612&w=0&k=20&c=ROAncmFL4lbSQdU4VOhyXu-43ngzfEqHE5ZZAw5FtYk=' },
//     { id: 11, name: 'Lip Balm - Strawberry', price: 200, category: 'Lip Balm', image: 'https://media.istockphoto.com/id/1428709516/photo/shopping-online-woman-hand-online-shopping-on-laptop-computer-with-virtual-graphic-icon.jpg?s=612x612&w=0&k=20&c=ROAncmFL4lbSQdU4VOhyXu-43ngzfEqHE5ZZAw5FtYk=' },
//     { id: 12, name: 'BB Cream - Light', price: 650, category: 'BB Cream', image: 'https://media.istockphoto.com/id/1428709516/photo/shopping-online-woman-hand-online-shopping-on-laptop-computer-with-virtual-graphic-icon.jpg?s=612x612&w=0&k=20&c=ROAncmFL4lbSQdU4VOhyXu-43ngzfEqHE5ZZAw5FtYk=' },
// ];

const ShopPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [sortOrder, setSortOrder] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setLoading(true);
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response.products);
                setCategories(response.categories)
            } catch (error) {
                console.log('Something went wrong!, shopPage', error)
            }
        }
        fetchProducts();
        setTimeout(() => {
            setLoading(false);
        }, 3000)
    }, [])

    const filteredProducts = products
        .filter(product =>
            (selectedCategory.length === 0 || selectedCategory.includes(product.category.name)) &&
            (!minPrice || product.price >= minPrice) &&
            (!maxPrice || product.price <= maxPrice) &&
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.name.localeCompare(b.name);
            } else if (sortOrder === 'desc') {
                return b.name.localeCompare(a.name);
            }
            return 0;
        });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const toggleCategory = (category) => {
        console.log(category,'0000000000000000000000000000000000000000000000')
        setSelectedCategory(prev =>
            prev.includes(category)
                ? prev.filter(cat => cat !== category)
                : [...prev, category]
        );
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-6 flex">
                {/* Left Sidebar for Filters */}
                <div className="w-1/4 p-4 bg-white rounded-lg shadow-2xl mr-6">
                    <h2 className="text-xl font-bold mb-4">Filters</h2>
                    <div className="mb-4">
                        <h3 className="text-lg mb-2">Category</h3>
                        <div>
                            {categories.map(category => (
                                <div key={category._id} className="flex items-center mb-2 gap-4">
                                    <input
                                        type="checkbox"
                                        id={category._id}
                                        onChange={() => toggleCategory(category.name)}
                                        checked={selectedCategory.includes(category.name)}
                                    />
                                    <img className='h-8 gap-2' src={category.image} alt={category.name} />
                                    <label htmlFor={category} className="ml-2">{category.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price Filter */}
                    <div className="mb-4">
                        <h3 className="text-lg mb-2">Price Range</h3>
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="p-2 border border-gray-400 rounded-md mb-2 w-full"
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="p-2 border border-gray-400 rounded-md w-full"
                        />
                    </div>

                    {/* Sorting */}
                    <div className="mb-4">
                        <h3 className="text-lg mb-2">Sort By</h3>
                        <select
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="p-2 border border-gray-400 rounded-md w-full"
                        >
                            <option value="">Select Sort Order</option>
                            <option value="asc">Alphabetical: A-Z</option>
                            <option value="desc">Alphabetical: Z-A</option>
                        </select>
                    </div>
                </div>

                {/* Product Listing */}
                <div className="w-3/4">
                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder="Search products"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 border border-gray-400 rounded-md w-1/2"
                        />
                    </div>

                    {
                        loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Array(6).fill().map((_, index) => (
                                    <div key={index} className="bg-white shadow-md rounded-lg p-4 animate-pulse">
                                        <div className="w-full h-48 bg-gray-300 rounded mb-4"></div>
                                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
                                        <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                                        <div className="flex justify-between">
                                            <div className="h-10 bg-gray-300 rounded w-1/3"></div>
                                            <div className="h-10 bg-gray-300 rounded w-1/3"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                            :
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentProducts.map(product => (
                                    <div key={product._id} className="bg-white shadow-md rounded-lg p-4">
                                        <img src={product?.images[0]} alt={product.name} className="w-full h-48 object-cover mb-4" />
                                        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                                        <p className="text-gray-600 mb-2">₹{product.price}</p>
                                        <p className="text-gray-600">Category: {product.category?.name}</p>

                                        {/* Add to Cart Button */}
                                        <div className='flex justify-between'>

                                            <button
                                                onClick={() => addToCart(product)}
                                                className="p-2 mt-4 mr-2 rounded-md bg-green-500"
                                            >
                                                <FaCartPlus className="inline-block mr-2" />
                                                Add to Cart
                                            </button>

                                            {/* Add to Wishlist Button */}
                                            <button
                                                onClick={() => addToWishlist(product)}
                                                className="p-2 mt-4 rounded-md bg-red-500 text-white"
                                            >
                                                <FaHeart className="inline-block mr-2" />
                                                Add to Wishlist
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                    }

                    {/* Pagination */}
                    <div className="mt-6 flex justify-center items-center">
                        {/* Previous Button */}
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 mx-1 rounded-md bg-gray-200 disabled:bg-gray-400"
                        >
                            Previous
                        </button>

                        {/* Page Numbers */}
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`p-2 mx-1 rounded-md ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                            >
                                {number}
                            </button>
                        ))}

                        {/* Next Button */}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 mx-1 rounded-md bg-gray-200 disabled:bg-gray-400"
                        >
                            Next
                        </button>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default ShopPage;
