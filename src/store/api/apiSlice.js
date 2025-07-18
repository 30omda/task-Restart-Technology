
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/users"
        })
    }),
})


export const { useGetUsersQuery } = apiSlice

