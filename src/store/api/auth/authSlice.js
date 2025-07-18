import { createSlice } from "@reduxjs/toolkit"
import { signIn } from "./authAction"
import { getCookie, setCookie, removeCookie } from "@/utils/Cookies/cookies"
import { toast } from "react-hot-toast"


const localUser = getCookie("user")
const token = getCookie("token")
const isEmployee = getCookie("isEmployee")

const initialState = {
    user: localUser || null,
    token: token || null,
    isEmployee: isEmployee === true || isEmployee === "true",
    isLoading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isEmployee = false

            removeCookie("user")
            removeCookie("token")
            removeCookie("isEmployee")

            toast.success("Logged out successfully")
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.token = action.payload.token
                state.isEmployee = true
                state.isLoading = false
                state.error = null

                
                setCookie("user", action.payload.user, { path: "/" })
                setCookie("token", action.payload.token, { path: "/" })
                setCookie("isEmployee", true, { path: "/" })
            })
            .addCase(signIn.rejected, (state, action) => {
                state.user = null
                state.token = null
                state.isEmployee = false
                state.isLoading = false
                state.error = action.payload?.errorMessage || "Login failed"
            })
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
