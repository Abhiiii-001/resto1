import { createSlice } from "@reduxjs/toolkit";

export interface AuthStateInterface {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthStateInterface = {
  user:  null,
  token:  null,
  isAuthenticated:  false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, setLogout } = authSlice.actions;

export default authSlice.reducer;
