import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authAPiSlice = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jobbox-server-kappa.vercel.app'
    }),
    tagTypes: ['jobs', 'qna'],
    endpoints: (builder) => ({})
})
