import { createSlice } from "@reduxjs/toolkit";


const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoging: false,
    },
    reducers: {},
    extraReducers: builder => {

    }

})

export default AuthSlice.reducer