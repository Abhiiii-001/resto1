import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '@/types/order';

const initialState = {
  count: 0,
  orders: [] as Order[],
  socketConnected: false,
};
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const newOrder = action.payload;
      state.orders.unshift(newOrder); // Add new orders to the top
      state.count += 1;
    },
    addOrdersBulk: (state, action) => {
      const orders = action.payload;
      state.orders = orders;
      state.count = orders?.length;
    },
    removeOrder: (state, action) => {
      const orderId = action.payload;
      state.orders = state.orders.filter((ord) => ord?.id !== orderId);
      state.count -= 1;
    },
    clearOrder: (state, action) => {
      state.count = 0;
      state.orders = [];
    },
    setSocketConnected: (state, action: PayloadAction<boolean>) => {
      state.socketConnected = action.payload;
    },
  },
});
export const {
  addOrder,
  removeOrder,
  clearOrder,
  addOrdersBulk,
  setSocketConnected,
} = orderSlice.actions;
export default orderSlice.reducer;
