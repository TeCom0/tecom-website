import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_DEV!,
    credentials: 'include',
    jsonContentType: 'application/json'
})
export const apiSlice = createApi({
    baseQuery: BaseQuery,
    endpoints: () => ({})
})