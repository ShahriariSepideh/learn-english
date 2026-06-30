import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "@/types/auth";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isCheckingAuth = false;
    },
    clearAuthUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isCheckingAuth = false;
    },
    finishAuthCheck: (state) => {
      state.isCheckingAuth = false;
    },
  },
});

export const { setAuthUser, clearAuthUser, finishAuthCheck } = authSlice.actions;
export const authReducer = authSlice.reducer;
