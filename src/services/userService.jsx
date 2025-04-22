import axios from 'axios';
import { userEndpoints } from "../constraints/endpoints/userEndpoints";
import { toast } from "react-toastify";
import axiosInstance from "../constraints/axios/userAxios";

export const getHomeProducts = async () => {
    try {
        const response = await axios.get(userEndpoints.getProducts);
        console.log(response, '---reponse from server')
        return response.data;
    } catch (error) {
        console.log(error, 'Error in getHomeProdcuts in userService');
        toast.error('something went wrong');
        throw error;
    }
}

export const getProducts = async () => {
    try {
        const response = await axios.get(userEndpoints.getAllProducts);
        console.log(response, '-----------res');
        return response.data;
    } catch (error) {
        console.log(error, ' Error in getProduts in userService');
        toast.error('Something went wrong');
        throw error;
    }
}