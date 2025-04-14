import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface BlogPost {
  id: number;
  title: string;
  author: string;
  body: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<BlogPost[], void>({
      query: () => 'posts',
      providesTags: (result = [], error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    getPost: builder.query<BlogPost, number>({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
    addPost: builder.mutation<BlogPost, Partial<BlogPost>>({
      query: (newPost) => ({
        url: 'posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
} = apiSlice;
