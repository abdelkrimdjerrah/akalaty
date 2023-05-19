import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

const postsAdapter = createEntityAdapter({})

const initialState = postsAdapter.getInitialState()

export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query<any, void>({
            query: () => ({
                url: '/posts',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: (responseData:any) => {
                const loadedPosts = responseData.map((post:any) => {
                    post.id = post._id
                    return post
                });
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Post', id: 'LIST' },
                        ...result.ids.map((id: any) => ({ type: 'Post' as const, id }))
                    ]
                } else return [{ type: 'Post', id: 'LIST' }]
            }
        }),
        addNewPost: builder.mutation({
            query: initialPostData => ({
                url: '/posts',
                method: 'POST',
                body: {
                    ...initialPostData,
                }
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),
        updatePost: builder.mutation({
            query: initialPostData => ({
                url: '/posts',
                method: 'PATCH',
                body: {
                    ...initialPostData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),
        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `/posts`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetPostsQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
} = postsApiSlice


export const selectPostsResult = postsApiSlice.endpoints.getPosts.select()


const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data
)

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors((state: any) => selectPostsData(state) ?? initialState)