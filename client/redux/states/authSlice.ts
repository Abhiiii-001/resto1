import { createSlice } from "@reduxjs/toolkit";

export interface AuthStateInterface {
  user: any;
  restaurantId: string;
  role: string;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthStateInterface = {
  user:  null,
  restaurantId: "",
  role: "",
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
      state.role = action.payload.user.role;
      state.restaurantId = state.role == "Restaurant" ? state.user.id : state.user.restaurantId;
      state.isAuthenticated = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.role="";
      state.restaurantId="";
      state.isAuthenticated = false;
    },
    setUser: (state,action) => {
      state.user = action.payload
    }
  },
});

export const { setCredentials, setLogout ,setUser } = authSlice.actions;

export default authSlice.reducer;
