import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { getProducts } from '../../services/adminService';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    const navigate = useNavigate();

    let totalPages =0;
    useEffect(() => {
        // Fetch products from backend here
        const fetchProducts = async () => {
            try {
                const response = await getProducts(currentPage);
                if (response.success) {
                    console.log(response);
                    totalPages = response.totalPages
                    setProducts(response.products);
                } else {
                    toast.error('Unable to fetch data.');
                }
            } catch (error) {
                console.log('Error in fetchProducts in productPage', error);
                toast.error('Something went wrong');
            }
        }
        fetchProducts();
    }, [currentPage]);

    const handleViewDetails = (productId) => {
        // Navigate to product details page or open modal
        console.log(`Viewing details for product ${productId}`);
    };

    const handleEditProduct = (productId) => {
        const product = products.find(p => p.id === productId);
        setProductToEdit(product);
        setModalOpen(true);
    };

    const handleDeleteProduct = (productId) => {
        // Implement delete functionality
        console.log(`Deleting product ${productId}`);
    };

    // Handle Search Filter
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle Pagination
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const addNewProducts = () => {
        navigate('/admin/products/add');
    }

    return (
        <div className="product-list p-6">
            <h2 className="text-2xl font-semibold mb-4">Product Management</h2>

            <div className="flex justify-between items-center mb-4">
                <div className="w-3/4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="border p-2 w-full rounded-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <StyledWrapper onClick={addNewProducts}>
                    <button type="button" className="button">
                        <span className="button__text">Add Item</span>
                        <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 24 24" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height={24} fill="none" className="svg"><line y2={19} y1={5} x2={12} x1={12} /><line y2={12} y1={12} x2={19} x1={5} /></svg></span>
                    </button>
                </StyledWrapper>
            </div>

            <table className="min-w-full table-auto border-collapse mb-6">
                <thead>
                    <tr>
                        <th className="border p-3 bg-gray-200">Product Name</th>
                        <th className="border p-3 bg-gray-200">Description</th>
                        <th className="border p-3 bg-gray-200">Price</th>
                        <th className="border p-3 bg-gray-200">Category</th>
                        <th className="border p-3 bg-gray-200">Images</th>
                        <th className="border p-3 bg-gray-200">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id} className="border-b hover:bg-gray-100 ">
                            <td className="border p-3 max-w-xs truncate">{product.name}</td>
                            <td className="border p-3 max-w-xs truncate">{product.description}</td>  
                            <td className="border p-3">{product.price}</td>
                            <td className="border p-3">{product.category.name}</td>
                            <td className="border p-3">
                                <img src={product.images[0]} alt={`Product ${product.name}`} className="w-16 h-16 object-cover mr-2" />
                            </td>
                            <td className="border p-3 flex justify-around">
                                <button
                                    onClick={() => handleEditProduct(product.id)}
                                    className="text-yellow-500 hover:text-yellow-700"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center">
                {/* Previous Button with Icon */}
                <button
                    onClick={() => paginate(currentPage - 1)}
                    className="px-4 py-2 mx-2 bg-gray-200 rounded-md disabled:opacity-50"
                    disabled={currentPage === 1}
                >
                    <FaChevronLeft className="h-5 w-5 text-gray-600" />
                </button>

                {/* Page Numbers */}
                <span className="px-4 py-2 text-lg text-gray-600">
                    {currentPage} of {totalPages}
                </span>

                {/* Next Button with Icon */}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    className="px-4 py-2 mx-2 bg-gray-200 rounded-md disabled:opacity-50"
                    disabled={currentPage === totalPages}
                >
                    <FaChevronRight className="h-5 w-5 text-gray-600" />
                </button>
            </div>

            {/* Modal for Add/Edit Product */}
            {modalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">{productToEdit ? 'Edit Product' : 'Add New Product'}</h3>

                        <form>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                        {/* Cover photo */}
                                        <div className="col-span-full">
                                            <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-900">
                                                Cover photo
                                            </label>
                                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                                <div className="text-center">
                                                    <span className="mx-auto h-12 w-12 rounded-full bg-gray-300"></span>
                                                    <div className="mt-4 flex text-sm text-gray-600">
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500 focus:outline-none"
                                                        >
                                                            <span>Upload a file</span>
                                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Information */}
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        {/* First Name */}
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">
                                                First name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="first-name"
                                                    name="first-name"
                                                    type="text"
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 placeholder-gray-400 focus:border-indigo-600"
                                                />
                                            </div>
                                        </div>

                                        {/* Last Name */}
                                        <div className="sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-900">
                                                Last name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="last-name"
                                                    name="last-name"
                                                    type="text"
                                                    autoComplete="family-name"
                                                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 placeholder-gray-400 focus:border-indigo-600"
                                                />
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 placeholder-gray-400 focus:border-indigo-600"
                                                />
                                            </div>
                                        </div>

                                        {/* Country */}
                                        <div className="sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-900">
                                                Country
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="country"
                                                    name="country"
                                                    autoComplete="country-name"
                                                    className="block w-full rounded-md border border-gray-300 bg-white py-1.5 px-3 text-gray-900 focus:border-indigo-600"
                                                >
                                                    <option>United States</option>
                                                    <option>Canada</option>
                                                    <option>Mexico</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Street Address */}
                                        <div className="col-span-full">
                                            <label htmlFor="street-address" className="block text-sm font-medium text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="street-address"
                                                    name="street-address"
                                                    type="text"
                                                    autoComplete="street-address"
                                                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 placeholder-gray-400 focus:border-indigo-600"
                                                />
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm font-semibold text-gray-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
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

export default ProductManagement;



const StyledWrapper = styled.div`
  .button {
    position: relative;
    width: 150px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid #34974d;
    background-color: #3aa856;
  }

  .button, .button__icon, .button__text {
    transition: all 0.3s;
  }

  .button .button__text {
    transform: translateX(30px);
    color: #fff;
    font-weight: 600;
  }

  .button .button__icon {
    position: absolute;
    transform: translateX(109px);
    height: 100%;
    width: 39px;
    background-color: #34974d;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button .svg {
    width: 30px;
    stroke: #fff;
  }

  .button:hover {
    background: #34974d;
  }

  .button:hover .button__text {
    color: transparent;
  }

  .button:hover .button__icon {
    width: 148px;
    transform: translateX(0);
  }

  .button:active .button__icon {
    background-color: #2e8644;
  }

  .button:active {
    border: 1px solid #2e8644;
  }`;
