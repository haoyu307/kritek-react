import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postQuery = createApi({
  reducerPath: "postQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  tagTypes: ["lists", "post"],
  endpoints: (builder) => ({
    getLists: builder.query<any[], void>({
      query: () => `posts`,
      providesTags: (_: any) => ["lists"],
    }),
    getDetail: builder.query<any, number>({
      query: (id) => `posts/${id}`,
      providesTags: (_: any) => ["post"],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `posts/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (_) => ["lists", "post"],
    }),
    addPost: builder.mutation({
      query: (body) => {
        return {
          url: `posts`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: (_) => ["lists", "post"],
    }),
  }),
});

export const {
  useGetListsQuery,
  useGetDetailQuery,
  useAddPostMutation,
  useUpdatePostMutation,
} = postQuery;
