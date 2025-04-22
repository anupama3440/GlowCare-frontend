
export const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

export const userEndpoints = {
    login: `${BASE_URL}/auth/userLogin`,
    register: `${BASE_URL}/auth/userRegister`,
    verifyOtp:`${BASE_URL}/auth/verifyOtp`,
    getProducts:`${BASE_URL}/user/products`,
    getAllProducts:`${BASE_URL}/user/allProducts`,
}