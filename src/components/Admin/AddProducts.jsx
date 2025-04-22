import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { addProduct, getCategories } from '../../services/adminService';
import { toast } from 'react-toastify';
// const categories = ['679777de26b67f099d536530', '679777de26b67f099d536530', '679777de26b67f099d536530', '679777de26b67f099d536530']

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        brand: '',
        discount: '',
        tags: [],
        images: [],
    });

    const [imageFiles, setImageFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const [tagInput, setTagInput] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            const fetchCategories = async () => {
                const response = await getCategories();
                if (response.success) {
                    setCategories(response.categories);
                }
            }
            fetchCategories();
        } catch (error) {
            console.log('Error in addProduct useEffect');
            toast.error('Something went wrong')
            throw error;
        }

    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const imageURLs = files.map((file) => ({
            url: URL.createObjectURL(file),
            altText: '',
        }));
        setImageFiles(files);
        setFormData({ ...formData, images: imageURLs });
    };

    const handleAltTextChange = (index, value) => {
        const updatedImages = formData.images.map((image, idx) => {
            if (idx === index) return { ...image, altText: value };
            return image;
        });
        setFormData({ ...formData, images: updatedImages });
    };

    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    const handleTagKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            if (tagInput.trim()) {
                setFormData((prevState) => ({
                    ...prevState,
                    tags: [...prevState.tags, tagInput.trim()],
                }));
                setTagInput(''); // Reset tag input after adding
            }
        }
    };

    const handleRemoveTag = (indexToRemove) => {
        setFormData((prevState) => ({
            ...prevState,
            tags: prevState.tags.filter((_, index) => index !== indexToRemove),
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = 'Product name is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
        if (!formData.stock || formData.stock < 0) newErrors.stock = 'Valid stock is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.brand) newErrors.brand = 'Brand is required';
        if (formData.images.length === 0) newErrors.images = 'At least one image is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Form is valid if there are no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (validateForm()) {
            console.log(formData.category, '------------cat');
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('price', formData.price);
            data.append('stock', formData.stock);
            data.append('category', formData.category);
            data.append('brand', formData.brand);
            data.append('discount', formData.discount);
            data.append('tags', JSON.stringify(formData.tags));
            imageFiles.forEach((file) => {
                data.append('images', file);
            });
            console.log(data, 'data');
            try {
                const response = await addProduct(data);
                setTimeout(() => {
                    setLoading(false)
                    setFormData({
                        name: '',
                        description: '',
                        price: '',
                        stock: '',
                        category: '',
                        brand: '',
                        discount: '',
                        tags: [],
                        images: [],
                    })
                }, 3000);
            } catch (error) {
                console.log('Error in AddProducts.jsx admin ',error);
                setLoading(false);
                toast.error('Something Went wrong.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md">
            <div className='flex justify-center'>
                <h2 className="text-2xl font-semibold mb-6">Add Product</h2>
            </div>

            {/* Product Name */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Product Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'
                        } rounded-md`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Description */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Description <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`mt-1 block w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'
                        } rounded-md`}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Price */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Price <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`mt-1 block w-full p-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'
                        } rounded-md`}
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            {/* Stock */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Stock <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className={`mt-1 block w-full p-2 border ${errors.stock ? 'border-red-500' : 'border-gray-300'
                        } rounded-md`}
                    min="0"
                />
                {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
            </div>

            {/* Category */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Category <span className="text-red-500">*</span>
                </label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`mt-1 block w-full p-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'
                        } rounded-md`}
                >
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Brand */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Brand <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className={`mt-1 block w-full p-2 border ${errors.brand ? 'border-red-500' : 'border-gray-300'
                        } rounded-md`}
                />
                {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
            </div>

            {/* Discount */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
                <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    min="0"
                    max="100"
                />
            </div>

            {/* Tags */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <input
                    type="text"
                    name="tags"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    onKeyPress={handleTagKeyPress}
                    placeholder="Add a tag and press Enter"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {/* Display tags below */}
                <div className="mt-2">
                    {formData.tags.map((tag, index) => (
                        <div
                            key={index}
                            className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-3 py-1 rounded-full"
                        >
                            {tag}
                            <button
                                type="button"
                                className="ml-2 text-blue-500 hover:text-blue-700"
                                onClick={() => handleRemoveTag(index)}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Images */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Upload Images <span className="text-red-500">*</span>
                </label>
                <br />

                <StyledWrapper>
                    <label htmlFor="file" className="custum-file-upload">
                        <div className="icon">
                            <svg viewBox="0 0 24 24" fill xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill /> </g></svg>
                        </div>
                        <div className="text">
                            <span>Click to upload image  </span>
                        </div>
                        <input id="file" type="file" multiple onChange={handleFileChange} className={`mt-1 block w-full p-2 border ${errors.images ? 'border-red-500' : 'border-gray-300'} rounded-md`} />
                    </label>
                </StyledWrapper>

                {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
            </div>

            {/* Display uploaded images */}
            <div className="mt-4 grid grid-cols-2 gap-4">
                {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                        <img src={image.url} alt={`Uploaded ${index}`} className="h-32 w-full object-cover rounded-md" />
                        <input
                            type="text"
                            value={image.altText}
                            onChange={(e) => handleAltTextChange(index, e.target.value)}
                            placeholder="Alt text"
                            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                ))}
            </div>

            {/* Submit Button */}
            <div className='flex justify-center mt-10'>

                <StyledWrapperButton>
                    <button type="submit" disabled={loading}> Add Product
                    </button>
                </StyledWrapperButton>
            </div>

        </form>
    );
};


const StyledWrapper = styled.div`
  .custum-file-upload {
    height: 100px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    gap: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border: 2px dashed #e8e8e8;
    background-color: #212121;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0px 48px 35px -48px #e8e8e8;
  }

  .custum-file-upload .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .icon svg {
    height: 30px;
    fill: #e8e8e8;
  }

  .custum-file-upload .text {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .text span {
    font-weight: 400;
    color: #e8e8e8;
  }

  .custum-file-upload input {
    display: none;
  }`;


const StyledWrapperButton = styled.div`
  button {
   background-color: #374151;
   border: none;
   padding: 1rem;
   font-size: 1rem;
   width: 10em;
   border-radius: 1rem;
   color: yellow;
   box-shadow: 0 0.4rem #626c80;
   cursor: pointer;
  }

  button:active {
   color: white;
   box-shadow: 0 0.2rem #626c80;
   transform: translateY(0.2rem);
  }

  button:hover:not(:disabled) {
   background: #374151;
   color: white;
   text-shadow: 0 0.1rem #374151;
  }

  button:disabled {
   cursor: auto;
   color: grey;
  }`;


export default ProductForm;
