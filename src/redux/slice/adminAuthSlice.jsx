import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    adminData: null
}

export const adminAuth = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true
            state.adminData = action.payload
        },
        logOut: (state, action) => {
            state.isAuthenticated = false
            state.adminData = null
        },
    }

});

export const { login, logOut } = adminAuth.actions;
export default adminAuth.reducer;