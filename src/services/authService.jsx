import axios from "axios";
import { userEndpoints } from "../constraints/endpoints/userEndpoints";
import { toast } from "react-toastify";

export const login = async (data) => {
    try {
        console.log('service caled')
        const response = await axios.post(userEndpoints.login, data);
        console.log(response, '===============response')
        if (response.data.success) {
            return response.data;
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error('Error in POST request:', error);
        throw error;
    }
}

export const registeration = async (data) => {
    try {
        const response = await axios.post(userEndpoints.register, data);
        if (response.data.success) {
            return response.data;
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        toast.error(response.data.message);
        console.error('Error in POST request:', error);
        throw error

    }
}

export const verifyOtp = async (data) => {
    try {
        const response = await axios.post(userEndpoints.verifyOtp, data);
        if (response.data.success) {
            return response;
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        toast.error(response.data.message);
        console.error('Error in verifyOtp request:', error);
        throw error
    }
}