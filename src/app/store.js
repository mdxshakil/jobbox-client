import { configureStore } from "@reduxjs/toolkit";
import { authAPiSlice } from "../features/auth/authApiSlice";
import authSlice from "../features/auth/authSlice";
import filterSlice from "../features/filter/filterSlice";

export const store = configureStore({
    devTools: true,
    reducer: {
        authReducer: authSlice,
        [authAPiSlice.reducerPath]: authAPiSlice.reducer,
        filterReducer: filterSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authAPiSlice.middleware)
})