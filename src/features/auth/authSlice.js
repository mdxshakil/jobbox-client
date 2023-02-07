import { async } from "@firebase/util"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "../../utils/firebase.config"

const initialState = {
    user: {
        email: '',
        role: ''
    },
    isLoading: true,
    isError: false,
    error: ''

}

export const createUser = createAsyncThunk('auth/createUser', async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email;
})
export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email;
})
export const googleLogin = createAsyncThunk('auth/googleLogin', async () => {
    const googleProvider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth, googleProvider);
    return data.user.email;
})
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    await signOut(auth)
})
export const getUser = createAsyncThunk('auth/getUSer', async (email) => {
    const res = await fetch(`https://jobbox-server-beta.vercel.app/user/${email}`)
    const data = await res.json();
    if (data.status) {
        return data;
    } else {
        return email;
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user.email = action.payload;
            state.isLoading = false;
        },
        toggleLoading: (state, action) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state, action) => {
                state.isLoading = true;
                state.user.email = '';
                state.user.role = '';
                state.isError = false;
                state.error = ''
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user.email = action.payload;
                state.user.role = '';
                state.isError = false;
                state.error = ''
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user.email = '';
                state.user.role = '';
                state.isError = true;
                state.error = action.error.message
            })
        // login
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true;
                state.user.email = '';
                state.user.role = '';
                state.isError = false;
                state.error = ''
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user.email = action.payload;
                state.user.role = '';
                state.isError = false;
                state.error = ''
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user.email = '';
                state.user.role = '';
                state.isError = true;
                state.error = action.error.message
            })
        // google-login
        builder
            .addCase(googleLogin.pending, (state, action) => {
                state.isLoading = true;
                state.user.email = '';
                state.user.role = '';
                state.isError = false;
                state.error = ''
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user.email = action.payload;
                state.user.role = '';
                state.isError = false;
                state.error = ''
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.user.email = '';
                state.user.role = '';
                state.isError = true;
                state.error = action.error.message
            })
        // logout
        builder
            .addCase(logoutUser.pending, (state, action) => {
                state.isLoading = true;
                state.user.email = '';
                state.user.role = '';
                state.isError = false;
                state.error = ''
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = { email: '', role: '' };
                state.isError = false;
                state.error = ''
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user.email = '';
                state.user.role = '';
                state.isError = true;
                state.error = action.error.message
            })
        // getUser
        builder
            .addCase(getUser.pending, (state, action) => {
                state.isLoading = true;
                state.user.email = '';
                state.user.role = '';
                state.isError = false;
                state.error = ''
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.status) {
                    state.user = action.payload.data;
                } else {
                    state.user.email = action.payload;
                }
                state.isError = false;
                state.error = ''
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user.email = '';
                state.user.role = '';
                state.isError = true;
                state.error = action.error.message
            })
    }
})

export const { setUser, toggleLoading } = authSlice.actions;
export default authSlice.reducer;