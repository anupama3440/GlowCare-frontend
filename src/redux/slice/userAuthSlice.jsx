import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    userData: null
}

export const userAuth = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            console.log('userAuth called',action)
            state.isAuthenticated = true
            state.userData = action.payload
        },
        userlogOut: (state, action) => {
            state.isAuthenticated = false
            state.userData = null
        },
    }

});

export const { userLogin, userlogOut } = userAuth.actions;
export default userAuth.reducer;