const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

export const adminEndpoints = {
    login: `${BASE_URL}/auth/adminLogin`,
    getUsers: `${BASE_URL}/admin/getUsers`,
    getProducts: `${BASE_URL}/admin/getProducts`,
    getCategories: `${BASE_URL}/admin/getCategories`,
    getOrders: `${BASE_URL}/admin/getOrders`,
    addProduct: `${BASE_URL}/admin/addProduct`,
    addCategory: `${BASE_URL}/admin/addCategory`,
    deleteProduct: `${BASE_URL}/admin/deleteProduct`,
    deleteCategory: `${BASE_URL}/admin/deleteCategory`,
    deleteOrder: `${BASE_URL}/admin/deleteOrder`,
    updateOrder: `${BASE_URL}/admin/updateOrder`,
    updateProduct: `${BASE_URL}/admin/updateProduct`,
    updateCategory: `${BASE_URL}/admin/updateCategory`,
    addCoupon: `${BASE_URL}/admin/addCoupon`,
    getCoupons: `${BASE_URL}/admin/getCoupons`,
    deleteCoupon: `${BASE_URL}/admin/deleteCoupon`,
    updateCoupon: `${BASE_URL}/admin/updateCoupon`,
    blockUser: `${BASE_URL}/admin/blockUser`,
    getDashboardCount:`${BASE_URL}/admin/getDashboardCount`,
}