import { apiSlice } from "./apiSlice"
import { Credentials, EditUser, LoginInfo } from '../utils/Types'
import { NewMember } from '../utils/Types'
const MemberApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        joinMember: builder.mutation({
            query: (values: NewMember) => ({ url: `membership/joinMember`, method: 'POST', body: values })
        }),
        Login: builder.mutation({
            query: (values: LoginInfo) => ({ url: 'membership/login', method: 'POST', body: values })
        }),
        getMembers: builder.query({
            query: (type: string) => ({ url: `membership/${type}`, method: 'GET' })
        }),
        Credentials: builder.mutation({
            query: (values: Credentials) => ({ url: 'membership/credentials', method: 'POST', body: values })
        }),
        EditProfile: builder.mutation({
            query: (values: EditUser) => ({ url: 'membership/EditProfile', method: 'PUT', body: values })
        })
    })
})

export const {
    useJoinMemberMutation,
    useLoginMutation,
    useGetMembersQuery,
    useCredentialsMutation,
    useEditProfileMutation
} = MemberApiSlice