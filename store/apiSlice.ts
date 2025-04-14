import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface BlogPost {
  id: number;
  title: string;
  author: string;
  body: string;
}

interface PostsResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => `posts?page=${page}&limit=${limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.posts.map(({ id }) => ({ type: 'Posts' as const, id })),
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

export const { useGetPostsQuery, useGetPostQuery, useAddPostMutation } = apiSlice;