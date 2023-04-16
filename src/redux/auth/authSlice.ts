import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { UserPublicInfo } from "../../types/auth";
import { getCurrentUser, login, logOut, register } from "./auth-operations";

export type AuthSlice = {
  user: UserPublicInfo;
  token: string | null;
  isLoggedIn: boolean;
  isFetchingCurrentUser: boolean;
  isLoading: boolean;
};

const initialState: AuthSlice = {
  user: {
    _id: "",
    username: "",
  },
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(logOut.fulfilled, (state) => {
        state.user = {
          username: "",
          _id: "",
        };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.user.username = payload?.user.username || "";
        state.user._id = payload?.user._id || "";

        state.isLoggedIn = true;
        state.isFetchingCurrentUser = false;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isFetchingCurrentUser = false;
      })
      .addMatcher(isAnyOf(register.pending, login.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        isAnyOf(register.fulfilled, login.fulfilled),
        (state, { payload }) => {
          state.user.username = payload?.user.username || "";
          state.user._id = payload?.user._id || "";

          state.token = payload?.token || null;
          state.isLoggedIn = true;
          state.isLoading = false;
        }
      )
      .addMatcher(isAnyOf(register.rejected, login.rejected), (state) => {
        state.isLoading = false;
      }),
});

export default authSlice.reducer;
export type AuthReducer = ReturnType<typeof authSlice.reducer>;
