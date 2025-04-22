import React, { useEffect, useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import { addCategory, deleteCategory, getCategories } from '../../services/adminService';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // For searching
    const [filteredCategories, setFilteredCategories] = useState(categories); // Filtered list based on search
    const [newCategory, setNewCategory] = useState('');
    const [newImage, setNewImage] = useState(null); // For new category image
    const [editingCategory, setEditingCategory] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState('');
    const [editCategoryImage, setEditCategoryImage] = useState(null); // For editing category image
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [showAddCategory, setShowAddCategory] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            // Fetch categories from API
            const response = await getCategories();
            if (response.success) {
                setCategories(response.categories);
                setFilteredCategories(response.categories);
            }
        };
        fetchCategories()
    }, []);

    // Handle searching for a category
    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = categories.filter(category =>
            category.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCategories(filtered);
    };

    // Handle adding a new category
    const handleAddCategory = async () => {
        const trimmedCategory = newCategory.trim();

        if (trimmedCategory && !categories.some(category => category.name.toLowerCase() === trimmedCategory.toLowerCase())) {
            const newCategoryObject = { name: trimmedCategory, image: URL.createObjectURL(newImage) };
            try {
                const response = await addCategory({ name: trimmedCategory, image: newImage });
                if (response.success) {
                    setCategories([...categories, newCategoryObject]);
                    setFilteredCategories([...categories, newCategoryObject]);
                    setNewCategory(''); // Reset input after adding
                    setNewCategory('');
                    setNewImage(null); // Reset image after adding
                    setShowAddCategory(false);
                }
            } catch (error) {
                setShowAddCategory(false);
                toast.error('Something went wrong');
            }

        } else {
            toast.error('Category already exists');
        }
    };

    // Handle editing a category
    const handleEditCategory = () => {
        const trimmedEditCategory = editCategoryName.trim();

        if (trimmedEditCategory && !categories.some(category => category.name.toLowerCase() === trimmedEditCategory.toLowerCase())) {
            const updatedCategories = categories.map((category) =>
                category.name === editingCategory.name ? { name: trimmedEditCategory, image: editCategoryImage || category.image } : category
            );
            setCategories(updatedCategories);
            setFilteredCategories(updatedCategories); // Update filtered list
            setEditingCategory(null);
            setEditCategoryName('');
            setEditCategoryImage(null); // Reset image after editing
        }
    };

    // Handle deleting a category with confirmation
    const handleDeleteCategory = async () => {
        console.log('Category to delete:', categoryToDelete);
        if (categoryToDelete) {
            console.log('Deleting category:', categoryToDelete);
            const response = await deleteCategory(categoryToDelete._id);
            if (response.success) {
                toast.success('Category deleted successfully');
                const updatedCategories = categories.filter(
                    (category) => category.name !== categoryToDelete.name
                );
                setCategories(updatedCategories);
                setFilteredCategories(updatedCategories); // Update filtered list
                setShowConfirmDelete(false);
                setCategoryToDelete(null);
            }
        }
    };

    // Handle image preview
    const handleImageChange = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
            // setImage(URL.createObjectURL(file));
            setImage(file);;
        }
    };

    return (
        <div className="mx-auto p-8">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Category Management</h2>

            {/* Search for a Category */}
            <div className="mb-8">
                <div className="flex justify-between items-center bg-white p-5 gap-5 rounded-lg shadow-md border border-gray-200">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search for a category"
                        className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    {/* Add New Category Button */}
                    <div className="text-center w-72">
                        <button
                            onClick={() => setShowAddCategory(true)}
                            className="flex items-center bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-200 mx-auto"
                        >
                            <MdAdd size={20} className="mr-2" /> Add New Category
                        </button>
                    </div>
                </div>
            </div>

            {/* Category List with Edit and Delete Options */}
            <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-5">Categories</h3>
                <ul className="space-y-4">
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-all"
                            >
                                <div className="flex items-center">
                                    <img src={category.image} alt={category.name} className="w-12 h-12 mr-4 rounded-lg object-cover" />
                                    <span className="text-lg text-gray-700">{category.name}</span>
                                </div>
                                <div className="space-x-3">
                                    <button
                                        onClick={() => {
                                            setEditingCategory(category);
                                            setEditCategoryName(category.name);
                                            setEditCategoryImage(category.image);
                                        }}
                                        className="text-blue-500 hover:text-blue-700 transition-all"
                                    >
                                        <AiOutlineEdit size={22} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowConfirmDelete(true);
                                            setCategoryToDelete(category);
                                        }}
                                        className="text-red-500 hover:text-red-700 transition-all"
                                    >
                                        <AiOutlineDelete size={22} />
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500">No categories found</li>
                    )}
                </ul>
            </div>

            {/* Add Category Modal */}
            {showAddCategory && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Add Category</h3>
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Category Name"
                            className="border border-gray-300 p-3 w-full rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="file"
                            onChange={(e) => handleImageChange(e, setNewImage)}
                            className="border border-gray-300 p-3 w-full rounded-lg mb-6"
                        />
                        {newImage && <img src={URL.createObjectURL(newImage)} alt="Category Preview" className="w-full h-32 object-cover mb-6 rounded-lg" />}
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowAddCategory(false)}
                                className="bg-gray-400 text-white p-3 rounded-md mr-3 hover:bg-gray-500 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddCategory}
                                className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition-all"
                            >
                                Add Category
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Category Modal */}
            {editingCategory && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Edit Category</h3>
                        <input
                            type="text"
                            value={editCategoryName}
                            onChange={(e) => setEditCategoryName(e.target.value)}
                            placeholder="Category Name"
                            className="border border-gray-300 p-3 w-full rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="file"
                            onChange={(e) => handleImageChange(e, setEditCategoryImage)}
                            className="border border-gray-300 p-3 w-full rounded-lg mb-6"
                        />
                        {editCategoryImage && <img src={editCategoryImage} alt="Category Preview" className="w-full h-32 object-cover mb-6 rounded-lg" />}
                        <div className="flex justify-end">
                            <button
                                onClick={() => setEditingCategory(null)}
                                className="bg-gray-400 text-white p-3 rounded-md mr-3 hover:bg-gray-500 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditCategory}
                                className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Delete Modal */}
            {showConfirmDelete && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Confirm Delete</h3>
                        <p className="text-gray-700 mb-6">Are you sure you want to delete the category?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowConfirmDelete(false)}
                                className="bg-gray-400 text-white p-3 rounded-md mr-3 hover:bg-gray-500 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteCategory}
                                className="bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryManagement;
