import { USER_ROLE_TYPE } from '@/constants/CommonConstant';
import { User } from '@/types/employee';
import { createSlice } from '@reduxjs/toolkit';

export interface AuthStateInterface {
  user: User | null;
  restaurantId: string;
  role: string;
  token: string | null;
  canManage: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthStateInterface = {
  user: null,
  restaurantId: '',
  role: '',
  token: null,
  canManage: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.user.role;
      state.restaurantId =
        state.role == USER_ROLE_TYPE.RESTAURANT
          ? action.payload.user.id
          : action.payload.restaurantId;
      state.isAuthenticated = true;
      state.canManage =
        action.payload.role === USER_ROLE_TYPE.RESTAURANT ||
        action.payload.user.canModify;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.role = '';
      state.restaurantId = '';
      state.isAuthenticated = false;
      state.canManage = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setCredentials, setLogout, setUser } = authSlice.actions;

export default authSlice.reducer;
