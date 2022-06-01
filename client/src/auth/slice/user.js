import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const username = localStorage.getItem('user');

const initialValue = {
    username: (username)? username : null, 
    isLoggedIn: (username) ? true: false, 
    isLoading: false, 
    message: null
}

export const signup = createAsyncThunk(
    '/signup', 
    async (user, thunkAPI)=>{
        try{
            const result = await axios.post(`/signup`, user);
            if(result.data.message === 'Success')
            {
                localStorage.setItem('user', result.data.username);
                localStorage.setItem('auth_token', result.headers.auth_token);
            }
            return {
                username: result.data.username,
                message: result.data.message
            }
        }
        catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const signin = createAsyncThunk(
    '/login', 
    async (user, thunkAPI)=>{
        try{
            const result = await axios.post(`/login`, user);
            if(result.data.message === 'Success'){
                localStorage.setItem('user', result.data.user);
                localStorage.setItem('auth_token', result.headers.auth_token);
            }
            return {
                username: result.data.user, 
                message: result.data.message
            }
        }
        catch(e){
            thunkAPI.rejectWithValue(e);
        }
    }
)

export const userSlice = createSlice({
    name: 'user', 
    initialState: {
        value: initialValue
    }, 
    reducers: {
        logout: (state)=>{
            state.username = null;
            state.isLoggedIn = false;
            state.isLoading = false;
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(signup.pending, (state)=>{
            state.isLoading = true; 
            state.isLoggedIn = false;
        })
        .addCase(signup.fulfilled, (state, action)=>{
            state.isLoading = false; 
            state.isLoggedIn = (action.payload.message === `Username already exists`)? false: true; 
            state.username = action.payload.username;
            state.message = action.payload.message;
        })
        .addCase(signup.rejected, (state, action)=>{
            state.isLoading = false; 
            state.isLoggedIn = false;
            state.message= action.payload.message;
        })
        .addCase(signin.pending, (state)=>{
            state.isLoading = true;
            state.isLoggedIn = false;
        })
        .addCase(signin.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isLoggedIn = (action.payload.message === `Username doesn't exist` || action.payload.message === `Password incorrect`)? false: true; 
            state.username = action.payload.username;
            state.message = action.payload.message;
        })
    }
})

export const {logout} = userSlice.actions;
export default userSlice.reducer;