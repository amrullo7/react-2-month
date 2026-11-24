import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
export const todoApi = createApi({
  reducerPath: "todoApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://to-dos-api.softclub.tj/",
    
  }),
  tagTypes:['Todos'],

  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "api/to-dos",
      providesTags:["Todos"]
      
    }),
      deletetodos: builder.mutation({
      query: (id) => ({
        url:`/api/to-dos?id=${id}`,
        method:"Delete"
      } ),
      invalidatesTags:[`Todos`]
    }),
  }),
});

export const { useGetTodosQuery } = todoApi;