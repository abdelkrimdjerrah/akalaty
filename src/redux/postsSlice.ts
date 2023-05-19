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
                const loadedPosts = responseData.map((user:any) => {
                    user.id = user._id
                    return user
                });
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map((id: any) => ({ type: 'User' as const, id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/posts',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: '/posts',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/posts`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetPostsQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = postsApiSlice


export const selectPostsResult = postsApiSlice.endpoints.getPosts.select()


const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data
)

export const {
    selectAll: selectAllPosts,
    selectById: selectUserById,
    selectIds: selectUserIds
} = postsAdapter.getSelectors((state: any) => selectPostsData(state) ?? initialState)