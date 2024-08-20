import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import { apiSlice } from '../Api/apiSlice'

export const Store = configureStore({
    reducer: {
        auth: authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})
//return the type of the Store set up to monitor its state
export type AppStore = typeof Store
//get the store's state type
export type RootState = ReturnType<AppStore['getState']>
// get the store dispatch type
export type AppDispatch = AppStore['dispatch']