import axios from 'axios';
import { adminEndpoints } from '../constraints/endpoints/adminEndpoints';
import { toast } from 'react-toastify';
import axiosInstance from '../constraints/axios/adminAxios';

// function to login admin ;
export const adminLogin = async (data) => {
    try {
        const response = await axios.post(adminEndpoints.login, data);
        return response.data
    } catch (error) {
        console.log(error, 'Erroe in adminLoign in adminService');
        toast.error('Something went wrong.');
        throw error;
    }
}

// function to get the details to show on admin dashboard;
export const getDashboardCount = async () => {
    try {
        const response = await axiosInstance.get(adminEndpoints.getDashboardCount);
        console.log(response);
    } catch (error) {
        console.log(error, 'Error in getDashboardCount in adminService');
        toast.error('Something went wrong.');
        throw error;
    }
}

// function to list users in usermanagement section;
export const getUsers = async (data) => {
    try {
        console.log('console.llog', data)
        const response = await axiosInstance.get(`${adminEndpoints.getUsers}?page=${data.page}`);
        console.log(response, '---response in getUser admin side');
        return response.data
    } catch (error) {
        console.log('Error in adminService', error);
        toast.error('Something went wrong.');
        throw error;
    }
}

// function to add products to the store;
export const addProduct = async (data) => {
    try {
        console.log('console.llog', data);
        const response = await axiosInstance.post(adminEndpoints.addProduct, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response, '---response in addProduct admin side');
        toast.success('Product added successfully');
    } catch (error) {
        console.log(error, 'Error in addProduct adminService.jsx');
        toast.error('Someting went wrong.')
        throw error
    }
}

// function to add category to the store;
export const addCategory = async (data) => {
    try {
        console.log('console.log', data);
        const response = await axiosInstance.post(adminEndpoints.addCategory, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response, '---response in addCategory admin side');
        toast.success('Category added successfully');
        return response.data;
    } catch (error) {
        console.log('Error in adminService', error);
        toast.error('Something went wrong. Please try again later!');
        throw error;
    }
}

//function to delete category;
export const deleteCategory = async (id) => {
    try {
        console.log('console.log', id);
        const response = await axiosInstance.delete(`${adminEndpoints.deleteCategory}/${id}`);
        console.log(response, '---response in deleteCategory admin side');
        return response.data;
    } catch (error) {
        console.log('Error in adminService', error);
        toast.error('Something went wrong.')
        throw error;
    }
}

// function to list categories to show in admin side;
export const getCategories = async () => {
    try {
        const response = await axiosInstance.get(adminEndpoints.getCategories);
        return response.data;
    } catch (error) {
        console.log('Error in adminService', error);
        toast.error('Something went wrong.')
        throw error;
    }
}

// function to list products in product management;
export const getProducts = async (currentPage) => {
    try {
        const response = await axiosInstance.get(`${adminEndpoints.getProducts}?page=${currentPage}`);
        console.log(response)
        return response.data;
    } catch (error) {
        console.log('Error in adminService', error);
        toast.error('Something went wrong.')
        throw error;
    }
}