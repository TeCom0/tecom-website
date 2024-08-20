import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { User } from "../utils/Types";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    reducers: {
        Login_: (state, action) => {
            const { user } = action.payload
            state.user = user
        },
        Logout: (state) => {
            state.user = null
        }
    }
})
//exporting actions to use for dispatch 
export const { Logout, Login_ } = authSlice.actions
// export the reducer to include it in the global store
export default authSlice.reducer
// using storeState, exporting the getCurrentUser to stay in sync with user state in the store
export const getCurrentUser = (state: RootState) => state.auth.user as unknown as User