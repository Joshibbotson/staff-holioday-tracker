import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    listUsers,
    listUsersUnderManager,
} from "../../firebase/firestore/firestore";
import { UserType } from "../../types";
import { auth } from "../../firebase/auth/auth";

interface UsersState {
    users: UserType[] | undefined;
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const data = await listUsers(false, false);
    return data;
});

export const fetchUsersUnderManager = createAsyncThunk(
    "usersUnderManager/fetchUsersUnderManager",
    async () => {
        const currentUserEmail = auth.currentUser?.email;
        if (currentUserEmail !== null) {
            const data = await listUsersUnderManager(currentUserEmail!);
            return data;
        }
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, state => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.error.message ?? "Something went wrong";
                state.loading = false;
            })
            .addCase(fetchUsersUnderManager.pending, state => {
                state.loading = true;
            })
            .addCase(fetchUsersUnderManager.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsersUnderManager.rejected, (state, action) => {
                state.error = action.error.message ?? "Something went wrong";
                state.loading = false;
            });
    },
});

export default usersSlice.reducer;
