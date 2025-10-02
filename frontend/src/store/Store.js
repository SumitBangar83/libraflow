import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../features/userinfo.js';


export const Store = configureStore({
    reducer:{
        user: userSlice,
   
    }
})